'use client'

import { increaseViewsById } from '@/actions/articlesActions'
import { useEffect } from 'react'

const IncreaseNumberOfViews = ({ id }: { id: string }) => {
  useEffect(() => {
    const res = increaseViewsById(id)
  }, [id])
  return <div></div>
}

export default IncreaseNumberOfViews
