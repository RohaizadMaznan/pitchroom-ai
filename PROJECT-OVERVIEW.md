# 🦈 PitchRoom AI - Complete Project

**A Shark Tank simulator with AI-powered investors** - Practice your startup pitch with realistic sharks that remember everything you tell them.

## 📦 What's Included

### 🌐 Web App (Next.js 14)
- **Real-time chat** with streaming AI responses
- **5 AI Sharks** with unique personalities and investment theses
- **Persistent memory** - Sharks remember your business details across the conversation
- **Beautiful dark UI** with emerald accents
- **Responsive design** - Works on desktop, tablet, mobile

### 📱 iOS App (SwiftUI)
- **Native iOS experience** with SwiftUI
- **Same 5 sharks** - Mark Cuban, Barbara Corcoran, Kevin O'Leary, Lori Greiner, Daymond John
- **Chat interface** with message bubbles and typing indicators
- **Shark-themed colors** - Each shark has their signature color
- **Session management** - Continue conversations where you left off

### 🎙️ Multiple TTS Providers
- **OpenAI TTS** - Simple, built-in (recommended for MVP)
- **ElevenLabs** - Premium realistic voices (production ready)
- **AssemblyAI** - Transcription + Lemur API integration
- **Custom endpoints** - Use any OpenAI-compatible API

### 🤖 AI Infrastructure
- **LangChain** agents with streaming
- **PostgreSQL** with Prisma ORM
- **Memory extraction** - AI automatically extracts and updates business facts
- **System prompts** - Each shark has 500+ word personality definition

## 🚀 Quick Start

### Web App
```bash
# 1. Clone repo
git clone https://github.com/rohaizadmaznan/pitchroom-ai.git
cd pitchroom-ai

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Set up environment
cp .env.example .env.local
# Edit .env.local with your API keys

# 4. Set up database
npx prisma generate
npx prisma db push

# 5. Run dev server
npm run dev
```

Visit http://localhost:3000

### iOS App
```bash
# 1. Ensure web backend is running
npm run dev

# 2. Open Xcode project
cd ios-app
open -a Xcode

# 3. Create new iOS project (see ios-app/QUICKSTART.md)
# 4. Add Swift files to project
# 5. Build and run (⌘R)
```

## 📂 Repository Structure

```
pitchroom-ai/
├── app/                          # Next.js App Router
│   ├── api/
│   │   ├── pitch/route.ts        # Main chat endpoint (streaming)
│   │   └── tts/route.ts          # Text-to-Speech API
│   ├── page.tsx                  # Home page with shark selection
│   └── chat/[sharkId]/page.tsx   # Chat interface
│
├── components/                    # React components
│   ├── SharkCard.tsx             # Shark selection cards
│   ├── ChatInterface.tsx         # Chat UI with streaming
│   └── MessageBubble.tsx         # Individual messages
│
├── lib/                          # Core logic
│   ├── sharks/
│   │   ├── profiles.ts           # 5 detailed shark personalities
│   │   ├── agent.ts              # LangChain agent with memory
│   │   └── memory.ts             # Business fact extraction
│   ├── tts/
│   │   └── providers.ts          # TTS provider abstraction
│   └── db.ts                     # Prisma database client
│
├── prisma/
│   └── schema.prisma             # Database schema
│
├── ios-app/                      # iOS Native App
│   ├── PitchRoomAI.xcodeproj/
│   └── PitchRoomAI/
│       ├── PitchRoomAIApp.swift       # App entry
│       ├── Models/Models.swift        # Data models
│       ├── Views/
│       │   ├── SharkSelectionView.swift
│       │   └── ChatView.swift
│       ├── Services/APIService.swift  # Backend client
│       └── Assets.xcassets/
│
└── docs/
    ├── TTS-SETUP.md              # TTS configuration guide
    └── ENVIRONMENT.md            # All environment variables
```

## 🦈 The Sharks

### Mark Cuban
- **Focus:** Tech, SaaS, E-commerce
- **Style:** Direct, numbers-obsessed, no BS
- **Investment:** $50K-$2M, 10-20% equity
- **Key Questions:** CAC, LTV, unit economics, tech stack

### Barbara Corcoran
- **Focus:** Consumer products, Real estate, Lifestyle
- **Style:** Warm but shrewd, invests in people
- **Investment:** $50K-$1M, 15-25% equity
- **Key Questions:** Your story, brand potential, customer connection

### Kevin O'Leary
- **Focus:** Manufacturing, Consumer goods, Licensing
- **Style:** Ruthless, money-first, loves royalty deals
- **Investment:** $100K-$3M, 20-30% or royalty
- **Key Questions:** Margins, profitability, exit strategy

### Lori Greiner
- **Focus:** Consumer products, Retail, Inventions
- **Style:** Enthusiastic, product-focused, QVC expert
- **Investment:** $50K-$1.5M, 15-25% equity
- **Key Questions:** Product design, retail potential, manufacturing

### Daymond John
- **Focus:** Fashion, Lifestyle, Branding
- **Style:** Cool, culture-savvy, authentic
- **Investment:** $50K-$1M, 20-33% equity
- **Key Questions:** Brand story, cultural relevance, community

## 🎯 Features

### Web App
- ✅ Real-time streaming responses
- ✅ Persistent chat sessions
- ✅ Business fact extraction and memory
- ✅ 5 unique shark personalities
- ✅ Responsive mobile design
- ✅ Dark mode optimized
- ✅ Multiple TTS providers

### iOS App
- ✅ Native SwiftUI interface
- ✅ Shark selection with cards
- ✅ Real-time chat with bubbles
- ✅ Typing indicators
- ✅ Shark-themed colors
- ✅ Session persistence (ready)
- ⏳ TTS integration (TODO)
- ⏳ Voice input (TODO)

## 🔧 Environment Variables

### Required
```env
DATABASE_URL="postgresql://..."       # Postgres connection
OPENAI_API_KEY="sk-..."              # OpenAI API key
```

### Optional
```env
OPENAI_API_BASE="https://..."        # Custom OpenAI-compatible endpoint
ASSEMBLYAI_API_KEY="..."             # AssemblyAI for TTS
ELEVENLABS_API_KEY="..."             # ElevenLabs for premium TTS
TTS_PROVIDER="openai"                # openai | elevenlabs | assemblyai
```

See `docs/ENVIRONMENT.md` for complete reference.

## 📚 Documentation

- **README.md** - Main setup guide
- **BUILD-SUMMARY.md** - Technical implementation details
- **docs/TTS-SETUP.md** - Text-to-Speech configuration
- **docs/ENVIRONMENT.md** - Environment variables reference
- **ios-app/README.md** - iOS app full guide
- **ios-app/QUICKSTART.md** - Xcode setup instructions

## 🎨 Design System

### Web
- **Background:** Slate-900 (dark mode)
- **Accent:** Emerald-400 for CTAs
- **Sharks:** Color-coded by personality
- **Typography:** System fonts for readability

### iOS
- **Shark Colors:**
  - Mark Cuban: Blue
  - Barbara Corcoran: Pink
  - Kevin O'Leary: Red
  - Lori Greiner: Purple
  - Daymond John: Orange
- **UI:** Native iOS styling with rounded corners

## 🛠️ Technology Stack

### Backend
- Next.js 14 (App Router)
- TypeScript
- LangChain (AI orchestration)
- OpenAI GPT-4
- Prisma ORM
- PostgreSQL

### Frontend (Web)
- React 18
- Tailwind CSS
- Server-Sent Events (streaming)

### iOS
- SwiftUI
- URLSession (API client)
- iOS 16.0+

## 🚢 Deployment

### Web App
**Vercel (Recommended):**
```bash
# 1. Connect GitHub repo to Vercel
# 2. Add environment variables in dashboard
# 3. Deploy
```

**Railway / Render:**
- Add DATABASE_URL from Railway Postgres
- Set OPENAI_API_KEY
- Deploy from GitHub

### iOS App
**TestFlight:**
1. Archive in Xcode
2. Upload to App Store Connect
3. Create TestFlight build
4. Invite testers

**App Store:**
1. Configure in App Store Connect
2. Add screenshots and description
3. Submit for review

## 📈 Roadmap

### Phase 1 (MVP) ✅
- [x] Web app with 5 sharks
- [x] Real-time streaming chat
- [x] Persistent memory
- [x] iOS native app
- [x] TTS provider support
- [x] Complete documentation

### Phase 2 (Enhancement)
- [ ] Voice input (Speech-to-Text)
- [ ] Voice output with shark voices
- [ ] Multi-shark panel mode
- [ ] Deal tracking and analytics
- [ ] Session history and replay
- [ ] Share pitch transcripts

### Phase 3 (Advanced)
- [ ] Video avatars for sharks
- [ ] Real-time pitch scoring
- [ ] Founder vs founder mode
- [ ] Expert feedback after session
- [ ] Integration with pitch decks

## 💰 Pricing Estimate

### For 100 pitch sessions/month:

**OpenAI API:**
- ~500K tokens per session
- ~$0.50 per session
- **$50/month**

**TTS (OpenAI):**
- ~2000 characters per session
- ~$0.03 per session
- **$3/month**

**Database (Neon):**
- Free tier sufficient for MVP
- **$0/month**

**Total: ~$53/month for 100 users**

## 🤝 Contributing

This is a personal project by Rohaizad Maznan for SeratusPro. Not currently accepting external contributions, but feel free to fork!

## 📄 License

MIT License - See LICENSE file

## 🙏 Credits

**Built by:** [Rohaizad Maznan](https://github.com/rohaizadmaznan)  
**Company:** [SeratusPro](https://seratuspro.com)  
**Location:** Kuala Lumpur, Malaysia  

**Tech Stack:**
- OpenAI GPT-4 for shark intelligence
- LangChain for agent orchestration
- Vercel for hosting
- Neon for PostgreSQL

---

**Repository:** https://github.com/rohaizadmaznan/pitchroom-ai

**Questions?** Open an issue on GitHub

**Ready to pitch?** Clone the repo and start practicing! 🚀
