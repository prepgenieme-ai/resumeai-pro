import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  inverted?: boolean
  href?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = { sm: 24, md: 32, lg: 40 }

export default function Logo({ inverted = false, href = '/', size = 'md' }: LogoProps) {
  const h = sizes[size]
  const img = (
    <Image
      src="/logo.png"
      alt="Karyr"
      width={h * 2.5}
      height={h}
      className={`h-auto w-auto ${inverted ? 'brightness-0 invert' : 'brightness-0'}`}
      style={{ maxHeight: h }}
      priority
    />
  )
  return href ? <Link href={href}>{img}</Link> : img
}
