import { Container } from '@/app/components/container'
import type { GameProps } from '@/utils/types/game'
import Image from 'next/image'
import { redirect } from 'next/navigation'

async function getData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`
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
      </Container>
    </main>
  )
}
