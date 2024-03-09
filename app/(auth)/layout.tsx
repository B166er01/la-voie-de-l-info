import Link from 'next/link'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <nav className="absolute top-0 flex items-center w-full gap-3 h-18">
        <Link
          href={'/'}
          className="flex flex-col items-center justify-center w-full pt-3 scale-75 lg:pt-0"
        >
          <h1 className="text-4xl lg:text-5xl">La Voie De L&rsquo;Info</h1>
          <p className="hidden text-lg lg:inline-block">
            Votre fenêtre sur l&rsquo;actualité
          </p>
        </Link>
      </nav>
      {children}
    </div>
  )
}
