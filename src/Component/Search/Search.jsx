import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SubCatagories from "./SubCatagories";
import Mobfilter from "./MobileFilter";
import Products from "../home/Products";
import { ProductCard } from "../home/productcard";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const Search = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceRange, setPriceRange] = useState([1, 1000]);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [selectedSort, setSelectedSort] = useState("");
  const [sortFunction, setSortFunction] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  // Fetch data from API on search query change
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/customers/search-product?q=${encodeURIComponent(searchQuery)}`);
        setProducts(response.data || []);
        
        
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load search results.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) fetchSearchResults();
  }, [searchQuery]);

  // Filtering
  const filteredProducts = products.filter((product) => {
    const price = parseFloat(product.price);
    const rating = parseFloat(product.rating) || 0;
    return (
      price >= priceRange[0] &&
      price <= priceRange[1] &&
      (!ratingFilter || rating >= ratingFilter)
    );
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort(sortFunction || (() => 0));

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="bg-Search_bg w-full min-h-screen">
      <div className="w-[95%] mx-auto py-6">
        <div className="flex flex-col tablet:gap-5 tablet:flex-row mb-4">
          <h2 className="font-[400] text-[20px] tablet:text-[36px] text-[#364A15] leading-[46.99px]">
            Search results for <span className="italic">"</span> {searchQuery} <span className="italic">"</span>
          </h2>
        </div>

        {/* Desktop Filters */}
        <div className="mt-5 flex flex-col gap-5 max-tablet:hidden">
          <SubCatagories
            setPriceRange={setPriceRange}
            setRatingFilter={setRatingFilter}
            selectedSort={selectedSort}
            setSelectedSort={setSelectedSort}
            setSortFunction={setSortFunction}
          />
        </div>

        {/* Mobile Filters */}
        <div className="flex justify-end relative tablet:hidden">
          <Mobfilter
            setPriceRange={setPriceRange}
            setRatingFilter={setRatingFilter}
          />
        </div>

        {/* Products Grid */}
        <div className="grid justify-items-center grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4 Llaptop:grid-cols-5 gap-12 p-2 bg-white bg-opacity-60 backdrop-blur-sm my-8 mx-1">
          {sortedProducts.length === 0 ? (
            <p className="col-span-full text-gray-500">No products found.</p>
          ) : (
            sortedProducts.map((product, index) => (
              <ProductCard
                key={product.id || index}
                productId={product.id}
                productImg={product.image}
                productName={product.name}
                vendorName={product.vendor_name}
                rating={product.rating||0}
                categories={product.category_details?.name}
                currency="₹"
                off={product.product_discount}
               vendorId={product.vendor}
                like={false}
                Total_items={product.stock}
                Sold_items={product.total_sales}
                OriginalPrice={parseFloat(product.price)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
