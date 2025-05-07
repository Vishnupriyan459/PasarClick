import React, { useEffect, useState } from "react";
import { BiSolidBadge } from "react-icons/bi";
import { Link } from "react-router-dom";
import axios from "axios";
import middleapi from "../../utils/middleapi";


const HotDealsGrid = () => {
  const [deals, setDeals] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await middleapi.get(`/vendors/hotdeals/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setDeals(response.data);
      } catch (error) {
        console.error("Error fetching hot deals:", error);
      }
    };

    fetchDeals();
  }, []);

  const handleVendorClick = (id) => {
    console.log(`Clicked on vendor with ID: ${id}`);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center text-[#364A15]">
        <div className="font-[600] max-tablet:text-[30px] tablet:text-[40px] laptop:text-[50px] Llaptop:text-[60px]">
          Hot Deals
        </div>
        <div className="max-tablet:text-[7px] tablet:text-[10px] laptop:text-[15px] Llaptop:text-[20px]">
          See what deals are going
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3 my-10 w-[90%] tablet:w-[80%] mx-auto">
        {deals.map((vendor, index) => {
          const isFirst = index === 0;
          const isLast = index === deals.length - 1;
          const isEvenCount = deals.length % 2 === 0;

          let colSpan;

          if (isFirst) {
            colSpan = "col-span-4";
          } else if (isLast && isEvenCount) {
            colSpan = "col-span-4"; // Make last item full if even count
          } else {
            colSpan = "col-span-2"; // Normal span
          }

          const imageUrl = `${API_URL}${vendor.profile_picture || "/default.jpg"}`;
          const name = vendor.store_name || "Unnamed Vendor";
          const discount = vendor.shop_discount || 0;

          return (
            <Link
              to={`/home/vendor/${vendor.id}`}
              key={vendor.id}
              className={`${colSpan} h-[200px] laptop:h-[500px] rounded-xl bg-grey-600 relative`}
              onClick={() => handleVendorClick(vendor.id)}
            >
              {/* Discount Badge */}
              <div className="absolute -top-5 -right-5 flex items-center justify-center max-tablet:w-[3rem] max-tablet:h-[3rem] tablet:w-[5rem]  tablet:h-[5rem] laptop:w-[7rem] laptop:h-[7rem]">
                <BiSolidBadge className="text-[7rem] text-gradient-to-r from-zinc-600 via-zinc/60 to-white-600 opacity-70" />
                <span className="absolute text-white text-[0.5rem] tablet:text-[1rem] laptop:text-[2rem] font-bold">
                  {parseInt(discount)}%
                </span>
              </div>

              {/* Image */}
              <img src={imageUrl} alt={name} className="w-full h-full object-cover rounded-xl" />

              {/* Overlay */}
              <div className="absolute bottom-0 w-full tablet:h-[3rem] laptop:h-[4rem] max-tablet:text-[0.5rem] tablet:text-[.7rem] laptop:text-[1rem] bg-white bg-opacity-50 flex items-center justify-start p-3">
                <span className="text-black font-bold">{name} / {parseInt(discount)}% off</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default HotDealsGrid;
