import { getArticleBySlug } from '@/actions/articlesActions'
import Scrolltop from '@/components/buttons/Scrolltop'
import MainCard from '@/components/cards/MainCard'
import SingleCard from '@/components/cards/SingleCard'
import SingleGutterCard from '@/components/cards/SingleGutterCard'
import HandleVisitor from '@/components/HandleVisitor'
// import HandleVisitor from '@/components/HandleVisitor'
import IncreaseNumberOfViews from '@/components/IncreaseNumberOfViews'
import MainGutter from '@/components/MainGutter'
import SingleGutter from '@/components/SingleGutter'

import { headers } from 'next/headers'
import Image from 'next/image'

import React from 'react'

interface SinglePageProps {
  params: {
    slug: string
  }
}

const SinglePage: React.FC<SinglePageProps> = async ({ params: { slug } }) => {
  //const {session} = await getSession()

  const article = await getArticleBySlug(slug)
  const header = headers()
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]

  let articleCreationDate = new Date(article.createdAt)
  const formatter = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' })
  const formattedDate = formatter.format(articleCreationDate)

  return (
    <div className="w-full mx-auto pt-3">
      <h1 className="text-3xl sm:text-4xl w-full  max-w-5xl mx-3 lg:mx-auto sm:text-center 2xl:max-w-screen-xl lg:text-5xl 2xl:text-left text-left mb-6 ">
        {article.title}
      </h1>

      {/* Main content section */}
      <div className="relative flex justify-center h-auto gap-6 mx-auto z-5 lg:justify-start">
        {/* Article list section */}

        <SingleCard article={article} />

        {/* Sidebar section (sticky) */}
        <div className="sticky z-0 h-screen  w-[250px] min-h-screen hidden 2xl:inline-block mt-8 top-24">
          <MainGutter />
        </div>
      </div>
      <Scrolltop />
      {article._id && <IncreaseNumberOfViews id={article._id} />}
      <HandleVisitor ip={ip} />
    </div>

  )
}

export default SinglePage
