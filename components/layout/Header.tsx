'use client'

import { TCategory } from '@/types'
import { TextSearch } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion, useAnimation } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import RippleButton from '../buttons/RippleButton'
import Sidebar from './Sidebar'

const Header: React.FC<{ cat: TCategory[] }> = ({ cat }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const controls = useAnimation()
  const controls2 = useAnimation(); // Add a second animation control
  // use router to get url , look if / if else

  const { data: session } = useSession()

  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      // Check if the scroll position is greater than 1
      if (scrollPosition > 100) {
        setIsScrolled(true)
        controls.start({ opacity: 0, transition: { duration: 0.2 } })
        controls2.start({ opacity: 1, transition: { duration: 0.2 } }); // Inverse opacity for controls2
        // Set the state to true
      } else {
        setIsScrolled(false)
        controls.start({ opacity: 1 })
        controls2.start({ opacity: 0 });
        // Set the state to false
      }
    }

    // Attach the event listener to the window
    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []) // Empty dependency array ensures the effect runs only once on mount

  return (
    <>
      <Sidebar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        cat={cat}
      />

      <header className="fixed top-0 left-0 z-50 w-full h-[80px] bg-white border-b-2">
        <nav className="relative flex items-center justify-between w-full h-full gap-3 p-3">
          {/* Left side */}
          <div className="flex flex-grow gap-6 items-center">
            <TextSearch
              size={28}
              strokeWidth={1}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="cursor-pointer"
            />

            <motion.div
              className={`flex-grow hidden  ${
                !isScrolled && 'lg:inline-block'
              }`}
              initial={{ opacity: 1 }}
              animate={controls}
            >
              <ul className="hidden gap-4 text-xl capitalize lg:text-2xl lg:flex">
                {cat?.map((c, i) => (
                  <li key={i} className="underlineEffect">
                    <Link
                      href={`/articles?category=${c.name}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <div
              className="lg:hidden text-2xl hidden sm:inline-block"
      
            >
              La Voie De L&rsquo;Info
            </div>
          </div>

          <motion.div
            className={`absolute top-4 left-1/2 -translate-x-[50%] hidden ${
              isScrolled && 'lg:inline'
              }`}
              initial={{ opacity: 0 }}
              animate={controls2}
          >
            <Link href={'/'} className="w-full text-center">
              <h1 className="text-3xl">La Voie De L&rsquo;Info</h1>
              <p className="text-sm">Votre fenêtre sur l&rsquo;actualité</p>
            </Link>
          </motion.div>

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
