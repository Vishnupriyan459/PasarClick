import React, { useState } from "react";
import { useSelector } from "react-redux";
import Filter from '../Search/Filter';
import VendorCard from "./VendorCard";

const Vendor = () => {
  const { items: vendors } = useSelector((state) => state.vendors);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const filteredVendors = vendors.filter((vendor) =>
    vendor.starCount >= ratingFilter
  );

  return (
    <div className="  ">
      <div className='flex flex-col justify-center items-center text-[#364A15]'>
            <div className='font-[600] max-tablet:text-[30px] tablet:text-[40px] laptop:text-[50px] Llaptop:text-[60px]'>Vendor</div>
            <div className='max-tablet:text-[7px] tablet:text-[10px] laptop:text-[15px] Llaptop:text-[20px]'>Search for shop & market</div>
        </div>
      <div className="flex justify-around items-start gap-3 my-10 w-[95%] mx-auto">
      {/* Sidebar for Filters */}
      <div className="w-1/4 bg-[#E9E9E9] bg-opacity-50  w-[18rem] py-3 px-2 rounded-xl h-full mt-5 max-laptop:hidden">
        <Filter  setRatingFilter={setRatingFilter} />
      </div>

      {/* Main Vendor Listing */}
      <main className="laptop:w-3/4 grid grid-cols-auto justify-items-center 
  Mmobile:grid-cols-2  
  tablet:grid-cols-3  
  laptop:grid-cols-3  
  Llaptop:grid-cols-4  
  gap-3 tablet:gap-6 laptop:gap-12 p-2">
        {filteredVendors.length > 0 ? (
          filteredVendors.map((vendor) => (
            <VendorCard
              key={vendor.vendorId}
              vendorId={vendor.vendorId}
              VendorName={vendor.VendorName}
              Vendoricon={vendor.Vendoricon}
              like={vendor.like}
              starCount={vendor.starCount}
              category={vendor.category}
            />
          ))
        ) : (
          <p className="text-center col-span-full">No vendors found</p>
        )}
      </main>
    </div>
    </div>
  );
};

export default Vendor;
