import { React, useEffect, useState } from "react";
import RatingStar from "./RatingStar";
import LikeComponent from "./LikeComponent";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/CartSlice";
import { Link } from "react-router-dom";
import ProductPrice from "../ProductPrice";
const Products = ({
  
  productId,
  productImg,
  categories,
  productName,
  vendorName,
  starCount,
  off,
  OriginalPrice,
  href,
  like,
  place,
  Total_items,
  Sold_items,
  currency
}) => {
  const [percentages, setpercentages] = useState();
  const [price, setprice] = useState();
  const dispatch = useDispatch();
  let word = "";

  useEffect(() => {
    if (Total_items > 0) {
      const remainingItems = Total_items - Sold_items;
      const calculatedPercentage = (remainingItems / Total_items) * 100;
      setpercentages(`${calculatedPercentage}`);
      Sold_items += 1;
    }
  }, [Sold_items, Total_items]);

  useEffect(() => {
    setprice(OriginalPrice - OriginalPrice * (off / 100));
  }, [OriginalPrice, off]);

  const handleAddToCart = () => {
    if (Total_items - Sold_items > 0) {
      dispatch(
        addToCart({
          productId,
          productName,
          OriginalPrice,
          productImg,
          quantity: 1,
          price,
          vendorName,
          currency
        })
      );
      
      

      alert("Added to cart");
    }
  };

  if (Total_items - Sold_items === 0) {
    word = place === "dailybestsell" ? "OutOfBox" : "Closed";
  } else {
    word = place === "dailybestsell" ? "Add Cart" : "Add";
  }

  const isClosed = Total_items - Sold_items === 0;

  return (
    <div
      className={` max-Lmobile: maxlaptop:w-[220px] Llaptop:w-[237px]  rounded-xl bg-[ #D4D4D430] p-2 border-solid border-2 border-[#D4D4D480] ${
        place === "dailybestsell" ? "h-[400px]  Llaptop:h-[416px]" : " h-[380px] Llaptop:h-[416px]  "
      }`}
    >
      <div className="relative w-[130px] h-[130px] tablet:w-[190px] tablet:h-[184px] Llaptop:w-[217px]  Llaptop:h-[208px] ">
        <Link to={`/home/Shop/${productId}`}>

          <img
            src={productImg}
            className="w-full h-full object-cover mx-auto"
            alt="product"
          />
        </Link>
        {off !== 0 && (
          <div className="absolute top-2 -right-1 bg-[#FF943B] rounded-sm w-[82px] h-[30px] text-[#ffffff] flex justify-center items-center">
            {off}% OFF
          </div>
        )}
      </div>
      <div className={`flex flex-col ${place === "dailybestsell" ?"gap-3":"gap-5"}  mb-4`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] font-[400] leading-[13.05px] text-[#8F8F8F]">
              {categories}
            </p>
            <Link to={`/home/Shop/${productId}`}>
            <h1 className="text-[14px] font-[600] leading-[18.27px] text-[#364A15]">
              {productName}
            </h1>
            </Link>
          </div>
          <div>
            <LikeComponent like={like} />
          </div>
        </div>
        <RatingStar starCounts={starCount} />
        <p className="text-[14px] font-[400] leading-[18.27px] text-[#8F8F8F]">
          By{" "}
          <Link to={`/home/Vendor/${vendorName}`}>
            <span className="text-[#000000] font-[600] underline underline-offset-4">
              {vendorName}
            </span>
          </Link>
        </p>
        <div
          className={`flex ${
            place === "dailybestsell"
              ? "flex-col justify-center"
              : "justify-between items-center"
          }`}
        >
          <div className="flex gap-1 items-center">
            <div className="text-[16px] font-[500] leading-[20.88px] text-[#1AC84B]">
              
              <ProductPrice price={price} currency={currency}/>
            </div>
            <div className="text-[10px] font-[400] leading-[13.05px] text-[#20202033] line-through">
              
              <ProductPrice price={OriginalPrice} currency={currency}/>
            </div>
          </div>
          {place === "dailybestsell" && (
            <div className="flex flex-col ">
              <div className="w-full bg-[#DEF9EC] h-[4px]">
                <div
                  className={`h-full rounded-full ${
                    Total_items - Sold_items <= 10
                      ? "bg-[#dc2626]"
                      : "bg-[#02992C]"
                  }`}
                  style={{ width: `${percentages}%` }}
                ></div>
              </div>
              <div>
                <span className="text-[#02992C]">Sold: </span>
                {Sold_items}/{Total_items}
              </div>
            </div>
          )}
          <div
            className={`w-[76px] h-[38px] flex justify-center items-center rounded-xl ${
              isClosed
                ? " text-[#000] text-opacity-50 border-2  cursor-not-allowed"
                : "bg-[#DEF9EC] cursor-pointer hover:bg-[#1AC84B] hover:text-[#fff]"
            } ${place === "dailybestsell" ? "w-full" : "w-[76px]"}`}
            onClick={!isClosed ? handleAddToCart : null}
          >
            {word}
          </div>
        </div>
      </div>
    </div>
  );
};

// Default props
Products.defaultProps = {
  categories: "Vegetable",
  productName: "Tomato",
  vendorName: "Veg & Health",
  starCount: 4,
  off: 10,
  OriginalPrice: 152.99,
  href: "#",
  like: false,
  place: "",
  Total_items: 50,
  Sold_items: 50,
};

export default Products;
