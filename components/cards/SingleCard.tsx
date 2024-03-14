import { TArticle } from '@/types'
import Image from 'next/image'
import Share from '../Share'

const SingleCard = ({ article }: { article: TArticle }) => {

  let articleCreationDate = new Date(article.createdAt)
  const formatter = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' })
  const formattedDate = formatter.format(articleCreationDate)
  
  return (
    <div className='w-full max-w-5xl mx-3 lg:mx-auto'>
          <div className="flex-grow mx-auto">
         <div className="flex items-center justify-between gap-6 my-3">
           <div className="flex items-center gap-3">
             <div className="w-12 h-12 rounded-full">
               <Image
                 src={article.author.image}
                 width={482}
                 height={482}
                 alt={article.images[0].legend}
                 className="rounded-full"
               />
             </div>
             <div className="text-xl">published by: {article.author.name}</div>
           </div>

           <p className="text-lg">{formattedDate}</p>
        </div>
        </div>
      <div className="w-full rounded">
        <Image
          src={article.images[0].url}
          width={1006}
          height={575}
          alt={article.images[0].legend}
        />
        <p className="capitalize py-3 text-sm text-gray-800">
          {article.images[0].legend}
        </p>
      </div>
      <Share />

      <ul>
        {article.content.map((c, i) => (
          <li key={i} className="my-24">
            <p className="text-2xl first-letter:text-3xl leading-10" key={i}>
              {c}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SingleCard


