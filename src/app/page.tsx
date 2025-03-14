import { Container } from '@/app/components/container'
import { GameProps } from '@/utils/types/game'
import { CircleArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

async function getDayleGame() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_UTL}/next-api/?api=game_day`
    )
    return res.json()
  } catch (err) {
    console.error(err)
    throw new Error('Failed to fetch data')
  }
}

export default async function Home() {
  const dalyGame: GameProps = await getDayleGame()

  return (
    <main className="w-full">
      <Container>
        <h1 className="text-center font-bold text-xl mt-8 mb-5">
          Separamos um jogo exclusivo para você
        </h1>
        <Link href={`/game/${dalyGame.id}`}>
          <section className="w-full bg-black rounded-lg">
            <div className="w-full max-h-96 h-96 relative rounded-lg">
              <div className="absolute z-20 bottom-0 p-3 flex items-center justify-center gap-3">
                <p className="text-white font-bold text-xl">{dalyGame.title}</p>
                <CircleArrowRight className="text-[#FFF]" />
              </div>
              <Image
                src={dalyGame.image_url}
                alt={dalyGame.title}
                quality={100}
                priority
                fill
                className="max-h-96 object-cover rounded-lg opacity-50 hover:opacity-100 transition-all duration-200"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
              />
            </div>
          </section>
        </Link>
      </Container>
    </main>
  )
}
