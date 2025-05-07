import React, { useState, useEffect } from "react";
import axios from "axios";
import VendorCard from "./VendorCard";

const NearbyShop = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDisplay, setIsDisplay] = useState(true);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const getVendors = async () => {
      try {
        const token = localStorage.getItem("access");
        if (token) {
          const response = await axios.get(`${API_URL}/vendors`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setVendors(response?.data);
        } else {
          setIsDisplay(false);
        }
      } catch (error) {
        console.error("Error fetching vendor data:", error);
        setIsDisplay(false);
      } finally {
        setLoading(false);
      }
    };

    getVendors();
  }, [API_URL]);

  if (!isDisplay) return null;

  return (
    <div className="flex flex-col w-[90%] my-[5rem] mx-auto">
      <div>
        <h1 className="font-[Lufga] text-[40px] font-[400] leading-[52.21px]">
          Nearby Shop’s
        </h1>
        <p className="font-[Lufga] text-[12px] font-[400] leading-[15.66px]">
          Empowering local grocery outlets through seamless connections.
          Revolutionizing your shopping experience, one neighborhood at a time
        </p>
      </div>

      <div className="h-full py-[4rem] overflow-x-auto scroll-smooth custom-scrollbar">
        <div className="flex gap-5 h-full mb-10">
          {loading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[250px] h-[300px] bg-gray-200 rounded-xl shadow-lg animate-pulse"
                >
                  <div className="h-2/3 bg-gray-300 rounded-t-xl" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            : vendors.map((vendor) => (
                <VendorCard
                  key={vendor.id}
                  vendorName={vendor.store_name}
                  locationName={vendor.place}
                  starCount={parseFloat(vendor.rating) || 0}
                  time="10 min"
                  href={`/home/vendor/${vendor.id}`}
                  like={vendor.like || false}
                  productImg={vendor.profile_picture}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default NearbyShop;
