import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { prisma } from '@/lib/db'
import { SharkAgent } from '@/lib/sharks/agent'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const { messages, sharkId, sessionId: existingSessionId } = await req.json()
    
    let sessionId = existingSessionId
    if (!sessionId) {
      const session = await prisma.pitchSession.create({
        data: {
          businessName: 'Unknown',
          userId: null
        }
      })
      sessionId = session.id
    }

    const lastMessage = messages[messages.length - 1]
    if (!lastMessage || lastMessage.role !== 'user') {
      return new Response('Invalid message format', { status: 400 })
    }

    const agent = new SharkAgent(sharkId, sessionId)
    
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        await agent.chat(lastMessage.content, (chunk: string) => {
          controller.enqueue(encoder.encode(chunk))
        })
        controller.close()
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'X-Session-Id': sessionId
      }
    })
  } catch (error) {
    console.error('Pitch API error:', error)
    return new Response('Internal server error', { status: 500 })
  }
}
