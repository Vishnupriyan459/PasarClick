import { React, useEffect, useState } from "react";
import { FaStar, FaFilter, FaTimes } from "react-icons/fa";
import MyRangeSlider from "./MyRangeSlider";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Topsellingproducts from "./topsellingproducts";
import RatingStar from "../home/RatingStar";
import axios from "axios";

const MobileFilter = ({ setPriceRange, setRatingFilter }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newitems, setNewitems] = useState([]);
  const [topVendors, setTopVendors] = useState([]);

  const { items: vendors } = useSelector((state) => state.vendors);
  const location = useLocation();
  const isVendorPage = location.pathname.includes("/Vendor");
  const API_URL = process.env.REACT_APP_API_URL;

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchTopVendors = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("access");
        const response = await axios.get(`${API_URL}/vendors/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const vendorsData = response.data;

        const sortedVendors = vendorsData
          .filter((vendor) => vendor.is_verified)
          .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
          .slice(0, 4);

        setTopVendors(sortedVendors);
      } catch (error) {
        console.error("Error fetching vendor data", error);
        setError("Failed to load vendors");
      } finally {
        setLoading(false);
      }
    };

    const fetchBestSellers = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/vendors/landing/?place=chennai`
        );
        setNewitems(response.data.best_sellers || []);
      } catch (error) {
        console.error("Error fetching best sellers", error);
      }
    };

    if (isVendorPage) {
      fetchTopVendors();
    } else {
      fetchBestSellers();
    }
  }, [API_URL, isVendorPage]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <>
      <button
        onClick={toggleFilter}
        className="fixed bottom-6 right-6 z-40 bg-[#1AC84B] text-white rounded-full p-4 shadow-lg"
        aria-label="Toggle Filter"
      >
        <FaFilter size={20} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleFilter}
        ></div>
      )}

      <div
        className={`fixed bottom-0 left-0 right-0 bg-[#F8F9FA] rounded-t-3xl z-50 transition-transform duration-300 transform ${
          isOpen
            ? "translate-y-0 max-tablet:w-[90%] tablet:w-[40%] tablet:top-10 tablet:rounded-md mx-auto"
            : "translate-y-full"
        } overflow-auto max-h-[80vh]`}
      >
        <div className="p-4">
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
              <p className="font-[600] text-[18px]">Filter by Price</p>
              {setPriceRange && <MyRangeSlider setPriceRange={setPriceRange} />}
            </div>

            <div>
              <p className="font-[500] text-[18px] mb-2">Average Rating</p>
              <div className="flex flex-wrap gap-2">
                {[5, 4, 3].map((rating) => (
                  <p
                    key={rating}
                    className="flex items-center py-2 px-3 bg-white rounded-full cursor-pointer"
                    onClick={() => {
                      setRatingFilter(rating);
                      toggleFilter();
                    }}
                  >
                    <FaStar className="text-[#1AC84B] mr-1" /> +{rating}.0
                  </p>
                ))}
              </div>
            </div>

            {isVendorPage ? (
              <>
                <div className="font-[400] text-[18px] mt-4">Top Vendors</div>
                <div className="space-y-2">
                  {topVendors.map((vendor, index) => (
                    <Link
                      to={`/home/Vendor/${vendor.id}`}
                      key={vendor.id || index}
                      className="flex items-center p-2 bg-white rounded-lg gap-3"
                      onClick={toggleFilter}
                    >
                      <img
                        src={vendor.profile_picture}
                        alt="Vendor"
                        className="w-12 h-12 object-cover rounded-full"
                      />
                      <div>
                        <div className="font-medium">{vendor.store_name}</div>
                        <RatingStar starCounts={parseFloat(vendor.rating)} />
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
                        onClick={toggleFilter}
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
                  {newitems.slice(0, 3).map((product, index) => (
                    <div
                      key={product.id || index}
                      onClick={toggleFilter}
                    >
                      <Topsellingproducts
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
                    </div>
                  ))}
                </div>

                <div className="font-[400] text-[18px] mt-4">Product Tags</div>
                <div className="flex flex-wrap gap-2">
                  {["Tomato", "Potato", "Chicken", "Meat"].map(
                    (product, index) => (
                      <Link
                        to={`/Home/search?query=${encodeURIComponent(product)}`}
                        key={index}
                      >
                        <span
                          className="px-3 py-1 bg-white rounded-full cursor-pointer text-sm"
                          onClick={toggleFilter}
                        >
                          {product}
                        </span>
                      </Link>
                    )
                  )}
                </div>
              </>
            )}

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
