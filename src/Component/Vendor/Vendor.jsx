import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "../Search/Filter";
import VendorCard from "./VendorCard";
import middleapi from "../../utils/middleapi";

const VendorSkeleton = () => (
  <div className="w-[200px] h-[250px] bg-gray-300 rounded-xl animate-pulse"></div>
);

const Vendor = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratingFilter, setRatingFilter] = useState(0);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await middleapi.get(`/vendors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log("Fetched Vendors:", response.data);
        setVendors(response.data || []);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter(
    (vendor) => vendor.rating >= ratingFilter
  );
  
  
  return (
    <div>
      <div className="flex flex-col justify-center items-center text-[#364A15]">
        <div className="font-[600] max-tablet:text-[30px] tablet:text-[40px] laptop:text-[50px] Llaptop:text-[60px]">
          Vendor
        </div>
        <div className="max-tablet:text-[7px] tablet:text-[10px] laptop:text-[15px] Llaptop:text-[20px]">
          Search for shop & market
        </div>
      </div>

      <div className="flex justify-around items-start gap-3 my-10 w-[95%] mx-auto">
        {/* Sidebar for Filters */}
        <div className="w-1/4 bg-[#E9E9E9] bg-opacity-50 w-[18rem] py-3 px-2 rounded-xl h-full mt-5 max-laptop:hidden">
          <Filter setRatingFilter={setRatingFilter} />
        </div>

        {/* Vendor Cards */}
        <main
          className="laptop:w-3/4 grid grid-cols-auto justify-items-center 
          Mmobile:grid-cols-2  
          tablet:grid-cols-3  
          laptop:grid-cols-3  
          Llaptop:grid-cols-4  
          gap-3 tablet:gap-6 laptop:gap-12 p-2"
        >
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <VendorSkeleton key={i} />)
          ) : filteredVendors.length > 0 ? (
            filteredVendors.map((vendor) => (
              <VendorCard
                key={vendor.id}
                vendorId={vendor.id}
                VendorName={vendor.store_name}
                Vendoricon={vendor.profile_picture}
                like={vendor.like || 0}
                starCount={vendor.rating}
                category={  vendor.category.charAt(0).toUpperCase() + vendor.category.slice(1)|| "both"}
                
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

