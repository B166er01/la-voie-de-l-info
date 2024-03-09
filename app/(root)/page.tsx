import { createCat } from '@/actions/categoryActions'
import TitleMain from '@/components/layout/TitleMain'

export default async function Home() {

  //  await createCat()
  return (
    <main className="w-full mx-auto">
      {/* Header section */}
      <div className="w-full mb-8 text-center min-h-[200vh]">
        <TitleMain />
      </div>
    </main>
  )
}
