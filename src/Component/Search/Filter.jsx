import { React, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import MyRangeSlider from "./MyRangeSlider";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Topsellingproducts from "./topsellingproducts";
import VendorCard from "../Vendor/VendorCard";
import RatingStar from "../home/RatingStar";


const Filter = ({ setPriceRange, setRatingFilter,sortFunction }) => {
  const { items: vendors } = useSelector((state) => state.vendors);
  const location = useLocation();
  const isVendorPage = location.pathname.includes("/Vendor"); // Detecting if used in Vendor page

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

  return (
    <div className="space-y-2 text-[#364A15]">
      <p className="font-[600] text-[#364A15] text-[20px]">Filter by Price</p>
      {setPriceRange && <MyRangeSlider setPriceRange={setPriceRange} />}

      <p className="font-[500] text-[#364A15] text-[20px] my-2">
        Average Rating
      </p>
      <div className="mt-2 space-y-3">
        {[5, 4, 3].map((rating) => (
          <p
            key={rating}
            className="flex items-center py-2 px-3 bg-white rounded-full cursor-pointer"
            onClick={() => setRatingFilter(rating)}
          >
            <FaStar className="text-[#1AC84B]" /> +{rating}.0
          </p>
        ))}
      </div>

      {/* Conditionally Render Vendor or Product Top Section */}
      {isVendorPage ? (
        <>
          <div className="font-[400] text-[20px]">Top Vendors</div>
          <div>
            {topVendors.map((vendor, index) => (
              // <VendorCard
              //   key={vendor.vendorId || index}
              //   vendorId={vendor.vendorId}
              //   VendorName={vendor.VendorName}
              //   Vendoricon={vendor.Vendoricon}
              //   like={vendor.like}
              //   starCount={vendor.starCount}
              //   category={vendor.category}
              // />
              <Link to={`/home/Vendor/${vendor.vendorId }`}
                key={vendor.vendorId || index}
                class="flex justify-around items-center px-4 py-3 gap-2"
              >
                
                <div class="row-span-3 "><img src={vendor.Vendoricon} alt="" className="w-[5rem] h-[5rem] bg-cover" /></div>
                <div>
                <div class="col-span-2 ">{vendor.VendorName}l</div>
                <div class="col-span-2  "><RatingStar starCounts={vendor.starCount} /></div>
                </div>
              </Link>
            ))}
          </div>

          <div className="font-[400] text-[20px] mt-4">Vendor Categories</div>
          <div className="flex flex-wrap gap-3">
            {["Grocery", "Meat", "Dairy", "Organic", "Frozen"].map(
              (category, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white rounded-full cursor-pointer"
                >
                  {category}
                </span>
              )
            )}
          </div>
        </>
      ) : (
        <>
          <div className="font-[400] text-[20px]">Top Selling Products</div>
          <div>
            {topselling.slice(0, 4).map((product, index) => (
              <Topsellingproducts
                key={product.productId || index}
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
            ))}
          </div>

          <div className="font-[400] text-[20px] mt-4">Product Tags</div>
          <div className="flex flex-wrap gap-3">
            {["Tomato", "Potato", "Chicken", "Meat"].map((product, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-white rounded-full cursor-pointer"
              >
                {product}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Filter;
