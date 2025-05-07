
import React from 'react';
import { Link } from 'react-router-dom';
import RatingStar from '../home/RatingStar';

const VendorProductCard = ({ product,vendorId,rating }) => {
  const {
    id,
    name,
    description,
    price,
    offer_price,
    has_active_offer,
    stock,
    image,
    
  } = product;

  const displayPrice = has_active_offer && offer_price ? offer_price : price;

  return (
    <div className=" w-[260px] flex flex-col justify-between bg-white rounded-xl shadow-md p-4 border border-gray-200 h-full ">
      <div className="w-full h-[180px] overflow-hidden rounded-lg mb-4">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-lg font-semibold text-[#364A15]">{name}</h2>
      <RatingStar starCounts={4} />
      <p className="text-sm text-gray-600 mb-2">{description}</p>


      <div className="flex items-center gap-2">
        <span className="text-green-600 font-bold text-lg">${displayPrice}</span>
        {has_active_offer && (
          <span className="text-gray-400 line-through text-sm">${price}</span>
        )}
      </div>

      <p className="text-sm mt-1 text-gray-500">
        {stock > 0 ? `${stock} in stock` : "Out of stock"}
      </p>
      <Link
        to={`/home/Shop/${vendorId}/${id}`}
        className="mt-4 inline-block text-center bg-[#1AC84B] hover:bg-[#15963A] text-white py-2 px-4 rounded-md transition"
      >
        View
      </Link>
     
      
    </div>
  );
};

export default VendorProductCard;
