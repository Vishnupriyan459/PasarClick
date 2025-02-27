import React from 'react'

const Sort = () => {
  return (
   <>
   <form action="" className='text-[20px] text-[#364A15] font-[400]'>
    <div className='flex gap-x-1 border-b-2 border-[#364A1580] border-opacity-[.5] py-3 '>
    <input type="checkbox" id="Low to High" />
    <label htmlFor="Low to High">Low to High</label>
    </div>
    <div className='flex gap-x-1 border-b-2 border-[#364A1580] border-opacity-[.5] py-3 '>
    <input type="checkbox" id="High to Low" />
    <label htmlFor="High to Low">High to Low</label>
    </div>
    <div className='flex gap-x-1 border-b-2 border-[#364A1580] border-opacity-[.5] py-3 '>
    <input type="checkbox" id="Best Selling" />
    <label htmlFor="Best Selling">Best Selling</label>
    </div>
    <div className='flex gap-x-1 border-b-2 border-[#364A1580] border-opacity-[.5] py-3 '>
    <input type="checkbox" id="Highest Rated" />
    <label htmlFor="Highest Rated">Highest Rated</label>
    </div>
    <div className='flex gap-x-1 border-b-2 border-[#364A1580] border-opacity-[.5] py-3 '>
    <input type="checkbox" id="Newest First" />
    <label htmlFor="Newest First">Newest First</label>
    </div>
    <div className='flex gap-x-1  border-[#364A1580] border-opacity-[.5] py-3 '>
    <input type="checkbox" id="Oldest First" />
    <label htmlFor="Oldest First">Oldest First</label>
    </div>
    
    </form>
   </>
  )
}

export default Sort