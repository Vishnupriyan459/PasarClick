import { useRef, React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import Catagories from './Catagories';
import Products from "./Products";
import DailyBestSellBanner from './DailyBestSellBanner';
import { fetchVendors } from "../../Redux/VendorsSlice";
import "./DailyBestSells.css";

const DailyBestSells = () => {
  const [category, setCategory] = useState("All");
  const scrollContainerRef = useRef(null);
  const dispatch = useDispatch();

  // Access vendors state from Redux store
  const { items: vendors, status, error } = useSelector((state) => state.vendors || { items: [], status: 'idle', error: null });

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: -200,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        top: 0,
        left: 200,
        behavior: 'smooth',
      });
    }
  };

  const mapCategories = (category) => {
    switch (category) {
      case "Fresh Fruits":
        return "Fruit";
      case "Milks & Dairies":
        return "Dairy";
      case "Meat":
        return "Non-vegetable";
      case "Vegetables":
        return "Vegetable";
      default:
        return category;
    }
  };

  // Combine all products from all vendors into a single array
  const allProducts = vendors?.reduce((acc, vendor) => {
    return acc.concat(vendor.products.map(product => ({
      ...product,
      vendorName: vendor.VendorName || 'Unknown Vendor',
      vendorhref: vendor.href || '#',
      like: vendor.like || false
    })));
  }, []) || [];

  // Filter products based on selected category
  const filteredProducts = category === "All"
    ? allProducts
    : allProducts.filter(product => mapCategories(product.categories) === mapCategories(category));

  return (
    <div className="w-[90%] Llaptop:my-[5rem] mx-auto flex flex-col justify-between gap-5">
      <div>
        <div className='flex justify-between items-center'>
          <div className='flex  gap-5 font-[400] leading-[52.21px] text-[40px]'>
            <div>Daily Best Sells</div>
            <div className='flex gap-5 items-center text-[15px] font-[200] text-[#02992C] hidden tablet:flex'>
              <button onClick={scrollLeft} className='bg-lightgreen w-[41px] h-[41px] rounded-full'>
                <FaArrowLeftLong className='mx-auto' />
              </button>
              <button onClick={scrollRight} className='bg-lightgreen w-[41px] h-[41px] rounded-full'>
                <FaArrowRightLong className='mx-auto' />
              </button>
            </div>
          </div>
          <div>
            <Catagories setCategory={setCategory}/>
          </div>
        </div>
        <div className='text-[10px]'>
          Tailored grocery suggestions just for you. Revolutionizing your shopping experience with personalized picks.
        </div>
        <div ref={scrollContainerRef} className='flex items-center gap-3 flex-shrink-0 h-full w-full px-5 Llaptop:py-[2rem] overflow-x-auto scroll-smooth custom-scrollbar'>
          <div className="flex-shrink-0">
            <DailyBestSellBanner />
          </div>

          {status === 'loading' ? (
            <p>Loading...</p>
          ) : status === 'failed' ? (
            <p>Error loading products: {error}</p>
          ) : filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div className="flex-shrink-0" key={product.productId || index}>
                <Products
                  productId={product.productId}
                  productImg={product.productImg}
                  categories={product.categories}
                  productName={product.productName}
                  vendorName={product.vendorName}
                  vendorhref={product.vendorhref}
                  starCount={product.starCount}
                  place="dailybestsell"
                  off={product.off}
                  href={product.href}
                  like={product.like}
                  Total_items={product.Total_items}
                  Sold_items={product.Sold_items}
                  OriginalPrice={product.OriginalPrice}
                  currency={product.Currency}
                />
              </div>
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyBestSells;