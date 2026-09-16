import { NextRequest, NextResponse } from 'next/server'
import { AssemblyAI } from 'assemblyai'

export const runtime = 'nodejs'

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLYAI_API_KEY || ''
})

// Shark voice mappings for AssemblyAI
const SHARK_VOICES: Record<string, string> = {
  'mark-cuban': 'matthew',      // Professional, direct male voice
  'barbara-corcoran': 'jennifer', // Warm, confident female voice
  'kevin-oleary': 'josh',        // Authoritative male voice
  'lori-greiner': 'nicole',      // Enthusiastic female voice
  'daymond-john': 'eric'         // Cool, confident male voice
}

export async function POST(req: NextRequest) {
  try {
    const { text, sharkId } = await req.json()

    if (!text || !sharkId) {
      return NextResponse.json(
        { error: 'Text and sharkId are required' },
        { status: 400 }
      )
    }

    if (!process.env.ASSEMBLYAI_API_KEY) {
      return NextResponse.json(
        { error: 'AssemblyAI API key not configured' },
        { status: 500 }
      )
    }

    const voice = SHARK_VOICES[sharkId] || 'matthew'

    // Generate speech using AssemblyAI
    const audioData = await client.lemur.task({
      prompt: text,
      final_model: 'anthropic/claude-3-5-sonnet'
    })

    // Note: AssemblyAI primarily focuses on transcription
    // For actual TTS, you might want to use their Lemur API differently
    // or integrate with a dedicated TTS service like ElevenLabs or Play.ht
    
    return NextResponse.json({
      message: 'TTS endpoint ready',
      note: 'AssemblyAI is primarily for transcription. Consider ElevenLabs or Play.ht for production TTS',
      sharkId,
      voice,
      textLength: text.length
    })

  } catch (error) {
    console.error('TTS API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate speech' },
      { status: 500 }
    )
  }
}
