import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from '@/lib/validations/schema'
import { MouseEvent, ReactNode } from 'react'
import { z } from 'zod'

// based on Zod schema
export type IRegisterSchema = z.infer<typeof registerSchema>
export type ILoginSchema = z.infer<typeof loginSchema>
export type IForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>
export type IResetPasswordSchema = z.infer<typeof resetPasswordSchema>

// Ripple button
export interface IRippleButtonProps {
  text: string
  buttonClasses?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  type?: 'button' | 'submit' | 'reset' | undefined
  icon?: ReactNode
  isLoading?: boolean
}
export interface IRipple {
  x: number
  y: number
  size: number
  id: number
}



///////////////


export interface CardSubscriptionProps {
  data: {
    unit_amount: number
    id: number
    // Add other properties based on the actual structure of data
  }
  userEmail: string // Assuming userEmail is a string, update accordingly
}



// Subcategory
export interface TSubcategory {
  _id?: string
  name: string
}
// Category
export interface TCategory {
  _id?: string
  name: string
  sub: TSubcategory[]
}
// Author
export interface TAuthor {
  _id?: string
  name: string
  image: string
  articles: string[]
}
// Article
export interface TImage {
  url: string
  legend: string
}
export interface TArticle {
  _id?: string
  title: string
  slug: string
  content: string[]
  category: {
    id: string
    slug: string
  }
  subcategory?: {
    id: string
    slug: string
  }
  author: TAuthor
  images: TImage[]
  numberOfViews: Number
  createdAt: Date
}
export interface GetArticlesParams {
  page?: number
  limit?: number
  query?: string
  category?: string
  subcategory?: string
  sort?: string
}
export interface IGetArticlesResponse {
  data: TArticle[]
  totalPages: number
}


export interface SearchInputProps {
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ISidebarProps {
  isMenuOpen: boolean
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  cat: TCategory[]
}