import Foundation
import Combine

class APIService: ObservableObject {
    // MARK: - Configuration
    private let baseURL: String
    
    // MARK: - Published Properties
    @Published var isLoading = false
    @Published var errorMessage: String?
    
    init(baseURL: String = "http://localhost:3000") {
        self.baseURL = baseURL
    }
    
    // MARK: - API Methods
    
    /// Send a message to a shark and get streaming response
    func sendMessage(
        message: String,
        sharkId: String,
        sessionId: String?,
        conversationHistory: [Message],
        onChunk: @escaping (String) -> Void,
        completion: @escaping (Result<String, Error>) -> Void
    ) {
        guard let url = URL(string: "\(baseURL)/api/pitch") else {
            completion(.failure(NSError(domain: "Invalid URL", code: -1)))
            return
        }
        
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        
        // Build messages array
        var messages: [[String: String]] = conversationHistory.map { msg in
            ["role": msg.role, "content": msg.content]
        }
        messages.append(["role": "user", "content": message])
        
        let requestBody: [String: Any] = [
            "messages": messages,
            "sharkId": sharkId,
            "sessionId": sessionId as Any
        ]
        
        do {
            request.httpBody = try JSONSerialization.data(withJSONObject: requestBody)
        } catch {
            completion(.failure(error))
            return
        }
        
        // Use URLSession for streaming
        let task = URLSession.shared.dataTask(with: request) { data, response, error in
            DispatchQueue.main.async {
                self.isLoading = false
                
                if let error = error {
                    completion(.failure(error))
                    return
                }
                
                guard let data = data else {
                    completion(.failure(NSError(domain: "No data received", code: -1)))
                    return
                }
                
                if let responseString = String(data: data, encoding: .utf8) {
                    // For now, handle as complete response
                    // In production, implement proper streaming with SSE
                    onChunk(responseString)
                    completion(.success(responseString))
                } else {
                    completion(.failure(NSError(domain: "Failed to decode response", code: -1)))
                }
            }
        }
        
        DispatchQueue.main.async {
            self.isLoading = true
        }
        
        task.resume()
    }
    
    /// Get all available sharks (using local data for MVP)
    func getSharks() -> [Shark] {
        return Shark.allSharks
    }
}
