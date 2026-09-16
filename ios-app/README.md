# PitchRoom AI - iOS App

Native iOS app for practicing startup pitches with AI-powered Shark Tank investors.

## Features

- 🦈 **5 Realistic Sharks** - Practice with Mark Cuban, Barbara Corcoran, Kevin O'Leary, Lori Greiner, and Daymond John
- 💬 **Real-time Chat** - Natural conversation flow with streaming responses
- 🎨 **Beautiful UI** - Native SwiftUI interface with shark-themed colors
- 🧠 **Persistent Sessions** - Continue your pitch where you left off
- 📱 **iOS Native** - Built with SwiftUI, optimized for iPhone and iPad

## Requirements

- iOS 16.0+
- Xcode 15.0+
- Swift 5.9+
- Running PitchRoom AI backend (Next.js API)

## Setup

### 1. Backend Setup

First, ensure the backend is running:

```bash
cd /path/to/pitchroom-ai
npm install --legacy-peer-deps
npm run dev
```

The backend should be accessible at `http://localhost:3000`

### 2. Open in Xcode

```bash
cd ios-app
open PitchRoomAI.xcodeproj
```

**Or create the Xcode project from scratch:**

1. Open Xcode
2. Create New Project → iOS → App
3. Product Name: **PitchRoomAI**
4. Team: Your Apple Developer Team
5. Organization Identifier: `com.seratuspro.pitchroom`
6. Interface: **SwiftUI**
7. Language: **Swift**
8. Copy all Swift files from this directory into the project

### 3. Configure API Endpoint

Edit `Services/APIService.swift`:

```swift
// For iOS Simulator (localhost)
init(baseURL: String = "http://localhost:3000") {
    self.baseURL = baseURL
}

// For physical device (use your Mac's IP)
init(baseURL: String = "http://192.168.1.100:3000") {
    self.baseURL = baseURL
}
```

**Finding your Mac's IP:**
```bash
# On Mac
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### 4. Update Info.plist

Add the following to allow local network connections:

```xml
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsLocalNetworking</key>
    <true/>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>
```

### 5. Build and Run

1. Select target device (iPhone 15 Pro Simulator or physical device)
2. Click **Product → Run** (⌘R)
3. App should launch and show shark selection screen

## Project Structure

```
PitchRoomAI/
├── PitchRoomAIApp.swift          # App entry point
├── ContentView.swift              # Root view
├── Models/
│   └── Models.swift               # Shark, Message, Session models
├── Views/
│   ├── SharkSelectionView.swift  # Shark grid/cards
│   └── ChatView.swift             # Chat interface
├── Services/
│   └── APIService.swift           # Backend API client
└── Assets.xcassets/               # App icons, images
```

## Usage

### Select a Shark
Browse the 5 sharks and tap one to start pitching.

### Start Your Pitch
Example opening:
> "Hi Mark, I'm seeking $200K for 10% equity in TechFlow, a SaaS platform for small businesses. We're doing $50K MRR growing 20% month-over-month."

### Navigate Tough Questions
Each shark will ask questions based on their investment thesis:
- **Mark Cuban**: CAC, LTV, tech stack, scalability
- **Barbara**: Your story, brand vision, customer connection
- **Kevin**: Margins, profitability, exit strategy
- **Lori**: Product design, manufacturing, retail potential
- **Daymond**: Brand story, cultural relevance, community

## API Integration

The app connects to the Next.js backend:

**Endpoint:** `POST /api/pitch`

**Request:**
```json
{
  "messages": [
    {"role": "user", "content": "Hi Mark, seeking $200K for 10%..."}
  ],
  "sharkId": "mark-cuban",
  "sessionId": "uuid-here"
}
```

**Response:** Streaming text response from the shark

## Troubleshooting

### "Cannot connect to localhost"
- Ensure backend is running: `npm run dev`
- Check backend is on port 3000
- For physical device, use Mac's IP instead of localhost

### "Network request failed"
- Add NSAppTransportSecurity to Info.plist (see Setup step 4)
- Check firewall isn't blocking connections
- Ensure device and Mac are on same WiFi network

### Sharks not loading
- Sharks are hardcoded in `Models.swift` - no API call needed
- If empty, check you've added all files to Xcode project

### Messages not sending
- Check API endpoint in `APIService.swift`
- Open Safari on device and visit `http://your-mac-ip:3000` - should see web app
- Check backend logs for errors

## Development

### Adding New Sharks

Edit `Models/Models.swift`:

```swift
extension Shark {
    static let allSharks: [Shark] = [
        // Existing sharks...
        Shark(
            id: "new-shark",
            name: "New Shark",
            // ... rest of properties
        )
    ]
}
```

### Customizing Shark Colors

Edit `ChatView.swift` and `SharkSelectionView.swift`:

```swift
private var sharkColor: Color {
    switch shark.id {
    case "your-shark-id": return .green
    default: return .gray
    }
}
```

### Implementing Streaming

Current implementation receives complete responses. For true streaming:

1. Use `URLSessionStreamDelegate`
2. Parse Server-Sent Events (SSE)
3. Update `currentResponse` character by character

## Deployment

### TestFlight

1. Archive the app: **Product → Archive**
2. Upload to App Store Connect
3. Create TestFlight build
4. Invite beta testers

### App Store

1. Configure app in App Store Connect
2. Set bundle ID: `com.seratuspro.pitchroom`
3. Add screenshots, description
4. Submit for review

## Roadmap

- [ ] Real-time streaming responses
- [ ] Voice input (Speech-to-Text)
- [ ] Voice output (Text-to-Speech with shark voices)
- [ ] Session history and replay
- [ ] Deal tracking and analytics
- [ ] Multi-shark panel mode
- [ ] Share pitch transcripts
- [ ] Dark mode support
- [ ] iPad optimization

## Credits

Built by [Rohaizad Maznan](https://github.com/rohaizadmaznan) for [SeratusPro](https://seratuspro.com)

Backend: Next.js + OpenAI + LangChain
iOS: SwiftUI + URLSession

## License

MIT
