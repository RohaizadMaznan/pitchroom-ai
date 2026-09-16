/**
 * Text-to-Speech Provider Configurations
 * 
 * Supports multiple TTS providers for shark voices
 */

export interface TTSProvider {
  name: string
  endpoint: string
  getHeaders: () => Record<string, string>
  formatRequest: (text: string, voice: string) => any
}

// AssemblyAI Configuration (Transcription + Lemur)
export const assemblyAI: TTSProvider = {
  name: 'AssemblyAI',
  endpoint: 'https://api.assemblyai.com/v2/lemur/task',
  getHeaders: () => ({
    'Authorization': process.env.ASSEMBLYAI_API_KEY || '',
    'Content-Type': 'application/json'
  }),
  formatRequest: (text: string, voice: string) => ({
    prompt: text,
    final_model: 'anthropic/claude-3-5-sonnet'
  })
}

// ElevenLabs Configuration (Recommended for TTS)
export const elevenLabs: TTSProvider = {
  name: 'ElevenLabs',
  endpoint: 'https://api.elevenlabs.io/v1/text-to-speech',
  getHeaders: () => ({
    'xi-api-key': process.env.ELEVENLABS_API_KEY || '',
    'Content-Type': 'application/json'
  }),
  formatRequest: (text: string, voiceId: string) => ({
    text,
    model_id: 'eleven_monolingual_v1',
    voice_settings: {
      stability: 0.5,
      similarity_boost: 0.75
    }
  })
}

// OpenAI TTS Configuration
export const openAITTS: TTSProvider = {
  name: 'OpenAI TTS',
  endpoint: `${process.env.OPENAI_API_BASE || 'https://api.openai.com/v1'}/audio/speech`,
  getHeaders: () => ({
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json'
  }),
  formatRequest: (text: string, voice: string) => ({
    model: 'tts-1',
    input: text,
    voice: voice // alloy, echo, fable, onyx, nova, shimmer
  })
}

// Shark voice mappings for different providers
export const SHARK_VOICES = {
  elevenlabs: {
    'mark-cuban': '21m00Tcm4TlvDq8ikWAM',    // Professional male
    'barbara-corcoran': 'EXAVITQu4vr4xnSDxMaL', // Warm female
    'kevin-oleary': 'VR6AewLTigWG4xSOukaG',   // Deep authoritative
    'lori-greiner': 'pNInz6obpgDQGcFmaJgB',   // Enthusiastic female
    'daymond-john': 'ErXwobaYiN019PkySvjV'    // Cool confident male
  },
  openai: {
    'mark-cuban': 'onyx',      // Professional, direct
    'barbara-corcoran': 'nova',  // Warm, confident
    'kevin-oleary': 'echo',      // Authoritative
    'lori-greiner': 'shimmer',   // Enthusiastic
    'daymond-john': 'fable'      // Cool, storyteller
  },
  assemblyai: {
    // AssemblyAI doesn't have direct TTS voices
    // This is a placeholder for Lemur API usage
    'mark-cuban': 'default',
    'barbara-corcoran': 'default',
    'kevin-oleary': 'default',
    'lori-greiner': 'default',
    'daymond-john': 'default'
  }
}

// Get the active provider based on environment variables
export function getActiveTTSProvider(): TTSProvider | null {
  if (process.env.ELEVENLABS_API_KEY) {
    return elevenLabs
  }
  if (process.env.OPENAI_API_KEY) {
    return openAITTS
  }
  if (process.env.ASSEMBLYAI_API_KEY) {
    return assemblyAI
  }
  return null
}

// Get voice ID for a shark based on active provider
export function getSharkVoice(sharkId: string): string {
  const provider = getActiveTTSProvider()
  
  if (!provider) return 'default'
  
  if (provider.name === 'ElevenLabs' && process.env.ELEVENLABS_API_KEY) {
    return SHARK_VOICES.elevenlabs[sharkId as keyof typeof SHARK_VOICES.elevenlabs] || SHARK_VOICES.elevenlabs['mark-cuban']
  }
  
  if (provider.name === 'OpenAI TTS') {
    return SHARK_VOICES.openai[sharkId as keyof typeof SHARK_VOICES.openai] || 'onyx'
  }
  
  return 'default'
}
