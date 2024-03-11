'use client'

import { ISidebarProps } from '@/types'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import RippleButton from '../buttons/RippleButton'
import SearchInput from '../forms/SearchInput'

const Sidebar: React.FC<ISidebarProps> = ({
  isMenuOpen,
  setIsMenuOpen,
  cat,
}) => {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)

  const handleMouseEnter = (categoryName: string) => {
    setCurrentCategory(categoryName)
  }
  const handleMouseLeave = () => {
    setCurrentCategory(null)
  }

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  return (
    <>
      <div
        className={`w-52 h-[calc(100vh-80px)] fixed z-50 bg-white top-[80px] "left-0" transition-transform  flex flex-col ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-96'
        }`}
      >
        <div className="px-4">
          <Link href="/subscribe">
            <RippleButton
              text="Subscribe"
              buttonClasses="rounded-full text-white py-2 border  px-3 bg-primaryBlue w-full mt-6 text-lg lg:text-xl"
              onClick={() => setIsMenuOpen(false)}
            />
          </Link>
          <div className="w-full my-9">
            <SearchInput setIsMenuOpen={setIsMenuOpen} />
          </div>
        </div>

        <ul className="w-full py-3 text-xl lg:text-2xl no-scrollbar">

          {cat?.map((link, i) => (
            <li key={i} className="relative">
              
              <Link
                href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/articles?category=${link.name}`}
                className={`flex items-center justify-between ${
                  currentCategory === link.name
                    ? 'bg-secondaryBlue'
                    : 'hover:bg-secondaryBlue cursor-pointer'
                } `}
                onMouseEnter={() => handleMouseEnter(link.name)}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  setCurrentCategory(null)
                  setIsMenuOpen(!isMenuOpen)
                }}
              >
                <div className={`p-3 capitalize`}>{link.name}</div>
                {link.sub.length > 0 && <ChevronRight />}
              </Link>
              {currentCategory === link.name && link.sub.length > 0 && (
                <div
                  className="absolute right-0 top-[50%] transform lg:translate-x-[100%] translate-x-[95%] translate-y-[-50%] flex flex-col capitalize"
                  onMouseEnter={() => handleMouseEnter(link.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="min-w-[180px] flex">
                    <div className="flex-grow h-full"></div>
                    {/* Apply overflow-y-scroll here */}
                    <ul className="bg-white min-w-[160px] border">
                      {link.sub.map((subcategory, subIndex) => (

                        
                        <li key={subIndex} className="flex bg-white">
                          <Link
                            href={`${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/articles?category=${link.name}&subcategory=${subcategory.name}`}
                            onClick={() => {
                              setCurrentCategory(link.name)
                              setIsMenuOpen(!isMenuOpen)
                            }}
                            className={`w-full px-4 py-2 hover:bg-secondaryBlue cursor-pointer`}
                          >
                            {subcategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div
        onClick={() => setIsMenuOpen(false)}
        className={`w-full h-full fixed top-[70px] ${
          isMenuOpen
            ? 'bg-black bg-opacity-70 z-40'
            : 'bg-white bg-opacity-0 -z-10'
        }`}
      ></div>
    </>
  )
}

export default Sidebar
