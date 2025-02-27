import React from 'react';
import { FaStar } from "react-icons/fa";
import MyRangeSlider from './MyRangeSlider';

const Filter = ({ setPriceRange, setRatingFilter }) => {
  return (
    <>
      <p className='font-[500] text-[#364A15] text-[20px]'>Filter by price</p>
      <MyRangeSlider setPriceRange={setPriceRange} />

      <p className='font-[500] text-[#364A15] text-[20px] my-2'>Average Rating</p>
      <div className='mt-2 space-y-3'>
        {[5, 4, 3].map((rating) => (
          <p 
            key={rating} 
            className='flex items-center py-2 px-3 bg-white rounded-full cursor-pointer'
            onClick={() => setRatingFilter(rating)}
          >
            <FaStar className='text-[#1AC84B]' />+{rating}.0
          </p>
        ))}
      </div>
    </>
  );
};

export default Filter;
