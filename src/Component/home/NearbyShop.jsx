import React, { useState, useEffect } from 'react';
import { fetchVendors } from '../../Vendorapi';
import VendorCard from "./VendorCard";

const NearbyShop = () => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const getVendors = async () => {
      try {
        const data = await fetchVendors();
        setVendors(data);
      } catch (error) {
        console.error('Error fetching the vendor data:', error);
      }
    };

    getVendors();
  }, []);
  
  

  return (
    <div className="flex flex-col w-[90%]  my-[5rem] mx-auto ">
      <div>
        <h1 className="font-[Lufga] text-[40px] font-[400] leading-[52.21px]">Nearby Shop’s</h1>
        <p className="font-[Lufga] text-[12px] font-[400] leading-[15.66px]">Empowering local grocery outlets through seamless connections. Revolutionizing your shopping experience, one neighborhood at a time</p>
      </div>
      <div className='h-full py-[4rem] overflow-x-auto scroll-smooth custom-scrollbar'>
        <div className=" flex gap-5 h-full mb-10">
          {vendors.map((vendor, index) => (
            <VendorCard
              key={index}
              vendorName={vendor.VendorName}
              locationName={vendor.Location}
              starCount={vendor.starCount}
              time={vendor.Time}
              href={vendor.href}
              like={vendor.like}
              productImg={vendor.VendorBanner}
            />
          ))}
        </div>
      </div>   
    </div>
  )
}

export default NearbyShop;
