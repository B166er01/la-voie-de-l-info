'use client'

import { handleVisitor } from '@/actions/VisitorActions'  
import { useEffect, useState } from 'react'
const HandleVisitor = ({ ip }: { ip: string }) => {
  const [canBeView, setCanBeView] = useState(true)

  useEffect(() => {
    // Check if visitor exists
    const getAsyncVisitor = async () => {
      try {
        const response = await handleVisitor({ ip })
        if (response.msg === 'Already 3 views') {
          setCanBeView(false)
          document.body.style.overflow = 'hidden'
        }
      } catch (error) {
        console.error('Error while fetching visitor data:', error)
      }
    }
    getAsyncVisitor()
  }, [ip])

  return (
    <>
      {canBeView === false && (
        <div className='fixed bottom-0 w-screen h-screen bg-black bg-opacity-95 z-20 left-0'>limit 3 viws/day subscibe for more content</div>
      )}
    </>
  )
}

export default HandleVisitor
