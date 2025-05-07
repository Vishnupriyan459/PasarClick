import { React, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import MyRangeSlider from "./MyRangeSlider";
import Topsellingproducts from "./topsellingproducts";
import RatingStar from "../home/RatingStar";

const Filter = ({ setPriceRange, setRatingFilter, sortFunction }) => {
  const [loading, setLoading] = useState(true);
  const [loadingVendors, setLoadingVendors] = useState(true);
  const [error, setError] = useState(null);
  const { items: vendors } = useSelector((state) => state.vendors);
  const [newitems, setNewitems] = useState([]);
  const [topVendorList, setTopVendorList] = useState([]);

  const location = useLocation();
  const isVendorPage = location.pathname.includes("/Vendor");
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/vendors/landing/?place=chennai`);
        setNewitems(response.data.best_sellers || []);
      } catch (error) {
        console.error("Error fetching best selling data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (isVendorPage) {
      const fetchVendors = async () => {
        try {
          setLoadingVendors(true);
          const token = localStorage.getItem("access");
          const response = await axios.get(`${API_URL}/vendors`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const vendorsData = response.data || [];

          const top = [...vendorsData]
            .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
            .slice(0, 4)
            .map((vendor) => ({
              vendorId: vendor.id,
              VendorName: vendor.store_name,
              Vendoricon: vendor.profile_picture,
              starCount: parseFloat(vendor.rating),
              category: vendor.category,
              like: false,
            }));

          setTopVendorList(top);
        } catch (err) {
          console.error("Failed to fetch vendor list:", err);
        } finally {
          setLoadingVendors(false);
        }
      };

      fetchVendors();
    }
  }, [isVendorPage]);

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

  if (loading) return null; // remove "Loading..." text

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="space-y-2 text-[#364A15] block">
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
            <FaStar className="text-[#1AC84B] mr-1" /> +{rating}.0
          </p>
        ))}
      </div>

      {isVendorPage ? (
        <>
          <div className="font-[400] text-[20px]">Top Vendors</div>
          <div>
            {loadingVendors ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-center px-4 py-3 mb-2 bg-white rounded-lg shadow animate-pulse"
                >
                  <div className="w-[5rem] h-[5rem] bg-gray-300 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              topVendorList.map((vendor) => (
                <Link
                  to={`/home/Vendor/${vendor.vendorId}`}
                  key={vendor.vendorId}
                  className="flex justify-start items-center px-4 py-3 gap-3 hover:bg-gray-100 rounded-lg"
                >
                  <img
                    src={vendor.Vendoricon}
                    alt={vendor.VendorName}
                    className="w-[5rem] h-[5rem] rounded-full object-cover shadow"
                  />
                  <div>
                    <div className="text-[16px] font-medium">
                      {vendor.VendorName}
                    </div>
                    <RatingStar starCounts={vendor.starCount} />
                  </div>
                </Link>
              ))
            )}
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
            {newitems.slice(0, 4).map((product, index) => (
              <Topsellingproducts
                key={product.productId || index}
                productImg={product.image}
                productName={product.name}
                starCount={product.rating || 0}
                offer_price={product.offer_price}
                Total_items={product.stock}
                Sold_items={product.total_sales}
                OriginalPrice={product.price}
                currency={product.Currency}
                productId={product.id}
                vendorId={product.vendor}
              />
            ))}
          </div>

          <div className="font-[400] text-[20px] mt-4">Product Tags</div>
          <div className="flex flex-wrap gap-3">
            {["Tomato", "Potato", "Chicken", "Meat"].map((product, index) => (
              <Link
                to={`/Home/search?query=${encodeURIComponent(product)}`}
                key={index}
              >
                <span className="px-3 py-1 bg-white rounded-full cursor-pointer">
                  {product}
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Filter;
