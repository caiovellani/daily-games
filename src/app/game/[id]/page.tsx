import { Container } from '@/app/components/container'
import { GameCard } from '@/app/components/gamecard'
import { Label } from '@/app/game/[id]/components/label'
import type { GameProps } from '@/utils/types/game'
import type { Metadata } from 'next'
import Image from 'next/image'
import { redirect } from 'next/navigation'

interface PropsParams {
  params: {
    id: string
  }
}

export async function generateMetadata({
  params,
}: PropsParams): Promise<Metadata> {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`,
      { cache: 'no-store' }
    )
      .then((res) => res.json() as Promise<GameProps>)
      .catch(
        () =>
          ({
            title: 'DalyGames - Descubra jogos incríveis para se divertir',
            description: '',
            image_url: '',
          } as GameProps)
      )

    return {
      title: response.title,
      description: response.description
        ? `${response.description.slice(0, 100)}...`
        : 'Descrição não disponível.',
      openGraph: {
        title: response.title,
        images: response.image_url ? [response.image_url] : [],
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        },
      },
    }
  } catch (err) {
    console.error(err)
    return {
      title: 'DalyGames - Descubra jogos incríveis para se divertir.',
    }
  }
}

async function getData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { cache: 'no-store' }
    )
    return res.json()
  } catch (err) {
    console.error(err)
    throw new Error('Failed to fetch data')
  }
}

async function getSortedGame() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { cache: 'no-store' }
    )
    return res.json()
  } catch (err) {
    console.error(err)
    throw new Error('Failed to fetch data')
  }
}

export default async function GameDetails({
  params: { id },
}: {
  params: { id: string }
}) {
  const data: GameProps = await getData(id)
  const sortedGame: GameProps = await getSortedGame()

  if (!data) {
    redirect('/')
  }

  return (
    <main className="w-full text-black">
      <div className="bg-black h-80 w-full relative sm:h-96">
        <Image
          src={data.image_url}
          alt={data.title}
          priority
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
          className="object-cover w-full h-80 sm:96"
          quality={100}
        />
      </div>
      <Container>
        <h1 className="font-bold text-xl my-4">{data.title}</h1>
        <p>{data.description}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
        <div className="flex gap-2 flex-wrap">
          {data.categories.map((item, i) => {
            return <Label key={i} name={item} />
          })}
        </div>

        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
        <div className="flex gap-2 flex-wrap">
          {data.platforms.map((item, i) => {
            return <Label key={i} name={item} />
          })}
        </div>

        <p className="mt-7 mb-2">
          <strong>Data de lançamento: </strong>
          {data.release}
        </p>

        <h2 className="font-bold text-lg mt-7 mb-2">Jogo Recomendado:</h2>
        <div className="flex">
          <div className="flex-grow">
            <GameCard data={sortedGame} />
          </div>
        </div>
      </Container>
    </main>
  )
}
