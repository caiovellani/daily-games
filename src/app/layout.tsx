import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/app/components/header'

export const metadata: Metadata = {
  title: 'Daily Games - Descubra jogos incríveis para se divertir',
  description: 'Mais de 10 mil jogos separados e organizados.',
  keywords: ['games', 'jogos', 'steam', 'ps5', 'playstation', 'xbox'],
  openGraph: {
    images: [`${process.env.PROJECT_URL}/preview.png`],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <Header />
      <body className="antialiased">{children}</body>
    </html>
  )
}
