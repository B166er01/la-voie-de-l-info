import { getArticles } from '@/actions/articlesActions'
import { getCategoryByName } from '@/actions/categoryActions'
import Collection from '@/components/Collection'
import InfinitScroll from '@/components/InfiniteScroll'
import Scrolltop from '@/components/buttons/Scrolltop'
import { GetArticlesParams, TSubcategory } from '@/types'
import Link from 'next/link'

const ArticlesPage = async ({
  searchParams,
}: {
  searchParams: GetArticlesParams
}) => {
  const res = await getArticles(searchParams)

  const categoryParams = searchParams.category ? searchParams.category : ''
  const queryryParams = searchParams.query ? searchParams.query : ''

  const categories = await getCategoryByName(categoryParams)

  return (
    <div className="min-h-screen pt-12">
      {queryryParams && <p>search , serach page</p>}

      {categoryParams && (
        <>
          <h1 className="w-full text-4xl lg:text-5xl text-center capitalize">
            <Link href={`?category=${searchParams.category}`}>
              {searchParams.category}
            </Link>
          </h1>
          <ul className="flex justify-center w-full gap-3 mt-6 mb-12 lg:mb-24">
            {categories.sub.map((subcategory: TSubcategory, i: number) => (
              <li
                key={i}
                className={`capitalize text-xl lg:text-2xl ${searchParams.subcategory === subcategory.name && 'underline underline-offset-8 decoration-1'}`}
              >
                <Link
                  href={`?category=${searchParams.category}&subcategory=${subcategory.name}`}
                >
                  {subcategory.name}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <Collection {...res} />
      <InfinitScroll {...res} />
      <Scrolltop />
    </div>
  )
}

export default ArticlesPage
