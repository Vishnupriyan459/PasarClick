import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { fetchVendors } from "../Redux/VendorsSlice";
import Products from "./home/Products";

const OffCount = () => {
  const dispatch = useDispatch();
  const scrollContainerRef = useRef(null);
  const { items: vendors, loading, error } = useSelector((state) => state.vendors);

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading vendors: {error}</div>;

  // Flatten all products from all vendors and sort by `off` percentage
  const sortedProducts = vendors
    .flatMap(vendor => vendor.products)
    .sort((a, b) => b.off - a.off);

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

  return (
    <div className="w-[90%] my-[5rem] mx-auto flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="font-[400] text-[40px] leading-[52.21px] text-[#364A15]">You can count on</div>
        <div className="flex gap-5 items-center">
          <button onClick={scrollLeft} className="bg-lightgreen w-[41px] h-[41px] rounded-full">
            <FaArrowLeftLong className="mx-auto" />
          </button>
          <button onClick={scrollRight} className="bg-lightgreen w-[41px] h-[41px] rounded-full">
            <FaArrowRightLong className="mx-auto" />
          </button>
        </div>
      </div>
      <div className="text-[18px] text-[#364A15]">
        Discover the best discounts and save on your favorite items!
      </div>
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-3 flex-shrink-0 h-full w-full px-5 py-[2rem] overflow-x-auto scroll-smooth custom-scrollbar"
      >
        {sortedProducts.map((product) => (
          <div className="flex-shrink-0" key={product.productId}>
            <Products
              productId={product.productId}
              productImg={product.productImg}
              categories={product.categories}
              productName={product.productName}
              vendorName={vendors.find(vendor => vendor.products.some(p => p.productId === product.productId))?.VendorName}
              starCount={product.starCount}
              off={product.off}
              OriginalPrice={product.OriginalPrice}
              like={product.like}
              place="offcount"
              Total_items={product.Total_items}
              Sold_items={product.Sold_items}
              currency={product.Currency}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffCount;
