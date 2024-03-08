import { getStripeProducts } from '@/actions/stripeActions'
import CardSubscription from '@/components/cards/CardSubscription'
import { getSession } from 'next-auth/react'

const SubscribePage = async () => {
  const session = await getSession()
  const userEmail = session?.user.email

  const products = await getStripeProducts()

  return (
    <div className="min-h-screen pt-48">
      {products.map((s: any, i) => (
        <CardSubscription
          key={i}
          // data={s}
          data={{
            id: s.id,
            unit_amount: s.unit_amount,
          }}
          userEmail={userEmail}
        />
      ))}
    </div>
  )
}

export default SubscribePage
