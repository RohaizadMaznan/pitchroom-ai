'use client'
import Link from 'next/link'
import type { SharkProfile } from '@/lib/sharks/profiles'

export function SharkHeader({ shark }: { shark: SharkProfile }) {
  return (
    <div className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-slate-400 hover:text-white transition-colors">← Back</Link>
        <div>
          <h2 className="text-xl font-bold text-white">{shark.name}</h2>
          <p className="text-sm text-emerald-400">{shark.title}</p>
        </div>
      </div>
      <div className="text-right text-xs text-slate-400">
        <p>Investment: {shark.dealPreferences.preferredEquity}</p>
        <p>Up to ${(shark.dealPreferences.maxInvestment / 1000000).toFixed(1)}M</p>
      </div>
    </div>
  )
}
