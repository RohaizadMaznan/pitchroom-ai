import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationView {
            SharkSelectionView()
        }
    }
}

#Preview {
    ContentView()
        .environmentObject(APIService())
}
