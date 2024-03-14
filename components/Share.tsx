'use client'

import { usePathname } from 'next/navigation'
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  XIcon,
} from 'react-share'

const Share = () => {
  const pathname = usePathname()
  const baseUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL

  return (
    <div className="flex gap-2 mt-3">
      <FacebookShareButton url={`${baseUrl}${pathname}`} aria-label="buy product">
        <FacebookIcon size={35} borderRadius={10} />
      </FacebookShareButton>

      <TwitterShareButton url={`${baseUrl}${pathname}`} aria-label="buy product">
        <XIcon size={35} borderRadius={10} />
      </TwitterShareButton>
    </div>
  )
}

export default Share
