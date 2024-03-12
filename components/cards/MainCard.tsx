import { TArticle } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

const MainCard = ({ article }: { article: TArticle }) => {


  return (
    <div className="flex flex-col max-w-screen-sm p-3 mx-auto mt-6 lg:max-w-screen-2xl lg:flex-row-reverse font-FrankRuhlLibre">
      <Link
        href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/article/${article.slug}`}
        className="rounded-sm lg:w-1/2"
      >
        <Image
          src={article.images[0].url}
          width={844}
          height={482}
          alt={article.images[0].legend}
        />
        <p className="py-3 text-gray-800 capitalize">
          {article.images[0].legend}
        </p>
      </Link>

      <div className="flex flex-col pr-3 lg:w-1/2 lg:justify-between">
        <Link
          href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/article/${article.slug}`}
          className="my-6 text-3xl leading-snug font-large xl:leading-tight xl:text-4xl lg:my-0 "
        >
          {article.title}
        </Link>
        <div>
          <div className="text-xl line-clamp-3">{article.content[0]}</div>
          <p className="py-5">written by: {article.author.name}</p>
        </div>
      </div>
    </div>
  )
}

export default MainCard
