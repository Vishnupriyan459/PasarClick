import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/CartSlice';
import RatingStar from '../home/RatingStar';
import ProductPrice from '../ProductPrice';
import { BsPlusLg } from "react-icons/bs";

const RelevantProducts = ({ related_products }) => {
  const dispatch = useDispatch();

  const allProducts = related_products?.slice(0, 4).map(product => ({
    productId: product.id,
    productName: product.name,
    price: parseFloat(product.price),
    off: parseFloat(product.product_discount || 0),
    Currency: '₹',
    productImg: product.image,
    starCount: parseFloat(product.rating) || 0,
    vendorName: product.vendor_name || 'Unknown Vendor',
  })) || [];

  const handleAddToCart = (product) => {
    dispatch(addToCart({
      productId: product.productId,
      productName: product.productName,
      price: product.price,
      productImg: product.productImg,
      quantity: 1
    }));
  };

  const addAllToCart = () => {
    allProducts.forEach(product => 
      dispatch(addToCart({
        productId: product.productId,
        productName: product.productName,
        price: product.price,
        productImg: product.productImg,
        quantity: 1
      }))
    );
  };

  return (
    <div className='flex bg-[#fff] border-2 border-[#D4D4D480] w-[100%] laptop:w-[90%] mx-auto rounded-2xl justify-evenly hidden tablet:flex'>
      <div className="relevant-products py-3 px-2">
        <h2 className='font-[400] text-[24px] leading-[34px]'>Relevant Products</h2>
        <div className='flex'>
          <div className='flex border-r-2 border-[#D4D4D480]'>
            {allProducts.map((item, index) => (
              <div key={index} className='flex items-center'>
                <div className='tablet:w-[100px] Llaptop:w-[164px] Llaptop:h-[239px] rounded-2xl bg-[#ffff] space-y-3 py-3 px-3 flex flex-col justify-around'>
                  <img src={`${item.productImg}`} alt={`${item.productName}`} className='Llaptop:w-[9rem] Llaptop:h-[8rem]'/>
                  <div>
                    <div className='text-[10px] laptop:text-[12px]'>{item.productName}</div>
                    <RatingStar starCounts={item.starCount}/>
                    <div className='flex justify-between'>
                      <div className='line-through opacity-[50%] text-[0.6rem] laptop:text-[0.8rem]'>
                        <ProductPrice price={item.price} currency={item.Currency} />
                      </div>
                      <div className='text-[0.7rem] laptop:text-[0.8rem]'>
                        <ProductPrice price={item.price - item.price * (item.off / 100)} currency={item.Currency}/>
                      </div>
                    </div>
                  </div>
                </div>
                {index < allProducts.length - 1 && (
                  <BsPlusLg className="mx-1 text-[1rem] font-semibold opacity-50"/>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='w-[23rem] flex justify-center items-center max-laptop:text-[12px] '>
        <div className='w-[94%] space-y-3 Llaptop:space-y-4'>
          <h1 className='text-center'>This product</h1>
          <div className='px-2 space-y-2 Llatop:space-y-3'>
            {allProducts.map((item, index) => (
              <div key={index} className='flex justify-between items-center '>
                <div>{item.productName}</div>
                <div className='flex gap-3'>
                  <div className='line-through opacity-[50%]'>
                    <ProductPrice price={item.price} currency={item.Currency} />
                  </div>
                  <div>
                    <ProductPrice price={item.price - item.price * (item.off / 100)} currency={item.Currency}/>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='flex justify-center items-center tablet:w-[130px] tablet:h-[48px] Llaptop:w-[200px] Llaptop:h-[58px] rounded-full mx-auto my-5 bg-[#F2EBD9]' onClick={addAllToCart}>
            <p>Add to cart</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelevantProducts;
