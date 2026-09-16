# Environment Variables Reference

Complete reference for all environment variables used in PitchRoom AI.

## Required Variables

### Database
```env
DATABASE_URL="postgresql://user:password@localhost:5432/pitchroom?schema=public"
```
PostgreSQL connection string. Get a free database from:
- [Neon](https://neon.tech) - Serverless Postgres
- [Supabase](https://supabase.com) - Open source Firebase alternative
- [Railway](https://railway.app) - Deploy Postgres in seconds

### OpenAI API
```env
OPENAI_API_KEY="sk-proj-..."
```
Required for AI shark conversations. Get your key at [platform.openai.com](https://platform.openai.com)

## Optional Variables

### Custom OpenAI-Compatible API
```env
OPENAI_API_BASE="https://api.openai.com/v1"
```
Use a custom endpoint for OpenAI-compatible APIs:
- **LM Studio**: `http://localhost:1234/v1`
- **Ollama with OpenAI compatibility**: `http://localhost:11434/v1`
- **LocalAI**: `http://localhost:8080/v1`
- **Azure OpenAI**: `https://your-resource.openai.azure.com/`
- **Together.ai**: `https://api.together.xyz/v1`
- **Groq**: `https://api.groq.com/openai/v1`

### Text-to-Speech Providers

#### AssemblyAI
```env
ASSEMBLYAI_API_KEY="your-key"
```
Primarily for transcription. Get key at [assemblyai.com](https://www.assemblyai.com)

#### ElevenLabs (Recommended for production TTS)
```env
ELEVENLABS_API_KEY="your-key"
```
Premium TTS with realistic voices. Get key at [elevenlabs.io](https://elevenlabs.io)

#### OpenAI TTS
No separate key needed - uses `OPENAI_API_KEY` above.

#### Other TTS Options
```env
PLAY_HT_API_KEY="your-key"
AZURE_SPEECH_KEY="your-key"
AZURE_SPEECH_REGION="eastus"
```

### TTS Provider Selection
```env
TTS_PROVIDER="openai"
```
Options: `openai`, `elevenlabs`, `assemblyai`

### App Configuration
```env
NODE_ENV="development"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Quick Start Configurations

### Minimal Setup (Local Development)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/pitchroom"
OPENAI_API_KEY="sk-..."
```

### With TTS (OpenAI)
```env
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-..."
TTS_PROVIDER="openai"
```

### Production Setup
```env
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-..."
ELEVENLABS_API_KEY="your-key"
TTS_PROVIDER="elevenlabs"
NODE_ENV="production"
NEXT_PUBLIC_APP_URL="https://pitchroom.example.com"
```

### Self-Hosted AI Setup
```env
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="local"
OPENAI_API_BASE="http://localhost:1234/v1"
TTS_PROVIDER="openai"
```

## Environment File Locations

- `.env.local` - Local development (gitignored)
- `.env.production` - Production build
- `.env.example` - Template (committed to repo)

## Security Notes

⚠️ **Never commit API keys to git**

- All `.env*` files except `.env.example` are gitignored
- Use different keys for development and production
- Rotate keys if accidentally exposed
- Use environment variables in Vercel/hosting dashboard for deployment

## Vercel Deployment

Add these in your Vercel project settings → Environment Variables:
1. `DATABASE_URL`
2. `OPENAI_API_KEY`
3. `ELEVENLABS_API_KEY` (optional)
4. `NEXT_PUBLIC_APP_URL`

## Validation

To check if your environment is configured correctly:

```bash
# Check if all required variables are set
npm run check-env

# Or manually check
node -e "console.log(process.env.OPENAI_API_KEY ? '✓ OpenAI configured' : '✗ Missing OpenAI key')"
```

## Troubleshooting

### "OpenAI API key not configured"
- Check `.env.local` exists
- Verify `OPENAI_API_KEY` is set
- Restart dev server after changing .env

### "Database connection failed"
- Verify `DATABASE_URL` format
- Check database is running
- Ensure network access (firewall/VPN)

### "Custom API endpoint not working"
- Check `OPENAI_API_BASE` URL is correct
- Verify endpoint supports OpenAI-compatible format
- Test endpoint directly with curl first
