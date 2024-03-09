'use client'

import { useEffect, useState } from 'react'

const TitleMain = () => {
  const [isMobileScreen, setIsMobileScreen] = useState<boolean | null>(null)
  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 640)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <div className={`${!isMobileScreen && 'hidden'} text-4xl`}>
      La Voie De L&rsquo;Info
    </div>
  )
}

export default TitleMain
