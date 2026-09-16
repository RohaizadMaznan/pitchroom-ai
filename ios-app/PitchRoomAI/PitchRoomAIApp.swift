import SwiftUI

@main
struct PitchRoomAIApp: App {
    @StateObject private var apiService = APIService()
    
    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(apiService)
        }
    }
}
