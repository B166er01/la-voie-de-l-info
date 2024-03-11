import { getCategories, getCategoryViews } from '@/actions/categoryActions'
import Header from './Header'

const Navigation = async () => {
  const cat = await getCategoryViews()

  console.log(cat)
  return (
    <div>
      <Header cat={cat} />
    </div>
  )
}

export default Navigation
