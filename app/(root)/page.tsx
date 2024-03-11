import { getArticles } from '@/actions/articlesActions'
import MainGutter from '@/components/MainGutter'
import MainCard from '@/components/cards/MainCard'
import TitleMain from '@/components/layout/TitleMain'

export default async function Home() {
  const articles = await getArticles({ limit: 6 })

  console.log(articles)
  //  await createCat()
  return (
    <main className="w-full mx-auto">
      {/* Header section */}
      <div className="w-full lg:mb-[300px] text-center">
        <TitleMain />
      </div>

      {/* Main content section */}
      <div className="relative flex justify-center h-auto gap-6 mx-auto z-5 lg:justify-start">
        {/* Article list section */}
        <ul className="flex flex-col divide-y-2">
          {articles.data?.slice(0, 3).map((a, i) => (
            <li key={i}>
              <MainCard article={a} />
            </li>
          ))}
        </ul>

        {/* Sidebar section (sticky) */}
        <div className="sticky z-0 h-screen top-24 w-[250px] min-h-screen hidden 2xl:inline-block">
          <MainGutter />
        </div>
      </div>

    </main>
  )
}
