import React, { useState } from 'react';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import './range.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors } from "../../Redux/VendorsSlice";
import ProductPriceChart from './ProductPriceChart';


const MyRangeSlider = ({ setPriceRange }) => {
  const [rangeValue, setRangeValue] = useState([25, 1000]); // Default range values
  
  const handleRangeChange = (value) => {
    setRangeValue(value); // Update internal state
    setPriceRange(value); // Send update to Shop.js
  };

  return (
    <div className='bg-[#FFFFFF] rounded-md py-2 px-1 drop-shadow-lg'>
      <ProductPriceChart />
      <RangeSlider
        id={"range-slider"}
        min={1}
        max={1000}
        value={rangeValue}
        onInput={handleRangeChange} // Update price range
      />
      <div className='flex justify-between'>
        <div>
          <div>Min</div>
          <input
            type="number"
            min={1}
            max={rangeValue[1]}
            value={rangeValue[0]}
            onChange={(e) => handleRangeChange([Math.min(Number(e.target.value), rangeValue[1]), rangeValue[1]])}
            className="rounded-full border-2 border-black border-opacity-[.5] text-center"
          />
        </div>
        <div>
          <div>Max</div>
          <input
            type="number"
            min={rangeValue[0]}
            max={1000}
            value={rangeValue[1]}
            onChange={(e) => handleRangeChange([rangeValue[0], Math.max(Number(e.target.value), rangeValue[0])])}
            className="rounded-full border-2 border-black border-opacity-[.5] text-center"
          />
        </div>
      </div>
    </div>
  );
};

export default MyRangeSlider;
