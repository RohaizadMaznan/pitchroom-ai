import Link from 'next/link'
import { SHARKS } from '@/lib/sharks/profiles'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-4">
            Pitch<span className="text-emerald-400">Room</span> AI
          </h1>
          <p className="text-xl text-slate-300 mb-2">Practice your pitch with AI Shark Tank investors</p>
          <p className="text-sm text-slate-400">Each shark has memory, personality, and real investment criteria</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Object.values(SHARKS).map((shark) => (
            <Link key={shark.id} href={`/pitch/${shark.id}`}
              className="group bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-400/20 transition-all duration-300">
              <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                {shark.name}
              </h3>
              <p className="text-sm text-emerald-400 mb-3">{shark.title}</p>
              <p className="text-sm text-slate-300 mb-4 line-clamp-2">{shark.personality}</p>
              <div className="mb-4">
                <p className="text-xs text-slate-400 mb-1">Investment Focus:</p>
                <p className="text-xs text-slate-200">{shark.investmentThesis}</p>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {shark.dealPreferences.industries.slice(0, 3).map((i) => (
                  <span key={i} className="text-xs bg-slate-700 text-slate-300 px-2 py-1 rounded">{i}</span>
                ))}
              </div>
              <p className="text-emerald-400 text-sm font-semibold group-hover:translate-x-2 transition-transform">
                Start Pitching →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
