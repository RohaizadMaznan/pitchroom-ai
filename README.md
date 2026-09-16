# PitchRoom AI 🦈

Practice your startup pitch with AI-powered Shark Tank investors. Each shark has realistic personality, investment criteria, and **persistent memory** across the conversation.

## Features

- 🎭 **5 Realistic Sharks** - Mark Cuban, Barbara Corcoran, Kevin O'Leary, Lori Greiner, Daymond John
- 🧠 **Persistent Memory** - Each shark remembers what you've told them throughout the session
- 💬 **Real-time Streaming** - Natural conversation flow with streaming responses
- 📊 **Investment Criteria** - Each shark has specific industries, equity preferences, and deal sizes
- 🎯 **Authentic Personalities** - Sharks ask questions and respond based on their real-world approach

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TailwindCSS
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT-4 via LangChain
- **Memory**: PostgreSQL + Prisma ORM
- **Streaming**: Vercel AI SDK

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rohaizadmaznan/pitchroom-ai.git
cd pitchroom-ai
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/pitchroom?schema=public"
OPENAI_API_KEY="sk-your-key-here"
OPENAI_API_BASE="https://api.openai.com/v1"
ASSEMBLYAI_API_KEY="your-assemblyai-key"
```

4. Set up the database:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start pitching!

## How It Works

### Shark Memory System

Each shark maintains conversation memory using:
- **SharkMemory class**: Stores key facts (company name, revenue, ask, etc.)
- **Prisma database**: Persists memory across sessions
- **Automatic extraction**: AI extracts important facts from each exchange

### Shark Profiles

Each shark has:
- **System prompt**: Defines personality, speaking style, and decision criteria
- **Investment thesis**: What they look for in a business
- **Deal preferences**: Equity range, investment amounts, preferred industries
- **Typical questions**: What they'll drill into

### Architecture

```
app/
  ├── page.tsx                  # Shark selection page
  ├── pitch/[sharkId]/page.tsx  # Chat interface
  └── api/pitch/route.ts        # Streaming chat endpoint

lib/
  ├── sharks/
  │   ├── profiles.ts           # Shark definitions
  │   ├── agent.ts              # LangChain agent logic
  │   └── memory.ts             # Memory management
  └── db.ts                     # Prisma client

components/
  ├── ChatInterface.tsx         # Real-time chat UI
  └── SharkHeader.tsx           # Shark info header
```

## Database Schema

- **PitchSession**: Tracks each pitch session
- **Message**: Stores conversation history
- **SharkMemory**: Key-value memory per shark per session
- **Deal**: Stores offers made by sharks

## Customization

### Adding a New Shark

Edit `lib/sharks/profiles.ts`:

```typescript
export const SHARKS: Record<string, SharkProfile> = {
  newshark: {
    id: 'newshark',
    name: 'Shark Name',
    title: 'Title',
    background: '...',
    investmentThesis: '...',
    personality: '...',
    typicalQuestions: [...],
    dealPreferences: {...},
    systemPrompt: `...`
  }
}
```

### Changing AI Model

Edit `lib/sharks/agent.ts`:

```typescript
this.model = new ChatOpenAI({
  modelName: 'gpt-4-turbo-preview', // Change this
  temperature: 0.8,
})
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Add environment variables
4. Deploy!

Make sure to use a production PostgreSQL database (Supabase, Railway, Neon, etc.)

### Docker (Coming Soon)

## Roadmap

- [ ] Deal tracking and history
- [ ] Multi-shark panel pitches
- [ ] Pitch analytics and feedback
- [ ] Voice mode
- [ ] Practice templates for different industries
- [ ] Shark panel voting

## Contributing

Pull requests welcome! For major changes, please open an issue first.

## License

MIT

## Credits

Built by [Rohaizad Maznan](https://github.com/rohaizadmaznan) for [SeratusPro](https://seratuspro.com)

---

**Note**: This is a practice tool. Real investment decisions involve much more due diligence!
