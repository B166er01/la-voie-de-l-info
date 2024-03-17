import { TArticle } from '@/types'
import React from 'react'
import SliderCard from './cards/SliderCard'

const Test = ({articles}: {articles: TArticle[] | undefined }) => {
  return (
    <div className="flex flex-col max-w-screen-sm p-3 mx-auto mt-6 lg:max-w-screen-2xl lg:flex-row-reverse font-FrankRuhlLibre">
          <div className='lg:flex-1 bg-blue-800 lg:flex flex-wrap'>
              {articles?.map((a,i) => (
                  <SliderCard key={i} {...a}/>
                  ))}
          </div>
                  <div className='lg:flex-1 h-96 bg-red-800'></div>
          

    </div>
  )
}

export default Test