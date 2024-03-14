import { getArticleBySlug } from '@/actions/articlesActions'
import Scrolltop from '@/components/buttons/Scrolltop'
import MainCard from '@/components/cards/MainCard'
import SingleCard from '@/components/cards/SingleCard'
import SingleGutterCard from '@/components/cards/SingleGutterCard'
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

    <div className='w-full mx-auto pt-3'>
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
    </div>




















    // <div className="w-full  mx-auto mt-28">
    //   <h1 className="text-4xl leading-snug font-large  xl:leading-[1.2]  xl:text-5xl  font-newsreader lg:my-0 my-12 line-clamp-2">
    //     {article.title}
    //   </h1>

    //   <div className="relative flex h-auto gap-6 mx-auto mt-12">
    //     <div className="flex-grow mx-auto">
    //       <div className="flex items-center justify-between gap-6 my-3">
    //         <div className="flex items-center gap-3">
    //           <div className="w-12 h-12 rounded-full">
    //             <Image
    //               src={article.author.image}
    //               width={482}
    //               height={482}
    //               alt={article.images[0].legend}
    //               className="rounded-full"
    //             />
    //           </div>
    //           <div className="text-xl">published by: {article.author.name}</div>
    //         </div>

    //         <p className="text-lg">{formattedDate}</p>
    //       </div>

    //       <SingleCard article={article} />
    //     </div>

    //     <div className="h-screen sticky top-0 pt-[75px] mx-3">
    //       <SingleGutter />
    //     </div>
    //   </div>

    //   {article._id && <IncreaseNumberOfViews id={article._id} />}
    //   {/* <HandleVisitor ip={ip} />  */}
    //   <Scrolltop />
    // </div>
  )
}

export default SinglePage
