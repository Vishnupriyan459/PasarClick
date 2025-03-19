import React, { useState, useEffect } from "react";
import "./FeaturedProducts.css";
import { useDispatch, useSelector } from "react-redux";
import Categories from "./Catagories";
import Products from "./Products";
import { fetchVendors } from "../../Redux/VendorsSlice";

const FeaturedProducts = () => {
  const [category, setCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(4);
  const dispatch = useDispatch();

  // Get vendors state from Redux store
  const { items: vendors, status, error } = useSelector((state) => state.vendors);

  // Fetch JSON manually and dispatch action
  const fetchData = async () => {
    try {
      const response = await fetch("/vendor.json"); // Ensure the file is in the 'public' folder
      if (!response.ok) {
        throw new Error("Failed to fetch vendors");
      }
      const data = await response.json();
      dispatch(fetchVendors.fulfilled(data.vendors)); // Manually dispatch fetched data
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handle responsive number of visible products
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1124) {
        setVisibleCount(10);
      } else if (window.innerWidth >= 640) {
        setVisibleCount(8);
      } else {
        setVisibleCount(4);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Function to map categories for filtering
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

  // Filter products based on selected category
  const filteredProducts =
    category === "All"
      ? allProducts
      : allProducts.filter(
          (product) => mapCategories(product.categories) === mapCategories(category)
        );

  const handleReadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  if (!vendors || vendors.length === 0) return <p>No products available</p>;

  return (
    <div className="w-[90%] my-[5rem] mx-auto flex flex-col justify-between gap-5">
      <div className="flex justify-between items-center">
        <div className="flex flex-col w-full">
          <h1 className="font-[400] leading-[52.21px] text-[40px]">Featured Products</h1>
          <p className="font-[400] leading-[15.66px] text-[12px]">
            Tailored grocery suggestions just for you. Revolutionizing your shopping experience with personalized picks.
          </p>
        </div>
        <Categories setCategory={setCategory} />
      </div>

      <div className="
  grid grid-cols-auto justify-items-center 
  Mmobile:grid-cols-2  
  tablet:grid-cols-3  
  laptop:grid-cols-4  
  Llaptop:grid-cols-5  
  gap-3 tablet:gap-6 laptop:gap-12 p-2">
        {filteredProducts.slice(0, visibleCount).map((product, index) => (
          <Products
            key={product.productId || index}
            productId={product.productId}
            productImg={product.productImg}
            categories={product.categories}
            productName={product.productName}
            vendorName={product.vendorName}
            starCount={product.starCount}
            off={product.off}
            href={product.href}
            like={product.like}
            Total_items={product.Total_items}
            Sold_items={product.Sold_items}
            OriginalPrice={product.OriginalPrice}
            currency={product.Currency}
            place="featuresproducts"
            className="min-w-0"
          />
        ))}
      </div>

      {/* Read More Button */}
      {visibleCount < filteredProducts.length && (
        <button 
          className="mx-auto mt-4 p-2 bg-[#1AC84B] text-white rounded"
          onClick={handleReadMore}
        >
          Read More
        </button>
      )}
    </div>
  );
};

export default FeaturedProducts;
