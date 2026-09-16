import SwiftUI

struct ChatView: View {
    let shark: Shark
    
    @EnvironmentObject var apiService: APIService
    @StateObject private var viewModel: ChatViewModel
    @State private var messageText = ""
    @FocusState private var isInputFocused: Bool
    
    init(shark: Shark) {
        self.shark = shark
        _viewModel = StateObject(wrappedValue: ChatViewModel(shark: shark))
    }
    
    var body: some View {
        VStack(spacing: 0) {
            // Shark Header
            SharkHeaderView(shark: shark)
            
            // Messages
            ScrollViewReader { proxy in
                ScrollView {
                    LazyVStack(spacing: 16) {
                        // Welcome message
                        if viewModel.messages.isEmpty {
                            WelcomeMessageView(sharkName: shark.name)
                                .padding()
                        }
                        
                        // Messages
                        ForEach(viewModel.messages) { message in
                            MessageBubble(message: message, sharkColor: sharkColor)
                                .id(message.id)
                        }
                        
                        // Loading indicator
                        if viewModel.isLoading {
                            HStack {
                                TypingIndicator()
                                Spacer()
                            }
                            .padding(.horizontal)
                        }
                    }
                    .padding(.vertical)
                }
                .onChange(of: viewModel.messages.count) { _, _ in
                    if let lastMessage = viewModel.messages.last {
                        withAnimation {
                            proxy.scrollTo(lastMessage.id, anchor: .bottom)
                        }
                    }
                }
            }
            
            // Input bar
            HStack(spacing: 12) {
                TextField("Your pitch...", text: $messageText, axis: .vertical)
                    .textFieldStyle(.plain)
                    .padding(12)
                    .background(Color(.systemGray6))
                    .cornerRadius(20)
                    .focused($isInputFocused)
                    .lineLimit(1...5)
                
                Button(action: sendMessage) {
                    Image(systemName: "arrow.up.circle.fill")
                        .font(.system(size: 32))
                        .foregroundColor(messageText.isEmpty ? .gray : sharkColor)
                }
                .disabled(messageText.isEmpty || viewModel.isLoading)
            }
            .padding()
            .background(Color(.systemBackground))
        }
        .navigationBarTitleDisplayMode(.inline)
        .onAppear {
            viewModel.apiService = apiService
        }
    }
    
    private func sendMessage() {
        let text = messageText.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !text.isEmpty else { return }
        
        messageText = ""
        isInputFocused = false
        viewModel.sendMessage(text)
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

// MARK: - Shark Header
struct SharkHeaderView: View {
    let shark: Shark
    
    var body: some View {
        HStack(spacing: 12) {
            Circle()
                .fill(sharkColor)
                .frame(width: 40, height: 40)
                .overlay(
                    Text(shark.name.prefix(1))
                        .font(.headline)
                        .foregroundColor(.white)
                )
            
            VStack(alignment: .leading, spacing: 2) {
                Text(shark.name)
                    .font(.headline)
                
                Text("💼 \(shark.dealPreferences.equityRange) equity")
                    .font(.caption)
                    .foregroundColor(.secondary)
            }
            
            Spacer()
        }
        .padding()
        .background(Color(.systemBackground))
        .shadow(color: Color.black.opacity(0.05), radius: 2, y: 1)
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

// MARK: - Welcome Message
struct WelcomeMessageView: View {
    let sharkName: String
    
    var body: some View {
        VStack(spacing: 12) {
            Text("👋")
                .font(.system(size: 50))
            
            Text("Ready to pitch?")
                .font(.title2)
                .fontWeight(.bold)
            
            Text("Start with your elevator pitch or ask for guidance from \(sharkName).")
                .font(.subheadline)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
        }
        .frame(maxWidth: .infinity)
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(16)
    }
}

// MARK: - Message Bubble
struct MessageBubble: View {
    let message: Message
    let sharkColor: Color
    
    var body: some View {
        HStack {
            if message.role == "user" {
                Spacer()
            }
            
            Text(message.content)
                .padding(12)
                .background(bubbleColor)
                .foregroundColor(textColor)
                .cornerRadius(16)
                .frame(maxWidth: 280, alignment: message.role == "user" ? .trailing : .leading)
            
            if message.role == "assistant" {
                Spacer()
            }
        }
        .padding(.horizontal)
    }
    
    private var bubbleColor: Color {
        message.role == "user" ? sharkColor : Color(.systemGray5)
    }
    
    private var textColor: Color {
        message.role == "user" ? .white : .primary
    }
}

// MARK: - Typing Indicator
struct TypingIndicator: View {
    @State private var animating = false
    
    var body: some View {
        HStack(spacing: 4) {
            ForEach(0..<3) { index in
                Circle()
                    .fill(Color.gray)
                    .frame(width: 8, height: 8)
                    .opacity(animating ? 0.3 : 1.0)
                    .animation(
                        Animation.easeInOut(duration: 0.6)
                            .repeatForever()
                            .delay(Double(index) * 0.2),
                        value: animating
                    )
            }
        }
        .padding(12)
        .background(Color(.systemGray5))
        .cornerRadius(16)
        .onAppear {
            animating = true
        }
    }
}

// MARK: - View Model
@MainActor
class ChatViewModel: ObservableObject {
    let shark: Shark
    var apiService: APIService?
    
    @Published var messages: [Message] = []
    @Published var isLoading = false
    @Published var session: PitchSession
    @Published var currentResponse = ""
    
    init(shark: Shark) {
        self.shark = shark
        self.session = PitchSession(sharkId: shark.id)
    }
    
    func sendMessage(_ text: String) {
        // Add user message
        let userMessage = Message(role: "user", content: text)
        messages.append(userMessage)
        
        isLoading = true
        currentResponse = ""
        
        apiService?.sendMessage(
            message: text,
            sharkId: shark.id,
            sessionId: session.id,
            conversationHistory: messages,
            onChunk: { [weak self] chunk in
                self?.currentResponse += chunk
            },
            completion: { [weak self] result in
                guard let self = self else { return }
                self.isLoading = false
                
                switch result {
                case .success(let response):
                    let assistantMessage = Message(role: "assistant", content: response)
                    self.messages.append(assistantMessage)
                    
                case .failure(let error):
                    let errorMessage = Message(
                        role: "assistant",
                        content: "Sorry, I couldn't process that. Error: \(error.localizedDescription)"
                    )
                    self.messages.append(errorMessage)
                }
            }
        )
    }
}

#Preview {
    NavigationView {
        ChatView(shark: Shark.allSharks[0])
            .environmentObject(APIService())
    }
}
