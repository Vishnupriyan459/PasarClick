import React, { useState, useEffect } from "react";
import RankBasedProduct from './RankBasedProduct';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors } from "../../Redux/VendorsSlice";

const RankCategories = () => {
  const categories = ["Top Selling", "Trending Products", "Recently Added", "Top Rated"];
  const [visibleCount, setVisibleCount] = useState(5);
  const [sortedProductsByCategory, setSortedProductsByCategory] = useState({});
  const dispatch = useDispatch();

  const { items: vendors, status, error } = useSelector((state) => state.vendors);

  // Fetch vendors on mount
  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  // Combine all products when vendors data changes
  useEffect(() => {
    if (vendors?.length > 0) {
      const allProducts = vendors.flatMap(vendor => vendor.products || []);
      // Precompute sorted products by category
      const sortedByCategory = {};
      categories.forEach(category => {
        sortedByCategory[category] = sortProducts(allProducts, category);
      });
      setSortedProductsByCategory(sortedByCategory);
    }
  }, [vendors]);

  // Handle responsive visible count
  useEffect(() => {
    const updateVisibleCount = () => {
      setVisibleCount(window.innerWidth >= 640 ? 5 : 3); // Tablet/Desktop vs Mobile
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const sortProducts = (products, category) => {
    switch (category) {
      case "Top Selling":
        return [...products].sort((a, b) => b.Sold_items - a.Sold_items);
      case "Trending Products":
      case "Top Rated": // Same logic for now
        return [...products].sort((a, b) => b.starCount - a.starCount);
      case "Recently Added":
        return [...products].sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
      default:
        return products;
    }
  };

  const handleReadMore = () => {
    setVisibleCount(prevCount => prevCount + 5);
  };

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-[90%] mx-auto flex flex-col justify-center mb-2">
      <div className="grid justify-between grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 Llaptop:grid-cols-4">
        {categories.map((category, index) => {
          const sortedProducts = sortedProductsByCategory[category] || [];
          return (
            <div key={index} className="p-2">
              <div className="w-[295px] m-3">
                <p className="text-[25px] font-[300] leading-[32.63px] text-[#364A15]">{category}</p>
                <div className="w-full bg-[#DEF9EC] h-[4px]">
                  <div className="w-1/2 h-full bg-[#02992C] rounded-full"></div>
                </div>
              </div>
              {sortedProducts.slice(0, visibleCount).map((product, index) => (
                <RankBasedProduct
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
          );
        })}
      </div>
      {/* {visibleCount < Math.max(...categories.map(cat => (sortedProductsByCategory[cat]?.length || 0))) && (
        <button 
          className="mx-auto mt-4 p-2 bg-[#1AC84B] text-white rounded"
          onClick={handleReadMore}
        >
          Load More
        </button>
      )} */}
    </div>
  );
};

export default RankCategories;
