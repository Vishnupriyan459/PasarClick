import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendors } from "../../Redux/VendorsSlice";
import { Link, Outlet } from "react-router-dom";
import Products from "../home/Products";
import Filter from "../Search/Filter";
import Productcatg from "./Productcatg";
import MobileFilter from "../Search/MobileFilter";

const Shop = () => {
  const dispatch = useDispatch();
  const {
    items: vendors,
    loading,
    error,
  } = useSelector((state) => state.vendors);

  const [priceRange, setPriceRange] = useState([1, 1000]);
  const [ratingFilter, setRatingFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const [pageGroup, setPageGroup] = useState(0); // Controls pagination grouping
  const pagesPerGroup = 4; // Show 4 pages at a time

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const allProducts =
    vendors?.reduce((acc, vendor) => {
      return acc.concat(
        vendor.products.map((product) => ({
          ...product,
          vendorName: vendor.VendorName || "Unknown Vendor",
          href: vendor.href || "#",
        }))
      );
    }, []) || [];
  const categoryCount = allProducts.reduce((acc, product) => {
    const category = product.categories; // Assuming categories is a string like "Fruit", "Vegetables", etc.

    if (category) {
      acc[category] = (acc[category] || 0) + 1;
    }

    return acc;
  }, {});

  // **Apply Filtering**
  const filteredProducts = allProducts.filter((product) => {
    return (
      product.OriginalPrice >= priceRange[0] &&
      product.OriginalPrice <= priceRange[1] &&
      (!ratingFilter || product.starCount >= ratingFilter)
    );
  });

  // **Pagination Logic**
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // **Pagination Group Logic**
  const startPage = pageGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);
  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index
  );

  return (
    <>
      <div className="bg-cart_bg ">
      <div className='flex flex-col justify-center items-center text-[#364A15] mb-4'>
            <div className='font-[600] max-tablet:text-[30px] tablet:text-[40px] laptop:text-[50px] Llaptop:text-[60px]'>Shop</div>
            <div className='max-tablet:text-[7px] tablet:text-[10px] laptop:text-[15px] Llaptop:text-[20px]'>search for your product</div>
        </div>
        <div className="laptop:hidden">
        <MobileFilter
          className="right "
          setPriceRange={setPriceRange}
          setRatingFilter={setRatingFilter}
        /></div>
        <div className="flex  items-center justify-evenly gap-2 w-[90%] mx-auto">
          <Productcatg
            name="Fruit"
            img="/Asset/products/Strawberry.svg"
            noofproduct={categoryCount.Fruit || 0}
          />
          <Productcatg
            name="Vegtables"
            img="/Asset/products/Potato.svg"
            noofproduct={categoryCount.Vegetable || 0}
          />
          <Productcatg
            name="Pusle"
            img="/Asset/products/pusles.svg"
            noofproduct={categoryCount.Pusle || 0}
          />
          <Productcatg
            name="Groceries"
            img="/Asset/products/RiceFlakePoha.svg "
            noofproduct={
              categoryCount.Groceries ||
              categoryCount.Dairy ||
              categoryCount.Spice ||
              0
            }
          />
          <Productcatg
            name="Meat"
            img="/Asset/products/chicken.svg"
            noofproduct={
              categoryCount.Meat ||
              categoryCount[`Non-vegetable`] ||
              categoryCount.poultry ||
              categoryCount.seafood ||
              0
            }
          />
        </div>

        <div className="flex justify-around items-start gap-3 mt-10 w-[95%] mx-auto ">
          
          <div className="bg-[#E9E9E9] bg-opacity-50 w-[18rem] py-3 px-2 rounded-xl h-full mt-5 max-laptop:hidden">
            <Filter
              setPriceRange={setPriceRange}
              setRatingFilter={setRatingFilter}
            />
          </div>
          <div>
            <div
              className="
            grid grid-cols-auto justify-items-center 
            Mmobile:grid-cols-2  
            tablet:grid-cols-3  
            laptop:grid-cols-3  
            Llaptop:grid-cols-4  
            gap-3 tablet:gap-6 laptop:gap-12 p-2"
            >
              {paginatedProducts.map((product, index) => (
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
                  className={"w-[237px] h-[416px] bg-[#ffff]"}
                  currency={product.Currency}
                  place="shop"
                />
              ))}
            </div>
            <div className="flex justify-center mt-6 items-center">
              {/* Previous Group Button */}
              {pageGroup > 0 && (
                <button
                  onClick={() => setPageGroup((prev) => Math.max(prev - 1, 0))}
                  className="mx-2 px-4 py-2 bg-gray-300 rounded-full"
                >
                  ←
                </button>
              )}

              {/* Page Numbers */}
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => {setCurrentPage(page); window.scrollTo({ top: 0 });}
                    
                  }
                  className={`mx-1 px-4 py-2 rounded-full bg-[#DEF9EC] ${
                    currentPage === page ? "border-[1px] border-[#000]" : ""
                  }`}
                  
                >
                  {page}
                </button>
              ))}

              {/* Next Group Button */}
              {endPage < totalPages && (
                <button
                  onClick={() => {setPageGroup((prev) => prev + 1);
                    window.scrollTo({ top: 0 });
                  }}
                  className="mx-2 px-4 py-2 bg-gray-300 rounded-full"
                >
                  →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Pagination Controls */}
      </div>
      <Outlet />
    </>
  );
};

export default Shop;
