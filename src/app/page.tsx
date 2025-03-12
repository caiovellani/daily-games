import { Container } from '@/app/components/container'
import type { GameProps } from '@/utils/types/game'
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
            <Image
              src={dalyGame.image_url}
              alt={dalyGame.title}
              quality={100}
              priority
              width={100}
              height={100}
            />
          </section>
        </Link>
      </Container>
    </main>
  )
}
