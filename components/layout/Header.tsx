'use client'

import { TCategory } from '@/types'
import { TextSearch } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import RippleButton from '../buttons/RippleButton'
import Sidebar from './Sidebar'
import { useRef } from 'react'

const Header: React.FC<{ cat: TCategory[] }> = ({ cat }) => {
  const [showTitle, setShowTitle] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobileScreen, setIsMobileScreen] = useState<boolean | null>(null)

  const { data: session } = useSession()
  const titleRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      if (scrollY > 80) {
        setShowTitle(true)
      } else {
        setShowTitle(false)
      }
    }

    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 1024)
    }

    // Initial setup
    handleScroll()
    handleResize()

    // Event listeners
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])


  return (
    <>
      <Sidebar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        cat={cat}
      />

      <header
        className="fixed top-0 left-0 z-50 w-full h-[70px] bg-white"
        ref={headerRef}
      >
        <nav className="relative flex items-center justify-between w-full h-full gap-3 p-3">
          {/* Left side */}
          <div
            className={`${
              showTitle && !isMobileScreen? '' : 'flex flex-grow gap-6 items-center'
            }`}
          >
            <TextSearch
              size={28}
              strokeWidth={1}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer"
            />

            {isMobileScreen ? (
              <p className='hidden text-xl sm:inline-block'>La Voie De L&rsquo;Info</p>
            ) : (
              <div className={`${showTitle ? 'hidden' : 'flex flex-grow '}`}>
                <ul className="hidden gap-4 text-xl capitalize lg:text-2xl lg:flex">
                  {cat?.map((c, i) => (
                    <li key={i}>
                      <Link
                        href={`/articles?category=${c.name}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div
            className={`absolute top-[200%] left-1/2 -translate-x-[50%]  text-6xl transition ${
              showTitle && '-translate-y-32 scale-75'
            } ${isMobileScreen && 'hidden'}`}
            ref={titleRef}
          >
            <div className="w-full text-center">
              <h1 className="text-5xl lg:text-6xl">La Voie De L&rsquo;Info</h1>
              <p className="text-lg">Votre fenêtre sur l&rsquo;actualité</p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex gap-3">
            <Link href="/subscribe">
              <RippleButton
                text="S'abonner"
                buttonClasses="rounded-full text-white py-[2px] px-3 border border-primaryBlue bg-primaryBlue lg:text-lg"
              />
            </Link>
            {session?.user ? (
              <Link href={`/profile/${session.user.userId}`}>
                <RippleButton
                  text="Profile"
                  buttonClasses="rounded-full py-1 border border-primaryBlue py-[2px] px-3 bg-white text-primaryBlue lg:text-lg"
                />
              </Link>
            ) : (
              <Link href="/login">
                <RippleButton
                  text="Connexion"
                  buttonClasses="rounded-full py-1 border border-primaryBlue py-[2px] px-3 bg-white text-primaryBlue lg:text-lg"
                />
              </Link>
            )}
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header
