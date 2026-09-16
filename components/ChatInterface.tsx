'use client'
import { useState, useRef, useEffect } from 'react'
import { useChat } from 'ai/react'

interface Props {
  sharkId: string
  initialSession?: string
}

export function ChatInterface({ sharkId, initialSession }: Props) {
  const [sessionId, setSessionId] = useState<string | null>(initialSession || null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/pitch',
    body: { sharkId, sessionId },
    onResponse: (response: any) => {
      const newSessionId = response.headers.get('X-Session-Id')
      if (newSessionId && !sessionId) {
        setSessionId(newSessionId)
        window.history.replaceState({}, '', `?session=${newSessionId}`)
      }
    }
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-slate-400 mt-20">
            <p className="text-lg mb-2">The shark is ready for your pitch.</p>
            <p className="text-sm">Start with your elevator pitch or ask for guidance...</p>
          </div>
        )}
        {messages.map((msg: any) => (
          <div key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-2xl px-4 py-3 rounded-xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 border border-slate-700 text-slate-100'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 border border-slate-700 px-4 py-3 rounded-xl">
              <span className="text-slate-400 text-sm animate-pulse">Thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit}
        className="border-t border-slate-700 p-4 flex gap-3 bg-slate-800">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Your pitch message..."
          className="flex-1 bg-slate-700 text-white placeholder-slate-400 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button type="submit" disabled={isLoading || !input.trim()}
          className="bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors">
          Send
        </button>
      </form>
    </div>
  )
}
