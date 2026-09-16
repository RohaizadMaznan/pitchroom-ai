# Text-to-Speech (TTS) Configuration Guide

PitchRoom AI supports multiple TTS providers to give voice to the sharks. This guide explains how to set up and configure each provider.

## Supported Providers

### 1. OpenAI TTS (Recommended for getting started)
**Pros:** Simple, uses existing OpenAI key, cost-effective
**Cons:** Limited voice options, less customization

**Setup:**
```env
OPENAI_API_KEY="sk-..."
TTS_PROVIDER="openai"
```

**Shark Voice Mappings:**
- Mark Cuban → `onyx` (Professional, direct)
- Barbara Corcoran → `nova` (Warm, confident)
- Kevin O'Leary → `echo` (Authoritative)
- Lori Greiner → `shimmer` (Enthusiastic)
- Daymond John → `fable` (Cool, storyteller)

**Cost:** ~$15/1M characters

### 2. ElevenLabs (Best for production)
**Pros:** Most realistic voices, voice cloning, emotion control
**Cons:** More expensive, requires separate API key

**Setup:**
```env
ELEVENLABS_API_KEY="your-key"
TTS_PROVIDER="elevenlabs"
```

**Shark Voice Mappings:**
Custom voice IDs can be configured in `lib/tts/providers.ts`

**Cost:** Free tier available, then ~$22/month for 30K characters

### 3. AssemblyAI
**Note:** AssemblyAI is primarily a transcription service with Lemur API for AI tasks. For dedicated TTS, use OpenAI or ElevenLabs.

**Setup:**
```env
ASSEMBLYAI_API_KEY="your-key"
TTS_PROVIDER="assemblyai"
```

### 4. Custom OpenAI-Compatible APIs

You can use any OpenAI-compatible API endpoint (LM Studio, LocalAI, Ollama with voice models):

```env
OPENAI_API_KEY="your-key"
OPENAI_API_BASE="http://localhost:1234/v1"
TTS_PROVIDER="openai"
```

## API Endpoint

### POST /api/tts

Generate speech from text for a specific shark.

**Request:**
```json
{
  "text": "I think this business has potential, but I need to see your margins.",
  "sharkId": "mark-cuban"
}
```

**Response:**
```json
{
  "audioUrl": "https://...",
  "duration": 4.2,
  "provider": "openai",
  "voice": "onyx"
}
```

## Implementation Files

- `lib/tts/providers.ts` - Provider configurations and voice mappings
- `app/api/tts/route.ts` - TTS API endpoint
- `.env.example` - Environment variable examples

## Usage in Frontend

```typescript
async function speakSharkResponse(text: string, sharkId: string) {
  const response = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, sharkId })
  })
  
  const { audioUrl } = await response.json()
  const audio = new Audio(audioUrl)
  await audio.play()
}
```

## Adding Custom Voices

Edit `lib/tts/providers.ts`:

```typescript
export const SHARK_VOICES = {
  openai: {
    'mark-cuban': 'onyx',
    'your-new-shark': 'alloy'  // Add here
  }
}
```

## Troubleshooting

### "API key not configured"
Make sure the correct environment variable is set:
- OpenAI: `OPENAI_API_KEY`
- ElevenLabs: `ELEVENLABS_API_KEY`
- AssemblyAI: `ASSEMBLYAI_API_KEY`

### "Voice not found"
Check that the voice ID exists for your provider. See provider documentation for available voices.

### High latency
- OpenAI TTS: Use `tts-1` model (faster) instead of `tts-1-hd`
- ElevenLabs: Use streaming mode
- Consider caching frequently used phrases

## Cost Estimation

For a typical 5-minute pitch session (~2,000 words = ~10,000 characters):

| Provider | Cost per Session | Quality |
|----------|------------------|---------|
| OpenAI TTS | $0.15 | Good |
| ElevenLabs | $0.22 | Excellent |
| AssemblyAI | N/A (transcription focused) | - |

## Recommendations

- **Development:** Use OpenAI TTS (simple, works with existing key)
- **Production:** Use ElevenLabs (best quality, worth the cost)
- **Self-hosted:** Use custom OpenAI-compatible endpoint with local models

## Future Enhancements

- [ ] Real-time streaming TTS during chat
- [ ] Voice emotion control based on shark sentiment
- [ ] Custom voice cloning for branded experiences
- [ ] Audio caching for common phrases
- [ ] Voice speed/pitch controls per shark personality
