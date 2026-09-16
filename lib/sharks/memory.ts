import { prisma } from '@/lib/db'

export class SharkMemory {
  private sessionId: string
  private sharkId: string

  constructor(sessionId: string, sharkId: string) {
    this.sessionId = sessionId
    this.sharkId = sharkId
  }

  async saveMemory(key: string, value: string) {
    await prisma.sharkMemory.upsert({
      where: {
        sharkId_sessionId_memoryKey: {
          sharkId: this.sharkId,
          sessionId: this.sessionId,
          memoryKey: key
        }
      },
      update: { memoryValue: value },
      create: {
        sharkId: this.sharkId,
        sessionId: this.sessionId,
        memoryKey: key,
        memoryValue: value
      }
    })
  }

  async getMemory(key: string): Promise<string | null> {
    const memory = await prisma.sharkMemory.findUnique({
      where: {
        sharkId_sessionId_memoryKey: {
          sharkId: this.sharkId,
          sessionId: this.sessionId,
          memoryKey: key
        }
      }
    })
    return memory?.memoryValue || null
  }

  async getAllMemories(): Promise<Record<string, string>> {
    const memories = await prisma.sharkMemory.findMany({
      where: {
        sharkId: this.sharkId,
        sessionId: this.sessionId
      }
    })
    
    return memories.reduce((acc: Record<string, string>, mem: any) => {
      acc[mem.memoryKey] = mem.memoryValue
      return acc
    }, {} as Record<string, string>)
  }

  async buildContextString(): Promise<string> {
    const memories = await this.getAllMemories()
    if (Object.keys(memories).length === 0) return ''
    
    return `\n\nYOUR MEMORY FROM THIS PITCH:\n${Object.entries(memories)
      .map(([key, value]) => `- ${key}: ${value}`)
      .join('\n')}`
  }
}
