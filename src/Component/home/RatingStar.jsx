import React from 'react';
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

const RatingStar = ({ starCounts }) => {
  // Function to render star icons based on starCounts (filled and outline stars)
  const renderStars = () => {
    const filledStarCount = Math.min(starCounts, 5);
    const stars = [];
    
    // Render filled stars
    for (let i = 0; i < filledStarCount; i++) {
      stars.push(<FaStar key={`filled-${i}`} className="w-[14px] h-[14px]" style={{ color: '#1AC84B' }} />);
    }
    
    // Render outline stars
    for (let i = filledStarCount; i < 5; i++) {
      stars.push(<CiStar key={`outline-${i}`} className="w-[14px] h-[14px]" />);
    }
    
    return stars;
  };

  return (
    <div className='flex gap-[4px] content-center mt-1'>
      {renderStars()}
    </div>
  );
};

export default RatingStar;
