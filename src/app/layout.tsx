import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/app/components/header'

export const metadata: Metadata = {
  title: 'Daily Games',
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
