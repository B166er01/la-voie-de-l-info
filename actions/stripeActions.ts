'use server'

import Stripe from 'stripe'

const stripeSecret = process.env.STRIPE_SECRET_KEY 

export const getStripeProducts = async () => {
  const stripe = new Stripe(stripeSecret as string)
  const prices = await stripe.prices.list({
    limit: 1,
  })

  return ( prices.data.reverse() )
}
