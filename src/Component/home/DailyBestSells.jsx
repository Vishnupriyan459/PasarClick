import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import DailyBestSellBanner from './DailyBestSellBanner';
import { fetchVendors } from "../../Redux/VendorsSlice";
import axios from 'axios';
import "./DailyBestSells.css";
import { ProductCard } from "./productcard";

// ✅ Skeleton loader like FeaturedProducts
const ProductCardSkeleton = () => (
  <div className="w-[270px] tablet:w-[227px] h-[450px] tablet:h-[450px] laptop:h-[466px] bg-gray-200 animate-pulse rounded-xl"></div>
);

const DailyBestSells = () => {
  const [dailyBestProducts, setDailyBestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  const dispatch = useDispatch();
  const { city } = useSelector((state) => state.location);
  const API_URL = process.env.REACT_APP_API_URL;
  const { status, error } = useSelector((state) => state.vendors || { status: 'idle', error: null });

  useEffect(() => {
    if (!city) return;
    dispatch(fetchVendors());

    const fetchDailyBestProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/vendors/landing/?place=${city.toLowerCase()||'chennai'}`);
        setDailyBestProducts(response.data.best_sellers || []);
      } catch (err) {
        console.error("Error fetching daily best products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDailyBestProducts();
  }, [city,dispatch]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 0, left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ top: 0, left: 200, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-[90%] Llaptop:my-[5rem] mx-auto flex flex-col justify-between gap-5">
      <div>
        <div className='flex justify-between items-center'>
          <h1 className='font-[400] leading-[52.21px] text-[40px]'>Daily Best Sells</h1>
          <div className='flex gap-5 items-center text-[15px] font-[200] text-[#02992C] hidden tablet:flex'>
            <button onClick={scrollLeft} className='bg-lightgreen w-[41px] h-[41px] rounded-full'>
              <FaArrowLeftLong className='mx-auto' />
            </button>
            <button onClick={scrollRight} className='bg-lightgreen w-[41px] h-[41px] rounded-full'>
              <FaArrowRightLong className='mx-auto' />
            </button>
          </div>
        </div>

        <p className='text-[10px]'>
          Tailored grocery suggestions just for you. Revolutionizing your shopping experience with personalized picks.
        </p>

        <div
          ref={scrollContainerRef}
          className='flex items-center gap-3 flex-shrink-0 h-full w-full px-5 Llaptop:py-[2rem] overflow-x-auto scroll-smooth custom-scrollbar'
        >
          <div className="flex-shrink-0">
            <DailyBestSellBanner />
          </div>

          {loading ? (
            // ⏳ Skeleton placeholders while loading
            Array.from({ length: 5 }).map((_, index) => (
              <div className="flex-shrink-0" key={index}>
                <ProductCardSkeleton />
              </div>
            ))
          ) : status === 'failed' ? (
            <p>Error loading vendors: {error}</p>
          ) : dailyBestProducts.length > 0 ? (
            dailyBestProducts.map((item, index) => (
              <div className="flex-shrink-0" key={item.id || index}>
                <ProductCard
                  key={item.id || index}
                  productId={item.id || index}
                  productName={item.name}
                  description={item.description}
                  OriginalPrice={item.price}
                  stock={item.stock}
                  productImg={ item.image}
                  rating={item.rating}
                  vendorName={item.vendor_name}
                  categories={item.category_details?.name}
                  starCount={item.rating}
                  Total_items={item.stock}
                  Sold_items={item.total_sales}
                  has_active_offer={item.has_active_offer}
                  OfferPrice={item.OfferPrice}
                  place={"dailybestsell"}
                  vendorId={item.vendor}
                />
              </div>
            ))
          ) : (
            <p>No daily best products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyBestSells;
