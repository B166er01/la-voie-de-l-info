import Footer from "@/components/layout/Footer"
import Navigation from "@/components/layout/Navigation"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Navigation />
      <div className="max-w-screen-xl mx-auto mt-24">
        {children}
      <Footer />
      </div>
    </div>
  )
}
