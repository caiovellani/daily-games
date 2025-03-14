import type { GameProps } from '@/utils/types/game'
import { CircleArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface GameCardProps {
  data: GameProps
}

export function GameCard({ data }: GameCardProps) {
  return (
    <Link href={`/game/${data.id}`}>
      <section className="w-full bg-slate-50 rounded-lg p-2 mb-5">
        <div className="relative w-full h-56 hover:scale-105 transition-all duration-300">
          <Image
            src={data.image_url}
            alt={data.title}
            sizes="(max-width: 786px) 100vw, (max-width: 1200px) 44vw"
            fill
            quality={100}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex items-center mt-4 justify-between">
          <p className="font-bold text-sm px-2 text-ellipsis truncate whitespace-nowrap overflow-hidden">
            {data.title}
          </p>
          <CircleArrowRight className="text-black" />
        </div>
      </section>
    </Link>
  )
}
