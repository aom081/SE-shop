import React from 'react'
const categoryItems = [
  {
    id: 1,
    title: "Clothing",
    description: "(86 items)",
    image: "/images/home/category/img#.jpg",
  },
  {
    id: 2,
    title: "Clothing",
    description: "(86 items)",
    image: "/images/home/category/img#.jpg",
  },
  {
    id: 3,
    title: "Clothing",
    description: "(86 items)",
    image: "/images/home/category/img#.jpg",
  },
  {
    id: 4,
    title: "Clothing",
    description: "(86 items)",
    image: "/images/home/category/img#.jpg",
  },
  {
    id: 5,
    title: "Clothing",
    description: "(86 items)",
    image: "/images/home/category/img#.jpg",
  },
  {
    id: 6,
    title: "Clothing",
    description: "(86 items)",
    image: "/images/home/category/img#.jpg",
  },
]
const Categories = () => {
  return (
    <div className=' section-container py-16'>
      <div className=' text-center'>
        <p className='subtitle'> Customer Favorites </p>
        <h2 className='title'> Popular Category</h2>
      </div>
      <div className='flex flex-col sm:flex-row flex-wrap gap-6 justify-around items-center mt-12'>
        {categoryItems.map((item, i) => (
          <div
            key={i}
            className=' shadow-lg rounded-md bg-white py-6 px-5 w-72 mx-auto text-center cursor-pointer hover:translate-y-4 transition-all duration-300'>
            <div className='w-full mx-auto items-center justify-center'>
              <img
                src={item.image}
                alt=""
                className=' bg-red p-2 rounded-full w-28 h-28' />
            </div>
            <div className='mt-5 space-y-1'>
              <h5 className=' text-[#1E1E1E] font-semibold'> Title</h5>
              <p className=' text-secondary text-sm'> Description</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Categories