'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, type FormEvent } from 'react'

export function Input() {
  const [input, setInput] = useState('')
  const router = useRouter()

  function handleSearch(e: FormEvent) {
    e.preventDefault()

    if (input === '') return
    router.push(`/game/search/${input}`)
  }

  return (
    <form
      className="w-full bg-slate-200 my-5 flex gap-2 items-center justify-between rounded-lg p-2"
      onSubmit={handleSearch}
    >
      <input
        className="bg-slate-200 outline-none w-11/12"
        type="text"
        placeholder="Procurando algum jogo?"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">
        <Search className="text-[#EA580C]" />
      </button>
    </form>
  )
}
