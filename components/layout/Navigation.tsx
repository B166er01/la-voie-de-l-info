import { getCategories } from '@/actions/categoryActions'


const Navigation = async () => {
  const category = await getCategories()

  console.log(category, "cat")

  return (
    <div>

    </div>
  )
}

export default Navigation
