import { ChatOpenAI } from '@langchain/openai'
import { HumanMessage, SystemMessage, AIMessage } from '@langchain/core/messages'
import { SHARKS, SharkProfile } from './profiles'
import { SharkMemory } from './memory'
import { prisma } from '@/lib/db'

export class SharkAgent {
  private shark: SharkProfile
  private memory: SharkMemory
  private sessionId: string
  private model: ChatOpenAI

  constructor(sharkId: string, sessionId: string) {
    this.shark = SHARKS[sharkId]
    this.memory = new SharkMemory(sessionId, sharkId)
    this.sessionId = sessionId
    this.model = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      temperature: 0.8,
      streaming: true
    })
  }

  async getConversationHistory() {
    const messages = await prisma.message.findMany({
      where: {
        sessionId: this.sessionId,
        sharkId: this.shark.id
      },
      orderBy: { timestamp: 'asc' },
      take: 20
    })

    return messages.map((msg: any) => 
      msg.role === 'user' 
        ? new HumanMessage(msg.content)
        : new AIMessage(msg.content)
    )
  }

  async chat(userMessage: string, onStream?: (chunk: string) => void) {
    const memoryContext = await this.memory.buildContextString()
    const history = await this.getConversationHistory()
    
    const systemMessage = new SystemMessage(
      this.shark.systemPrompt + memoryContext
    )

    const messages = [
      systemMessage,
      ...history,
      new HumanMessage(userMessage)
    ]

    await prisma.message.create({
      data: {
        sessionId: this.sessionId,
        sharkId: this.shark.id,
        role: 'user',
        content: userMessage
      }
    })

    let fullResponse = ''
    const stream = await this.model.stream(messages)
    
    for await (const chunk of stream) {
      const content = chunk.content as string
      fullResponse += content
      if (onStream) onStream(content)
    }

    await prisma.message.create({
      data: {
        sessionId: this.sessionId,
        sharkId: this.shark.id,
        role: 'assistant',
        content: fullResponse
      }
    })

    await this.extractAndSaveMemory(userMessage, fullResponse)
    return fullResponse
  }

  private async extractAndSaveMemory(userMsg: string, aiResponse: string) {
    const extractionPrompt = `Extract key business facts from this exchange. Return JSON array with "key" and "value" fields.

User: ${userMsg}
${this.shark.name}: ${aiResponse}`

    try {
      const extraction = await this.model.invoke([
        new SystemMessage('Extract key facts as JSON array.'),
        new HumanMessage(extractionPrompt)
      ])
      const facts = JSON.parse(extraction.content as string)
      for (const fact of facts) {
        await this.memory.saveMemory(fact.key, fact.value)
      }
    } catch (e) {
      // Skip if extraction fails
    }
  }

  getProfile() {
    return this.shark
  }
}
