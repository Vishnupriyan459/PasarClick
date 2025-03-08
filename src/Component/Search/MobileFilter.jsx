import { React, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaFilter, FaTimes } from "react-icons/fa";
import MyRangeSlider from "./MyRangeSlider";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Topsellingproducts from "./topsellingproducts";
import RatingStar from "../home/RatingStar";

const MobileFilter = ({ setPriceRange, setRatingFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { items: vendors } = useSelector((state) => state.vendors);
  const location = useLocation();
  const isVendorPage = location.pathname.includes("/Vendor");

  const allProducts =
    vendors?.reduce((acc, vendor) => {
      return acc.concat(
        vendor.products.map((product) => ({
          ...product,
          vendorName: vendor.VendorName || "Unknown Vendor",
          href: vendor.href || "#",
          like: vendor.like || false,
        }))
      );
    }, []) || [];

  const topselling = [...allProducts].sort(
    (a, b) => b.Sold_items - a.Sold_items
  );

  const topVendors = [...vendors]
    .sort((a, b) => b.starCount - a.starCount)
    .slice(0, 4);

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Filter Toggle Button - Fixed on the screen */}
      <button
        onClick={toggleFilter}
        className="fixed bottom-6 right-6 z-40 bg-[#1AC84B] text-white rounded-full p-4 shadow-lg"
        aria-label="Toggle Filter"
      >
        <FaFilter size={20} />
      </button>

      {/* Overlay when filter is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleFilter}
        ></div>
      )}

      {/* Filter Panel - Slides in from bottom */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-[#F8F9FA] rounded-t-3xl z-50 transition-transform duration-300 transform ${
          isOpen ? "translate-y-0 max-tablet:w-[90%] tablet:w-[40%] tablet:top-10 tablet:rounded-md mx-auto" : "translate-y-full"
        } overflow-auto max-h-[80vh]`}
      >
        <div className="p-4">
          {/* Header with close button */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-[#364A15]">Filters</h2>
            <button
              onClick={toggleFilter}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close Filters"
            >
              <FaTimes size={20} />
            </button>
          </div>

          <div className="space-y-4 text-[#364A15] pb-6">
            <div>
              <p className="font-[600] text-[#364A15] text-[18px]">
                Filter by Price
              </p>
              {setPriceRange && <MyRangeSlider setPriceRange={setPriceRange} />}
            </div>

            <div>
              <p className="font-[500] text-[#364A15] text-[18px] mb-2">
                Average Rating
              </p>
              <div className="flex flex-wrap gap-2">
                {[5, 4, 3].map((rating) => (
                  <p
                    key={rating}
                    className="flex items-center py-2 px-3 bg-white rounded-full cursor-pointer"
                    onClick={() => {
                      setRatingFilter(rating);
                      toggleFilter(); // Close filter after selection on mobile
                    }}
                  >
                    <FaStar className="text-[#1AC84B] mr-1" /> +{rating}.0
                  </p>
                ))}
              </div>
            </div>

            {/* Conditionally Render Vendor or Product Top Section */}
            {isVendorPage ? (
              <>
                <div className="font-[400] text-[18px] mt-4">Top Vendors</div>
                <div className="space-y-2">
                  {topVendors.map((vendor, index) => (
                    <Link
                      to={`/home/Vendor/${vendor.vendorId}`}
                      key={vendor.vendorId || index}
                      className="flex items-center p-2 bg-white rounded-lg gap-3"
                      onClick={toggleFilter} // Close filter after selection
                    >
                      <img
                        src={vendor.Vendoricon}
                        alt=""
                        className="w-12 h-12 object-cover rounded-full"
                      />
                      <div>
                        <div className="font-medium">{vendor.VendorName}</div>
                        <RatingStar starCounts={vendor.starCount} />
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="font-[400] text-[18px] mt-4">
                  Vendor Categories
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Grocery", "Meat", "Dairy", "Organic", "Frozen"].map(
                    (category, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white rounded-full cursor-pointer text-sm"
                        onClick={toggleFilter} // Close filter after selection
                      >
                        {category}
                      </span>
                    )
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="font-[400] text-[18px] mt-4">
                  Top Selling Products
                </div>
                <div className="space-y-2">
                  {topselling.slice(0, 3).map((product, index) => (
                    <div 
                      key={product.productId || index}
                      onClick={toggleFilter} // Close filter after selection
                    >
                      <Topsellingproducts
                        productImg={product.productImg}
                        productName={product.productName}
                        starCount={product.starCount}
                        href={product.href}
                        Total_items={product.Total_items}
                        Sold_items={product.Sold_items}
                        OriginalPrice={product.OriginalPrice}
                        currency={product.Currency}
                        productId={product.productId}
                      />
                    </div>
                  ))}
                </div>

                <div className="font-[400] text-[18px] mt-4">Product Tags</div>
                <div className="flex flex-wrap gap-2">
                  {["Tomato", "Potato", "Chicken", "Meat"].map(
                    (product, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white rounded-full cursor-pointer text-sm"
                        onClick={toggleFilter} // Close filter after selection
                      >
                        {product}
                      </span>
                    )
                  )}
                </div>
              </>
            )}

            {/* Apply Filters Button */}
            <button
              onClick={toggleFilter}
              className="w-full py-3 bg-[#1AC84B] text-white rounded-lg mt-4 font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFilter;