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



// export const getCategoryViews = async () => {
//   try {
//     const result = await Article.aggregate([
//       {
//         $group: {
//           _id: '$category.id',  // Group by category id
//           totalViews: { $sum: '$numberOfViews' },  // Sum the numberOfViews for each category
//         },
//       },
//       {
//         $lookup: {
//           from: 'categories',  // The name of your categories collection
//           localField: '_id',
//           foreignField: '_id',
//           as: 'category',
//         },
//       },
//       {
//         $unwind: '$category',
//       },
//       {
//         $sort: { totalViews: -1 },  // Sort by totalViews in descending order
//       },
//     ]);

//     return result;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// };


