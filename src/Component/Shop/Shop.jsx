import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors } from '../../Redux/VendorsSlice';
import { Link, Outlet } from 'react-router-dom';
import Products from '../home/Products';
import Filter from '../Search/Filter';
import Productcatg from './Productcatg';

const Shop = () => {
  const dispatch = useDispatch();
  const { items: vendors, loading, error } = useSelector((state) => state.vendors);

  const [priceRange, setPriceRange] = useState([1, 1000]); // Price range state
  const [ratingFilter, setRatingFilter] = useState(null);  // Rating filter state

  useEffect(() => {
    dispatch(fetchVendors());  // Fetch vendors
  }, [dispatch]);

  const allProducts = vendors?.reduce((acc, vendor) => {
    return acc.concat(vendor.products.map(product => ({
      ...product,
      vendorName: vendor.VendorName || 'Unknown Vendor',
      href: vendor.href || '#',
    })));

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

  return (
    <>
      <div className='bg-cart_bg '>
        <div className='flex  items-center justify-evenly gap-2 w-[90%] mx-auto'>
          <Productcatg name="Fruit" img="/Asset/products/Strawberry.svg" noofproduct={categoryCount.Fruit||0}/>
          <Productcatg name="Vegtables" img="/Asset/products/Potato.svg"noofproduct={categoryCount.Vegetable||0}/>
          <Productcatg name="Pusle" img="/Asset/products/pusles.svg" noofproduct={categoryCount.Pusle||0}/>
          <Productcatg name="Groceries" img="/Asset/products/RiceFlakePoha.svg " noofproduct={categoryCount.Groceries||0}/>
          <Productcatg name="Meat" img="/Asset/products/chicken.svg" noofproduct={categoryCount.Meat||categoryCount[`Non-vegetable`]||categoryCount.poultry||categoryCount.seafood||0}/>
        </div>
        <div className='flex justify-around gap-2 mt-10 w-[95%] mx-auto '>
          <div className='bg-[#E9E9E9] w-[15rem] py-3 px-2 rounded-xl h-full mt-10 max-laptop:hidden'>
            <Filter 
              setPriceRange={setPriceRange} 
              setRatingFilter={setRatingFilter} 
            />
          </div>
          <div className="grid  justify-around items-center grid-cols-2 tablet:grid-cols-3 laptop:grid-cols-4 gap-12 p-2 my-2 shrink-0">
            {filteredProducts.map((product, index) => (
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
              />
            ))}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Shop;
