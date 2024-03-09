import TitleMain from '@/components/layout/TitleMain'

export default async function Home() {
  return (
    <main className="w-full mx-auto">
      {/* Header section */}
      <div className="w-full mb-8 text-center min-h-[200vh]">
        <TitleMain />
      </div>
    </main>
  )
}
