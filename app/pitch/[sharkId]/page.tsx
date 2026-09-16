import { SHARKS } from '@/lib/sharks/profiles'
import { notFound } from 'next/navigation'
import { ChatInterface } from '@/components/ChatInterface'
import { SharkHeader } from '@/components/SharkHeader'

interface Props {
  params: { sharkId: string }
  searchParams: { session?: string }
}

export default function PitchPage({ params, searchParams }: Props) {
  const shark = SHARKS[params.sharkId]
  if (!shark) notFound()

  return (
    <div className="flex flex-col h-screen bg-slate-900">
      <SharkHeader shark={shark} />
      <ChatInterface sharkId={params.sharkId} initialSession={searchParams.session} />
    </div>
  )
}
