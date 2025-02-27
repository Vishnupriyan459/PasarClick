import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors } from '../../Redux/VendorsSlice';
import Products from '../home/Products';
import Filter from '../Search/Filter';
import { all } from 'country-codes-list';
import VendorCard from './VendorCard';

const Vendor = () => {
  const dispatch = useDispatch();
  const { items: vendors, loading, error } = useSelector((state) => state.vendors);
  useEffect(() => {
    dispatch(fetchVendors());  // Dispatch the action to fetch products
  }, [dispatch]);
  // const allProducts = vendors?.reduce((acc, vendor) => {
  //   return acc.concat(vendor.products.map(product => ({
  //     ...product,
  //     vendorName: vendor.VendorName || 'Unknown Vendor',
  //     href: vendor.href || '#',
  //     like: vendor.like || false
  //   })));
  // }, []) || [];
  // allProducts=vendors;
  
  
  return (
    <>
    <div className='flex  items-center justify-around bg-cart_bg w-[90%] mx-auto'>
      <div className='w-[200px] h-[220px] bg-white  border-2  rounded-xl text-center flex flex-col justify-center items-center'>
        
        <img src="/Asset/products/Strawberry.svg" alt="" className='w-[15vw] h-[15vh]'/>
        <div>Fruit</div>
      </div>
      <div className='w-[200px] h-[220px] bg-white  border-2  rounded-xl text-center flex flex-col justify-center items-center'>
        
        <img src="/Asset/products/Potato.svg" alt="" className='w-[15vw] h-[15vh]'/>
        <div>Vegtables</div>
      </div>
      <div className='w-[200px] h-[220px] bg-white  border-2  rounded-xl text-center flex flex-col justify-center items-center'>
        
        <img src="/Asset/products/pusles.svg" alt="" className='w-[15vw] h-[15vh]'/>
        <div>Pusle</div>
      </div>
      <div className='w-[200px] h-[220px] bg-white  border-2  rounded-xl text-center flex flex-col justify-center items-center'>
        
        <img src="/Asset/products/RiceFlakePoha.svg" alt="" className='w-[15vw] h-[15vh]'/>
        <div>Groceries</div>
      </div>
      <div className='w-[200px] h-[220px] bg-white  border-2  rounded-xl text-center flex flex-col justify-center items-center'>
        
        <img src="/Asset/products/chicken.svg" alt="" className='w-[15vw] h-[15vh]'/>
        <div>Meat</div>
      </div>
      
    </div>
    <div className='flex gap-1 mt-5 w-[95%] mx-auto'>
      <div className='bg-[#E9E9E9] py-3 px-2 rounded-xl h-full'>
      <Filter />
      </div>
    
    <div className="grid w-full justify-items-center grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4  gap-12 p-2 bg-[#ffffff] bg-opacity-60 backdrop-blur-sm my-2 mx-1">
            {/* {allProducts.map((product, index) => (
             
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
                className={"w-[237px] h-[416px]"}
              />
            ))} */}
            {
              vendors.map((vendors,index)=>(
                <VendorCard key={vendors.vendorId || index} 
                        vendorId={vendors.vendorId}
                        VendorName={vendors.VendorName}
                        Vendoricon={vendors.Vendoricon}
                        like={vendors.like}
                        starCount={vendors.starCount}
                        category={vendors.category}
                         />

              ))
            }
    </div>
    </div>


    </>
  )
}

export default Vendor;