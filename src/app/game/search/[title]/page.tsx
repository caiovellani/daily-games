import { Container } from '@/app/components/container'
import { GameCard } from '@/app/components/gamecard'
import { Input } from '@/app/components/input'
import type { GameProps } from '@/utils/types/game'

async function getData(title: string) {
  try {
    const decodeTitle = decodeURI(title)
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`
    )
    return res.json()
  } catch (err) {
    console.error(err)
  }
}

export default async function Search({
  params: { title },
}: {
  params: { title: string }
}) {
  const games: GameProps[] = await getData(title)

  return (
    <main className="w-full text-black">
      <Container>
        <Input />

        <h1 className="font-bold text-xl mt-8 mb-5">
          Veja o que encontramos na nossa base:
        </h1>

        {!games && <p>Esse jogo não foi encontrado...</p>}
        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games &&
            games.map((item) => {
              return <GameCard key={item.id} data={item} />
            })}
        </section>
      </Container>
    </main>
  )
}
