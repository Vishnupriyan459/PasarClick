import { React, useEffect, useState } from "react";
import RatingStar from "./RatingStar";
import LikeComponent from "./LikeComponent";
import { useDispatch } from "react-redux";
import { addToCart } from "../../Redux/CartSlice";
import { Link } from "react-router-dom";
import ProductPrice from "../ProductPrice";

export const ProductCard = ({
  productId,
  productImg,
  categories,
  productName,
  vendorName,
  OriginalPrice,
  OfferPrice,
  has_active_offer,
  href,
  like,
  place,
  Total_items,
  Sold_items,
  currency,
  vendorId
}) => {
  const [percentages, setpercentages] = useState(0);
  const [off, setOff] = useState(0);
  const dispatch = useDispatch();
  let word = "";
  const API_URL = process.env.REACT_APP_API_URL;

  // console.log(has_active_offer,OfferPrice,OriginalPrice,"vendor product id :",productId ,"in a vendor",vendorName );
  
  useEffect(() => {
    if (Total_items > 0) {
      const remainingItems = Total_items - Sold_items;
      const calculatedPercentage = (remainingItems / Total_items) * 100;
      setpercentages(`${calculatedPercentage}`);
    }
  }, [Sold_items, Total_items]);

  function calculatePercentageDifference(offerPrice, originalPrice) {
    if (originalPrice === 0) return 0;
    const difference = originalPrice - offerPrice;
    return Math.round((difference / originalPrice) * 100);
  }
  
  
  useEffect(() => {
    
    if (has_active_offer && OfferPrice < OriginalPrice) {
        
      setOff(calculatePercentageDifference(OfferPrice, OriginalPrice));
    } else {
      setOff(0);
    }
    
    
    }, [OriginalPrice, OfferPrice, has_active_offer]);
  
  const handleAddToCart = () => {
    if (Total_items - Sold_items > 0) {
      dispatch(
        addToCart({
          productId,
          productName,
          OriginalPrice,
          OfferPrice,
          productImg,
          quantity: 1,
          price: has_active_offer ? OfferPrice : OriginalPrice,
          VendorName:vendorName,
          currency,
          vendorId
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

  const getcontainerclass = (place) => {
    switch (place) {
      case "featuresproducts":
      case "shop":
        return "w-[250px] max-smobile:h-[380px] Mmobile:w-[160px] tablet:w-[227px] tablet:h-[380px] laptop:h-[400px] flex flex-col justify-evenly";
      case "dailybestsell":
        return "w-[270px] tablet:w-[227px] h-[450px] tablet:h-[450px] laptop:h-[466px] flex flex-col justify-evenly";
      case "offcount":
        return "w-[220px] h-[350px] tablet:w-[227px] tablet:h-[380px] laptop:h-[466px] flex flex-col justify-evenly";
      default:
        return "";
    }
  };

  return (
    <div
      className={`${getcontainerclass(
        place
      )} rounded-xl bg-[#D4D4D430] p-2 border-solid border-2 border-[#D4D4D480] shrink-0`}
    >
      <div className="relative w-[150px] h-[150px] tablet:w-[150px] tablet:h-[150px] laptop:w-[200px] laptop:h-[200px] mx-auto">
        <Link to={`/home/Shop/${vendorId}/${productId}`} className="block w-full h-full" href={href}>
        
          <img
            src={productImg}
            className="w-full h-full object-cover"
            alt="product"
          />
        </Link>
        {has_active_offer && off > 0 && (
          <div className="absolute top-2 -right-1 bg-[#FF943B] rounded-sm w-[70px] h-[22px] Lmobile:w-[82px] Lmobile:h-[30px] text-[#ffffff] flex justify-center items-center">
            {off}% OFF
          </div>
        )}
      </div>

      <div className={`space-y-2 tablet:space-y-3`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-[400] text-[#8F8F8F] max-Mmobile:text-[5px] text-[10px] leading-[13.05px]">
              {categories}
            </p>
            <Link to={`/home/Shop/${vendorId}/${productId}`}>
              <h1 className="text-[14px] font-[600] leading-[18.27px] text-[#364A15]">
                {productName}
              </h1>
            </Link>
          </div>
          <LikeComponent like={like} productId={productId}/>
        </div>

        <RatingStar starCounts={4} />

        <p className="text-[14px] font-[400] leading-[18.27px] text-[#8F8F8F]">
          By{" "}
          <Link to={`/home/Vendor/${vendorId}`}>
            <span className="text-[#000000] font-[600] underline underline-offset-4">
              {vendorName}
            </span>
          </Link>
        </p>

        <div
          className={`flex ${
            place === "dailybestsell"
              ? "flex-col justify-center"
              : "max-Lmobile:flex-col max-Lmobile:w-full justify-between items-center"
          }`}
        >
          <div className="flex gap-1 items-center">
            <div className="text-[16px] font-[500] leading-[20.88px] text-[#1AC84B]">
              <ProductPrice
                price={has_active_offer ? OfferPrice : OriginalPrice}
                currency={currency}
              />
            </div>
            {has_active_offer && off > 0 && (
              <div className="text-[10px] font-[400] leading-[13.05px] text-[#20202033] line-through">
                <ProductPrice price={OriginalPrice} currency={currency} />
              </div>
            )}
          </div>

          {place === "dailybestsell" && (
            <div className="flex flex-col">
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
                ? "text-[#000] text-opacity-50 border-2 cursor-not-allowed"
                : "bg-[#DEF9EC] cursor-pointer hover:bg-[#1AC84B] hover:text-[#fff]"
            } ${place === "dailybestsell" ? "w-full" : "max-Lmobile:w-full w-[76px]"}`}
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
// ProductCard.defaultProps = {
//   categories: "Vegetable",
//   productName: "Tomato",
//   vendorName: "Veg & Health",
//   OriginalPrice: 152.99,
//   OfferPrice: 137.99,
//   has_active_offer: true,
//   href: "#",
//   like: false,
//   place: "",
//   Total_items: 50,
//   Sold_items: 50,
// };
