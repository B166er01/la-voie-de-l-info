'use server'

import { dbConnect } from '@/lib/dbConnect'
import User from "@/lib/models/User"

export const updateUserStatus = async (email: string, subscriptionNumber: string) => {
    try {
        await dbConnect()
        // Use the { new: true } option to return the updated document
        const updatedUser:  {email: string, subscriptionNumber: string} | null = await User.findOneAndUpdate(
            { email },
            {
                isSubscribe: true,
                subscriptionNumber: subscriptionNumber,
            },
            { new: true }
        );

        if (updatedUser) {
            console.log('User status updated successfully:', updatedUser);
        } else {
            console.error('User not found with the specified email:', email);
        }
    } catch (err) {
        console.error('Error updating user status:', err);
    }
};

export const getUserById = async (id: string) => {
    try {
      await dbConnect()
      const user = await User.findById(id)
      return JSON.parse(JSON.stringify(user))
    } catch (err) {
      console.error('Error fetching categories with subcategories:', err)
      throw err
    }
  }
  