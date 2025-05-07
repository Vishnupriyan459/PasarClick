import React, { useState, useEffect } from "react";
import axios from "axios";
import RankBasedProduct from "./RankBasedProduct";
import { useSelector } from "react-redux";

const ProductCardSkeleton = () => (
  <div className="w-full h-[250px] bg-gray-200 animate-pulse rounded-xl m-3"></div>
);

const RankCategories = () => {
  const categories = {
    "Top Selling": "best_sellers",
    "Trending Products": "top_rated",
    "Recently Added": "recently_added",
    "Top Rated": "top_rated",
  };

  const API_URL = process.env.REACT_APP_API_URL;

  const [sortedProductsByCategory, setSortedProductsByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { city } = useSelector((state) => state.location);

  useEffect(() => {
    if (!city) return;
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/vendors/landing/?place=${city.toLowerCase()||'chennai'}`);
        const data = res.data;

        const sorted = {};
        Object.keys(categories).forEach((label) => {
          const key = categories[label];
          const products = data[key] || [];
          sorted[label] = sortProducts(products, label);
        });

        setSortedProductsByCategory(sorted);
      } catch (err) {
        setError("Failed to fetch product rankings.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city]);

  const sortProducts = (products, category) => {
    switch (category) {
      case "Top Selling":
        return [...products].sort((a, b) => b.total_sales - a.total_sales);
      case "Trending Products":
      case "Top Rated":
        return [...products].sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "Recently Added":
        return [...products].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      default:
        return products;
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;

  const productCounts = Object.values(sortedProductsByCategory)
    .filter((products) => products.length > 0)
    .map((products) => products.length);
  const minCount = productCounts.length > 0 ? Math.min(...productCounts) : 0;

  return (
    <div className="w-[90%] mx-auto flex flex-col justify-center mb-2">
      <div className="grid justify-between grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 Llaptop:grid-cols-4">
        {Object.keys(categories).map((category, index) => {
          const products = sortedProductsByCategory[category] || [];

          return (
            <div key={index} className="p-2">
              {/* Always show category title and bar */}
              <div className="w-[295px] m-3">
                <p className="text-[25px] font-[300] leading-[32.63px] text-[#364A15]">
                  {category}
                </p>
                <div className="w-full bg-[#DEF9EC] h-[4px]">
                  <div className="w-1/2 h-full bg-[#02992C] rounded-full"></div>
                </div>
              </div>

              {/* Conditional rendering of products or skeletons */}
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))
              ) : products.length > 0 ? (
                products.slice(0, minCount).map((product, i) => (
                  <RankBasedProduct
                    key={product.id || i}
                    productImg={product.image}
                    productName={product.name}
                    starCount={product.rating || 0}
                    href={`/product/${product.id}`}
                    Total_items={product.stock}
                    Sold_items={product.total_sales}
                    OriginalPrice={product.price}
                    currency="₹"
                    productId={product.id}
                    vendorId={product.vendor}
                  />
                ))
              ) : (
                <div className="text-gray-400 text-sm px-3 pt-2">No products available</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RankCategories;
