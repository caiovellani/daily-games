import { Gamepad2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  return (
    <header className="w-full h-28 bg-slate-100 text-black px-2">
      <div className="max-w-7xl mx-auto flex justify-center items-center h-28 sm:justify-between">
        <nav className="flex justify-center items-center gap-4">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt="Logo do site dalygames"
              width={168}
              height={39}
              quality={100}
              priority
              className="w-full"
            />
          </Link>

          <Link href="/">Games</Link>
        </nav>

        <div className="hidden sm:flex justify-center items-center">
          <Link href="/profile">
            <Gamepad2 className="size-9 text-[#475569]" />
          </Link>
        </div>
      </div>
    </header>
  )
}
