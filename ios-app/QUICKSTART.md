# iOS App Quick Start Guide

## Opening the Project in Xcode

Since we created the Swift files manually, you'll need to set up the Xcode project:

### Option 1: Create New Xcode Project (Recommended)

1. **Open Xcode**

2. **Create New Project**
   - File → New → Project
   - Choose: iOS → App
   - Click Next

3. **Configure Project**
   - Product Name: `PitchRoomAI`
   - Team: (Select your Apple Developer Team)
   - Organization Identifier: `com.seratuspro` (or your domain)
   - Bundle Identifier: `com.seratuspro.PitchRoomAI`
   - Interface: **SwiftUI**
   - Language: **Swift**
   - Storage: None
   - Click Next

4. **Save Location**
   - Choose: `/path/to/pitchroom-ai/ios-app/`
   - Create: Enabled
   - Click Create

5. **Add Source Files**
   - Delete the default `ContentView.swift` and `PitchRoomAIApp.swift` that Xcode created
   - In Project Navigator, right-click on `PitchRoomAI` folder
   - Select "Add Files to PitchRoomAI"
   - Navigate to `ios-app/PitchRoomAI/`
   - Select all folders: `Models/`, `Views/`, `Services/`
   - Select files: `PitchRoomAIApp.swift`, `ContentView.swift`
   - Make sure "Copy items if needed" is **unchecked** (files are already in place)
   - Click Add

6. **Replace Info.plist**
   - In Project Navigator, select the project (blue icon at top)
   - Select the target `PitchRoomAI`
   - Go to "Info" tab
   - Right-click on Info.plist and choose "Show in Finder"
   - Replace it with the `Info.plist` from `ios-app/PitchRoomAI/Info.plist`

7. **Update Deployment Target**
   - In project settings, set "Minimum Deployments" to **iOS 16.0**

### Option 2: Use Provided Project File

The `PitchRoomAI.xcodeproj` is a minimal placeholder. You'll need to:

1. Open `PitchRoomAI.xcodeproj` in Xcode
2. Follow steps 5-7 from Option 1 above

## Configure Backend Connection

### For iOS Simulator (same machine)

No changes needed - uses `http://localhost:3000`

### For Physical Device

1. Find your Mac's IP address:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
# Example output: inet 192.168.1.100
```

2. Edit `Services/APIService.swift`:
```swift
init(baseURL: String = "http://192.168.1.100:3000") {  // ← Your Mac's IP
    self.baseURL = baseURL
}
```

3. Make sure your iPhone and Mac are on the **same WiFi network**

## Run the App

1. **Start Backend Server**
```bash
cd /path/to/pitchroom-ai
npm run dev
```

2. **Select Device**
   - In Xcode, choose target device from dropdown (top-left)
   - iPhone 15 Pro (Simulator) - easiest
   - Your physical iPhone - requires Apple Developer account

3. **Build and Run**
   - Press `⌘R` or click the Play button
   - First build may take 2-3 minutes
   - App will launch automatically

## Project Structure After Setup

```
ios-app/
├── PitchRoomAI.xcodeproj/
│   ├── project.pbxproj           # Xcode will generate this properly
│   └── xcuserdata/               # Your Xcode settings (gitignored)
│
├── PitchRoomAI/
│   ├── PitchRoomAIApp.swift      # ✅ App entry point
│   ├── ContentView.swift          # ✅ Root view
│   ├── Info.plist                 # ✅ App configuration
│   │
│   ├── Models/
│   │   └── Models.swift           # ✅ Shark, Message, Session
│   │
│   ├── Views/
│   │   ├── SharkSelectionView.swift  # ✅ Home screen
│   │   └── ChatView.swift         # ✅ Chat interface
│   │
│   ├── Services/
│   │   └── APIService.swift       # ✅ API client
│   │
│   └── Assets.xcassets/
│       ├── AppIcon.appiconset/    # ✅ App icon (placeholder)
│       └── Contents.json          # ✅ Asset catalog
│
└── README.md                      # ✅ Full documentation
```

## Verify It Works

### Test Checklist

1. **App Launches** ✓
   - Shark selection screen appears
   - 5 sharks visible with names and tags

2. **Navigation Works** ✓
   - Tap a shark (e.g., Mark Cuban)
   - Chat screen opens
   - Shark header shows at top

3. **Send Message** ✓
   - Type: "Hi Mark, I'm seeking $200K for 10% equity"
   - Tap send button
   - Your message appears on right (blue bubble)
   - Typing indicator appears
   - Shark response appears on left (gray bubble)

4. **Back Navigation** ✓
   - Tap back arrow
   - Returns to shark selection
   - Choose different shark
   - New conversation starts

## Troubleshooting

### "Build Failed" Errors

**Missing files:**
- Make sure all .swift files are added to the Xcode target
- In Project Navigator, select each .swift file
- Check "Target Membership" in right panel → `PitchRoomAI` should be checked

**SwiftUI errors:**
- Set deployment target to iOS 16.0+
- Project Settings → General → Minimum Deployments

### "Cannot Connect to Backend"

**Simulator:**
```bash
# Test backend is running
curl http://localhost:3000/api/pitch

# Should return: {"error":"POST request expected"}
```

**Physical Device:**
```bash
# Test from your phone's Safari
# Navigate to: http://YOUR_MAC_IP:3000
# Should see the web app
```

**Check Info.plist:**
- NSAppTransportSecurity → NSAllowsLocalNetworking = YES
- NSAppTransportSecurity → NSAllowsArbitraryLoads = YES

### "No sharks showing"

Sharks are hardcoded in `Models.swift` - no API needed. Check:
- `Models.swift` is added to Xcode target
- `Shark.allSharks` static property exists
- File compiles without errors

### "Typing indicator never stops"

Backend not responding:
- Check backend terminal for errors
- Test API with curl:
```bash
curl -X POST http://localhost:3000/api/pitch \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}],"sharkId":"mark-cuban"}'
```

## Next Steps

Once working:
- Customize shark colors in `Views/`
- Add app icon to `Assets.xcassets/AppIcon.appiconset/`
- Implement real streaming (SSE)
- Add Text-to-Speech for shark voices
- Deploy to TestFlight

## Need Help?

- Check `ios-app/README.md` for full documentation
- Backend docs: `../README.md`
- Create GitHub issue: https://github.com/rohaizadmaznan/pitchroom-ai/issues
