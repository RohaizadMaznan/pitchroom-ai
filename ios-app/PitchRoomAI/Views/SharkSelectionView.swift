import SwiftUI

struct SharkSelectionView: View {
    @EnvironmentObject var apiService: APIService
    @State private var sharks: [Shark] = Shark.allSharks
    
    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Header
                VStack(spacing: 12) {
                    Text("🦈")
                        .font(.system(size: 60))
                    
                    Text("PitchRoom AI")
                        .font(.system(size: 32, weight: .bold, design: .rounded))
                    
                    Text("Practice your pitch with legendary investors")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .padding(.horizontal)
                }
                .padding(.top, 40)
                .padding(.bottom, 30)
                
                // Sharks List
                VStack(spacing: 16) {
                    ForEach(sharks) { shark in
                        NavigationLink(destination: ChatView(shark: shark)) {
                            SharkCard(shark: shark)
                        }
                        .buttonStyle(PlainButtonStyle())
                    }
                }
                .padding(.horizontal)
                .padding(.bottom, 40)
            }
        }
        .background(Color(.systemGroupedBackground))
        .navigationBarHidden(true)
    }
}

struct SharkCard: View {
    let shark: Shark
    
    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack(alignment: .top) {
                // Avatar placeholder
                Circle()
                    .fill(sharkColor)
                    .frame(width: 60, height: 60)
                    .overlay(
                        Text(shark.name.prefix(1))
                            .font(.title)
                            .fontWeight(.bold)
                            .foregroundColor(.white)
                    )
                
                VStack(alignment: .leading, spacing: 4) {
                    Text(shark.name)
                        .font(.headline)
                        .foregroundColor(.primary)
                    
                    Text(shark.title)
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                
                Spacer()
                
                Image(systemName: "chevron.right")
                    .foregroundColor(.secondary)
                    .font(.caption)
            }
            
            Text(shark.investmentThesis)
                .font(.caption)
                .foregroundColor(.secondary)
                .lineLimit(2)
            
            // Tags
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 8) {
                    ForEach(shark.dealPreferences.preferredIndustries, id: \.self) { industry in
                        Text(industry)
                            .font(.caption2)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 5)
                            .background(sharkColor.opacity(0.15))
                            .foregroundColor(sharkColor)
                            .cornerRadius(12)
                    }
                }
            }
        }
        .padding()
        .background(Color(.systemBackground))
        .cornerRadius(16)
        .shadow(color: Color.black.opacity(0.05), radius: 8, x: 0, y: 2)
    }
    
    private var sharkColor: Color {
        switch shark.id {
        case "mark-cuban": return .blue
        case "barbara-corcoran": return .pink
        case "kevin-oleary": return .red
        case "lori-greiner": return .purple
        case "daymond-john": return .orange
        default: return .gray
        }
    }
}

#Preview {
    NavigationView {
        SharkSelectionView()
            .environmentObject(APIService())
    }
}
