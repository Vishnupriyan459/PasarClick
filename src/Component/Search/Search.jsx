import { React, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendors } from "../../Redux/VendorsSlice"; // Correct the import path
import MainCatagories from "./MainCatagories";
import SubCatagories from "./SubCatagories";
import { FaFilter } from "react-icons/fa";
import Products from "../home/Products";
// import {fetchVendors} from '../../Vendorapi';
import VendorCard from "../home/VendorCard";

import Mobfilter from "./MobileFilter";

const Search = () => {
  const [Mobfilterbtn, setMobfilterbtn] = useState(false);
  const [priceRange, setPriceRange] = useState([1, 1000]);
    const [ratingFilter, setRatingFilter] = useState(null);
  // const [vendors, setVendors] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");
  const [selectedSort, setSelectedSort] = useState("");
  const [sortFunction, setSortFunction] = useState(null);
  

  // useEffect(() => {
  //   const getVendors = async () => {
  //     try {
  //       const data = await fetchVendors();
  //       setVendors(data);
  //     } catch (error) {
  //       console.error('Error fetching the vendor data:', error);
  //     }
  //   };

  //   getVendors();
  // }, []);

  const filterbutton = () => {
    setMobfilterbtn(!Mobfilterbtn);
  };

  const dispatch = useDispatch();
  const {
    items: vendors,
    loading,
    error,
  } = useSelector((state) => state.vendors);


  // Fetch products from Redux store on component mount
  useEffect(() => {
    dispatch(fetchVendors()); // Dispatch the action to fetch products
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
  const filteredAndSortedProducts = allProducts;
  const filteredProducts = allProducts.filter((product) => {
    return (
      product.OriginalPrice >= priceRange[0] &&
      product.OriginalPrice <= priceRange[1] &&
      (!ratingFilter || product.starCount >= ratingFilter)
    );
  });
  console.log(filteredProducts);
  
  const sortedProducts = [...filteredProducts].sort(sortFunction || ((a, b) => 0));
console.log(sortedProducts);

  const filteredVendors = vendors.filter((vendor) =>
    vendor.starCount >= ratingFilter
  );

  // Handle loading and error
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading products: {error}</p>;

  return (
    <>
      <div className="bg-Search_bg  w-[100vw] ">
        <div className=" w-[95%] mx-auto">
          <div className="">
            <div className="flex flex-col tablet:gap-5 tablet:flex-row">
              <div className="font-[400] text-[20px] Mmobile:text-[24px] Mmobile:text-[26px] tablet:text-[36px] text-[#364A15] leading-[46.99px]">
                Search results for <span className="italic"> "</span>{" "}
                {searchQuery} <span className="italic">"</span>
              </div>
              <div className="self-start tablet:self-end text-[8px] tablet:text-[14px] leading-[18.27px]">
                {/* Showing 1-{Math.min(vendors.products.length, 7)} of {vendors.products.length} resultss */}
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-5 max-tablet:hidden">
              {/* <div>
                <MainCatagories />
              </div> */}
              <div>
                <SubCatagories setPriceRange={setPriceRange}
              setRatingFilter={setRatingFilter}  selectedSort={selectedSort} setSelectedSort={setSelectedSort} setSortFunction={setSortFunction} />
              </div>
            </div>

            <div className="flex justify-end relative tablet:hidden">
              
              {/* <div
                className={`absolute left-0 w-[90vw] h-[60vh] bg-[#ffff] border-2 rounded-[1rem] shadow-2 ${
                  Mobfilterbtn ? "" : "hidden"
                } py-3 px-2 z-20`}
              >
                <Mobfilter />
              </div> */}
              
                <Mobfilter setPriceRange={setPriceRange}
              setRatingFilter={setRatingFilter} />
              
            </div>
          </div>
          <div className="h-full py-[4rem] overflow-x-auto scroll-smooth custom-scrollbar">
            <div className=" flex gap-5 h-full mb-10">
              {vendors.map((vendor, index) => (
                <VendorCard
                  key={index}
                  vendorName={vendor.VendorName}
                  locationName={vendor.Location}
                  starCount={vendor.starCount}
                  time={vendor.Time}
                  href={vendor.href}
                  like={vendor.like}
                  productImg={vendor.VendorBanner}
                  category={vendor.category}
                />
              ))}
            </div>
          </div>
          <div className="grid justify-items-center grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4 Llaptop:grid-cols-5 gap-12 p-2 bg-[#ffffff] bg-opacity-60 backdrop-blur-sm my-2 mx-1">
            {sortedProducts.map((product, index) => (
              <Products
                key={product.productId || index}
                productId={product.productId}
                productImg={product.productImg}
                categories={product.categories}
                productName={product.productName}
                vendorName={product.vendorName}
                starCount={product.starCount}
                currency={product.Currency}
                off={product.off}
                href={product.href}
                like={product.like}
                Total_items={product.Total_items}
                Sold_items={product.Sold_items}
                OriginalPrice={product.OriginalPrice}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
