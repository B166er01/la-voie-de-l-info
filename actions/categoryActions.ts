'use server'

import { dbConnect } from '@/lib/dbConnect'
import Article from '@/lib/models/Article'
import Category from '@/lib/models/Category'
import Subcategory from '@/lib/models/Subcategory'

const BASE_URL = process.env.NEXT_PUBLIC_NEXTAUTH_URL

export const getCategories = async () => {
  try {
    await dbConnect()
    const categoriesWithSubcategories = await Category.find()
      .populate({
        path: 'sub',
        model: 'Subcategory',
        select: 'name',
      })
      .lean()
      .exec()
    return JSON.parse(JSON.stringify(categoriesWithSubcategories))
  } catch (error) {
    console.error('Error fetching categories with subcategories:', error)
    throw error
  }
}

export const getCategoryByName = async (name: string) => {
  try {
    await dbConnect()
    const res = await Category.findOne({ name })
      .populate({
        path: 'sub',
        model: 'Subcategory',
        select: 'name',
      })
      .exec()
    return JSON.parse(JSON.stringify(res))
  } catch (err) {
    console.error('Error fetching category by name:', err)
    return { error: 'An error occurred while fetching the category.' }
  }
}

export const createSub = async () => {
  try {
    const newSub = await Subcategory.create({
      name: 'international',
    })
    return { msg: 'success' }
  } catch (err) {
    console.log(err)
  }
}

export const createCat = async () => {
  try {
    const newCCat = await Category.create({
      name: 'culture',
      sub: ['65e19f848bbb02d4debb8420'],
    })
    return { msg: 'success' }
  } catch (err) {
    console.log(err)
  }
}



export const getCategoryViews = async () => {
  await dbConnect()
  try {
    const result = await Category.aggregate([
      {
        $lookup: {
          from: 'articles', // Use the actual name of your "Article" collection
          localField: '_id',
          foreignField: 'category.id',
          as: 'articles',
        },
      },
      {
        $addFields: {
          totalViews: { $sum: '$articles.numberOfViews' },
        },
      },
      {
        $lookup: {
          from: 'subcategories', // Use the actual name of your "Subcategory" collection
          localField: 'sub',
          foreignField: '_id',
          as: 'subcategories',
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          sub: {
            $map: {
              input: '$subcategories',
              as: 'sub',
              in: {
                id: '$$sub._id',
                name: '$$sub.name', // Assuming "title" is the field you want to include
              },
            },
          },
        },
      },
      {
        $sort: { totalViews: -1 },
      },
    ]);

    return JSON.parse(JSON.stringify(result))
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


