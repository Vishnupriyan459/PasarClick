import React, { useState, useEffect } from "react";
import "./FeaturedProducts.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors } from "../../Redux/VendorsSlice";

import axios from "axios";
import { ProductCard } from "./productcard";
import { setLocationData } from "../../Redux/locationSlice";

// Skeleton Card Component
const ProductCardSkeleton = () => (
  <div className="w-full h-[250px] bg-gray-200 animate-pulse rounded-xl"></div>
);

const FeaturedProducts = () => {
  const { country, currency,city } = useSelector((state) => state.location);
  const [visibleCount, setVisibleCount] = useState(4);
  const dispatch = useDispatch();
  const API_URL = process.env.REACT_APP_API_URL;

  const { items: vendors, status, error } = useSelector((state) => state.vendors);
  const [newitems, setNewitems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  console.log(city);
  
  
  useEffect(() => {
    if (!city) return;
    dispatch(fetchVendors());

    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/vendors/landing/?place=${city.toLowerCase()||'chennai'}`);
        setNewitems(response.data.best_sellers || []);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city,dispatch]);
  
  

  // useEffect(() => {
  //   const updateVisibleCount = () => {
  //     if (window.innerWidth >= 1000) {
  //       setVisibleCount(5);
  //     } else if (window.innerWidth >= 640 && window.innerWidth<=800) {
  //       setVisibleCount(3);
  //     } else {
  //       setVisibleCount(4);
  //     }
  //   };

  //   updateVisibleCount();
  //   window.addEventListener('resize', updateVisibleCount);
  //   return () => window.removeEventListener('resize', updateVisibleCount);
  // }, []);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1440) {
        setVisibleCount(5);
      } else if (window.innerWidth >= 1000) {
        setVisibleCount(4);
      } else if (window.innerWidth >= 640 && window.innerWidth <= 800) {
        setVisibleCount(3);
      } else {
        setVisibleCount(2); // Or a default fallback
      }
    };
  
    updateVisibleCount(); // Set on initial load
    window.addEventListener('resize', updateVisibleCount); // Update on resize
  
    return () => window.removeEventListener('resize', updateVisibleCount); // Cleanup
  }, []);
  
  const handleReadMore = () => {
    setVisibleCount(prevCount => prevCount + 4);
  };

  return (
    <div className="w-[90%] my-[5rem] mx-auto flex flex-col justify-evenly gap-5">
      <div className="flex justify-between items-center">
        <div className="flex flex-col w-full">
          <h1 className="font-[400] leading-[52.21px] text-[40px]">Featured Products</h1>
          <p className="font-[400] leading-[15.66px] text-[12px]">
            Tailored grocery suggestions just for you. Revolutionizing your shopping experience with personalized picks.
          </p>
        </div>
      </div>

      <div className="
        grid grid-cols-auto justify-items-center 
        Mmobile:grid-cols-2  
        tablet:grid-cols-3  
        laptop:grid-cols-4  
        Llaptop:grid-cols-5  
        gap-3 tablet:gap-6 laptop:gap-12 p-2">
        
        {loading
          ? Array.from({ length: visibleCount }).map((_, i) => <ProductCardSkeleton key={i} />)
          : newitems.slice(0, visibleCount).map((item, index) => (
              <ProductCard
                key={item.id || index}
                productId={item.id || index}
                productName={item.name}
                description={item.description}
                OriginalPrice={item.price}
                stock={item.stock}
                productImg={item.image}
                rating={item.rating}
                vendorName={item.vendor_name}
                vendorId={item.vendor}
                categories={item.category_details?.name}
                starCount={item.rating}
                Total_items={item.stock}
                Sold_items={item.total_sales}
                has_active_offer={item.has_active_offer}
                OfferPrice={item.OfferPrice}
                place={"featuresproducts"}
              />
            ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
