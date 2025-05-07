import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/CartSlice';
import axios from 'axios';
import RatingStar from '../home/RatingStar';
import ProductPrice from '../ProductPrice';
import { BsPlusLg } from "react-icons/bs";
import middleapi from '../../utils/middleapi';


const FrequentlyBoughtTogether = () => {
  const { productId } = useParams();
  const [vendors, setVendors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await middleapi.get('/Data/frequentlyBoughtTogether.json');
        const data = response.data.vendors;
        
        setVendors(data);
      } catch (error) {
        console.error("Error fetching frequently bought together products:", error);
      }
    };

    fetchRelatedProducts();
  }, [productId]);

  const allProducts = vendors?.reduce((acc, vendor) => {
    return acc.concat(
      vendor.products.map((product) => ({
        ...product,
        vendorName: vendor.VendorName || 'Unknown Vendor',
        href: vendor.href || '#',
        like: vendor.like || false,
      }))
    );
  }, []).slice(0, 4) || [];
  
  


  const handleAddToCart = (product) => {
    dispatch(addToCart({
      productId: product.productId,
      productName: product.productName,
      price: product.OriginalPrice,
      productImg: product.productImg,
      quantity: 1
    }));
  };
  const Addtoallcart = () => {
    allProducts.forEach(product => 
      dispatch(addToCart({
        productId: product.productId,
        productName: product.productName,
        price: product.OriginalPrice,
        productImg: product.productImg,
        quantity: 1
      }))
    );
  };
  

  return (
    <div className='flex bg-[#fff] border-2 border-[#D4D4D480] w-[100%] laptop:w-[90%] mx-auto rounded-2xl justify-evenly hidden tablet:flex'>
    <div className="frequently-bought-together   py-3 px-2">
      <h2 className='font-[400] text-[24px] leading-[34px]'>Frequently Bought Together</h2>
      <div className='flex'>
        <div className=' flex  border-r-2 border-[#D4D4D480]'>
          {allProducts.map((item, index) => (
            <div key={index} className='flex items-center'>
              <div className='tablet:w-[100px] Llaptop:w-[164px] Llaptop:h-[239px] rounded-2xl bg-[#ffff] space-y-3 py-3 px-3 flex flex-col justify-around'>
                <img src={`${item.productImg}`} alt={`${item.productName}`} className='Llaptop:w-[9rem] Llaptop:h-[8rem]'/>
                <div>
                  <div className='text-[10px] laptop:text-[12px]'>{item.productName}</div>
                  <RatingStar starCounts={item.starCount}/>
                  <div className='flex justify-between'>
                    <div className='line-through opacity-[50%] text-[0.6rem] laptop:text-[0.8rem]'>
                      <ProductPrice price={item.OriginalPrice} currency={item.Currency} />
                    </div>
                    <div className='text-[0.7rem] laptop:text-[1rem]'>
                      <ProductPrice price={item.OriginalPrice - item.OriginalPrice * (item.off / 100)} currency={item.Currency}/>
                    </div>
                  </div>
                </div>
              </div>
              {index < allProducts.length - 1 && (
                // <div className="mx-2 text-[3rem] font-semibold">+</div>
                <BsPlusLg className="mx-1 text-[1rem] font-semibold opacity-50"/>

              )}
            </div>
          ))}
        </div>
        
      </div>
    </div>
    <div className='w-[23rem] flex justify-center items-center max-laptop:text-[12px] '>
    <div className='w-[94%]  space-y-3 Llaptop:space-y-4'>
      <h1 className='text-center'>This product</h1>
      <div className=' px-2 space-y-2 Llatop:space-y-3'>
        {allProducts.map((item,index)=>(
          <div key={index} className='flex justify-between items-center '>
            <div className='' >{item.productName}</div>
            <div className='flex gap-3'>
              <div className='line-through opacity-[50%]'>
                <ProductPrice price={item.OriginalPrice} currency={item.Currency} />
              </div>
              <div>
              <ProductPrice price={item.OriginalPrice - item.OriginalPrice * (item.off / 100)} currency={item.Currency}/>
              </div>
            </div>
          </div>
        )

        )}
          
      </div>
      <div className='flex justify-center items-center  tablet:w-[130px] tablet:h-[48px] Llaptop:w-[200px] Llaptop:h-[58px] rounded-full mx-auto my-5 bg-[#F2EBD9]' onClick={Addtoallcart}>
        <p>Add to cart</p>
      </div>

    </div>
  </div>
  </div>
  );
};

export default FrequentlyBoughtTogether;
