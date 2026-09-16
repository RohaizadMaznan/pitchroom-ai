import Foundation

// MARK: - Shark Model
struct Shark: Identifiable, Codable {
    let id: String
    let name: String
    let title: String
    let background: String
    let investmentThesis: String
    let dealPreferences: DealPreferences
    let personality: String
    
    struct DealPreferences: Codable {
        let minInvestment: Int
        let maxInvestment: Int
        let equityRange: String
        let preferredIndustries: [String]
    }
}

// MARK: - Message Model
struct Message: Identifiable, Codable {
    let id: String
    let role: String // "user" or "assistant"
    let content: String
    let timestamp: Date?
    
    init(id: String = UUID().uuidString, role: String, content: String, timestamp: Date? = Date()) {
        self.id = id
        self.role = role
        self.content = content
        self.timestamp = timestamp
    }
}

// MARK: - Chat Request
struct ChatRequest: Codable {
    let messages: [MessagePayload]
    let sharkId: String
    let sessionId: String?
    
    struct MessagePayload: Codable {
        let role: String
        let content: String
    }
}

// MARK: - Pitch Session
struct PitchSession: Identifiable, Codable {
    let id: String
    let sharkId: String
    var messages: [Message]
    let createdAt: Date
    
    init(id: String = UUID().uuidString, sharkId: String) {
        self.id = id
        self.sharkId = sharkId
        self.messages = []
        self.createdAt = Date()
    }
}

// MARK: - Hardcoded Sharks (matching backend)
extension Shark {
    static let allSharks: [Shark] = [
        Shark(
            id: "mark-cuban",
            name: "Mark Cuban",
            title: "Tech Mogul & Mavericks Owner",
            background: "Serial entrepreneur who sold Broadcast.com for $5.7B",
            investmentThesis: "Tech-enabled businesses with strong unit economics",
            dealPreferences: DealPreferences(
                minInvestment: 50000,
                maxInvestment: 2000000,
                equityRange: "10-20%",
                preferredIndustries: ["Technology", "SaaS", "E-commerce"]
            ),
            personality: "Direct, numbers-focused, no BS"
        ),
        Shark(
            id: "barbara-corcoran",
            name: "Barbara Corcoran",
            title: "Real Estate Queen",
            background: "Built $5B real estate empire from $1,000 loan",
            investmentThesis: "People-first businesses with strong brand potential",
            dealPreferences: DealPreferences(
                minInvestment: 50000,
                maxInvestment: 1000000,
                equityRange: "15-25%",
                preferredIndustries: ["Consumer Products", "Real Estate", "Lifestyle"]
            ),
            personality: "Warm but shrewd, invests in entrepreneurs"
        ),
        Shark(
            id: "kevin-oleary",
            name: "Kevin O'Leary",
            title: "Mr. Wonderful",
            background: "Sold The Learning Company for $4.2B",
            investmentThesis: "Cash-flow positive businesses, royalty deals",
            dealPreferences: DealPreferences(
                minInvestment: 100000,
                maxInvestment: 3000000,
                equityRange: "20-30% or royalty",
                preferredIndustries: ["Manufacturing", "Consumer Goods", "Licensing"]
            ),
            personality: "Ruthless, money-obsessed, theatrical"
        ),
        Shark(
            id: "lori-greiner",
            name: "Lori Greiner",
            title: "Queen of QVC",
            background: "Created 700+ products, 120 patents",
            investmentThesis: "Hero products with mass retail appeal",
            dealPreferences: DealPreferences(
                minInvestment: 50000,
                maxInvestment: 1500000,
                equityRange: "15-25%",
                preferredIndustries: ["Consumer Products", "Retail", "Inventions"]
            ),
            personality: "Enthusiastic, product-focused, QVC expert"
        ),
        Shark(
            id: "daymond-john",
            name: "Daymond John",
            title: "FUBU Founder",
            background: "Built FUBU into $6B brand from basement",
            investmentThesis: "Brand-driven businesses with cultural relevance",
            dealPreferences: DealPreferences(
                minInvestment: 50000,
                maxInvestment: 1000000,
                equityRange: "20-33%",
                preferredIndustries: ["Fashion", "Lifestyle", "Branding"]
            ),
            personality: "Cool, culture-savvy, authentic hustler"
        )
    ]
}
