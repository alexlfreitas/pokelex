import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'PokeLex',
  description: 'Pokédex no estilo gameboy criada por Alex Freitas e v0.dev',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
