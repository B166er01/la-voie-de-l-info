import { getArticles } from '@/actions/articlesActions'
import { getCategoryViews } from '@/actions/categoryActions'
import MainGutter from '@/components/MainGutter'
import Test from '@/components/Test'
import Scrolltop from '@/components/buttons/Scrolltop'

import MainCard from '@/components/cards/MainCard'
import Slideer from '@/components/slider/Slideer'

export default async function Home() {
  const articles = await getArticles({ limit: 6 })

  //  await createCat()
  return (
    <main className="w-full mx-auto">
      {/* Header section */}

    
          <div className="w-full text-center py-12 lg:py-14">
            <h1 className="text-5xl lg:text-6xl">La Voie De L&rsquo;Info</h1>
            <p className="text-base">Votre fenêtre sur l&rsquo;actualité</p>
          </div>

      
      
      

      {/* Main content section */}
      <div className="relative flex justify-center h-auto gap-6 mx-auto z-5 lg:justify-start">
        {/* Article list section */}
        <ul className="flex flex-col divide-y-2">
          {articles.data?.slice(0, 4).map((a, i) => (
            <li key={i}>
              <MainCard article={a} />
            </li>
          ))}
        </ul>

        {/* Sidebar section (sticky) */}
        <div className="sticky z-0 h-screen  w-[250px] min-h-screen hidden 2xl:inline-block mt-8 top-24">
          <MainGutter />
        </div>
      </div>

      <Slideer articles={articles.data} />


      {/* Main content section */}
      <div className="relative flex justify-center h-auto gap-6 mx-auto z-5 lg:justify-start">
        {/* Article list section */}
        <ul className="flex flex-col divide-y-2">
          {articles.data?.slice(0, 4).map((a, i) => (
            <li key={i}>
              <MainCard article={a} />
            </li>
          ))}
        </ul>

        {/* Sidebar section (sticky) */}
        <div className="sticky z-0 h-screen  w-[250px] min-h-screen hidden 2xl:inline-block mt-8 top-24">
          <MainGutter />
        </div>
      </div>

      <Test articles={articles.data?.slice(0, 4) } />
      <Scrolltop />
    </main>
  )
}
