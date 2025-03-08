import { React, useEffect, useState } from "react";
import RatingStar from "../home/RatingStar";
import ProductPrice from "../ProductPrice";
import { Link } from "react-router-dom";

const Topsellingproducts = ({
  productImg,
  currency,
  productName,
  productId,
  starCount,
  off,

  OriginalPrice,
  href,
  
 
  Total_items,
  Sold_items,
}) => {
  const [percentages, setpercentages] = useState();
  const [price, setprice] = useState();
  useEffect(() => {
    setpercentages(`${(Sold_items / Total_items) * 100}%`);
    setprice(OriginalPrice - OriginalPrice * (off / 100));
  }, []);
  return (
    <Link to={`/home/Shop/${productId}`}>
    <div className='w-[px] h-[120px] p-[1px] rounded-xl flex justify-around items-center border-[1px] border-[#364A152E] m-4 '>
      
      <div className='w-[90px] h-[90px]  '>
        <img
            src={productImg}
            className="w-full h-full object-contain mx-auto"
            alt="product"
          />
      </div>
      <div className="flex flex-col h-full justify-evenly">
        
            <h1 className="text-[14px] font-[600] leading-[18.27px] text-[#364A15]">
              {productName}
            </h1>
            
            <RatingStar starCounts={starCount} />

            <div className="flex gap-1 items-center">
            <div className="text-[16px] font-[500] leading-[20.88px] text-[#1AC84B]">
              <ProductPrice price={price} currency={currency}/>
            </div>
            <div className="text-[10px] font-[400] leading-[13.05px] text-[#20202033] line-through">
            <ProductPrice price={OriginalPrice} currency={currency}/>
            </div>
          </div>
      </div>
    </div>
    </Link>

  )
}
Topsellingproducts.defaultProps = {
  categories: "Vegetable",
  // productImg:"/Asset/products/Tomato.svg",
  productName: "Tomato",
  vendorName: "Veg & Health",
  starCount: 4,
  off: 10,
  OriginalPrice: 152.99,
  href: "#",
  like: false,
  place: "",
 
  Total_items: "50",
  Sold_items: "20",
};


export default Topsellingproducts;