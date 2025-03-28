import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchVendors } from "../../Redux/VendorsSlice";
import ProductPrice from "../ProductPrice";
import { FiPlus, FiMinus } from "react-icons/fi";
import { addToCart } from "../../Redux/CartSlice";
import FrequentlyBoughtTogether from "./FrequentlyBoughtTogether";
import Detail from "../details/Detail";
import OffCount from "../OffCount";




const ShopProduct = () => {
  const { productId } = useParams();
  const [ProductDetails, setProductDetails] = useState(null);
  const [Noitems, setNoitems] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const { items: vendors, loading, error } = useSelector((state) => state.vendors);

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const additems = () => setNoitems(Noitems + 1);
  const subitems = () => Noitems > 1 && setNoitems(Noitems - 1);

  useEffect(() => {
    if (vendors.length > 0) {
      
      
      const vendor = vendors.find((v) =>
        v.products.some((p) => p.productId === parseInt(productId))
      );


      if (vendor) {
        const product = vendor.products.find(
          (p) => p.productId === parseInt(productId)
        );
        
        

        if (product) {
          setProductDetails({
            ...product,
            VendorName: vendor.VendorName,
            vendorId: vendor.vendorId,
            VendorBanner:vendor.VendorBanner,
            additionalInfo:vendor.additionalInfo,
            reviews:vendor.reviews,
            
          });
          setSelectedImage(product.productImg);
          
           // Set initial banner image
        }
      }
    }
  }, [vendors, productId]);

  const handleAddToCart = () => {
    
    
    if (ProductDetails && ProductDetails.Total_items - ProductDetails.Sold_items > 0) {
      dispatch(
        addToCart({
          productId: ProductDetails.productId,
          productName: ProductDetails.productName,
          OriginalPrice: ProductDetails.OriginalPrice,
          productImg: ProductDetails.productImg,
          quantity: Noitems,
          price: ProductDetails.OriginalPrice - (ProductDetails.OriginalPrice * (ProductDetails.off / 100)),
        })
      );
    }
  };

  return (
    <div className="w-full bg-cart_bg">
      <div className="w-[95%] laptopw-[80%] mx-auto my-6">
        {ProductDetails ? (
          <>
            <div className="flex max-tablet:flex-col max-tablet:items-center tablet:flex-row justify-evenly gap-1">
              <div className="w-[8rem] h-[8rem] Mmobile:w-[10rem] Mmobile:h-[10rem] tablet:w-[20rem] tablet:h-[20rem] laptop:w-[28rem] laptop:h-[28rem] bg-[#ffff] rounded-2xl relative flex justify-center items-center border-2 border-[#D4D4D480]">
                <div className="absolute right-0 top-3 bg-[#FF943B] rounded-sm w-[82px] h-[30px] text-[#ffffff] flex justify-center items-center">
                  {ProductDetails.off}% Off
                </div>
                <div>
                  <img src={selectedImage} alt="Banner" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="max-tablet:flex max-tablet:flex-col max-tablet:items-center max-tablet:w-[90%]  tablet:w-1/2 text-[#364A15] space-y-4 tablet:space-y-6">
                <h1 className="text-[50px] tablet:text-[64px] font-[300] tablet:leading-[78.31px]">
                  {ProductDetails.productName}
                </h1>
                <div className="flex gap-3 font-[400] items-center">
                  <p className="line-through opacity-[.7] text-[10px] tablet:text-[24px]">
                    <ProductPrice
                      price={ProductDetails.OriginalPrice}
                      currency={ProductDetails.Currency}
                    />
                  </p>
                  <p className="text-[18px] tablet:text-[34px]">
                    <ProductPrice
                      price={ProductDetails.OriginalPrice - (ProductDetails.OriginalPrice * (ProductDetails.off / 100))}
                      currency={ProductDetails.Currency}
                    />
                  </p>
                </div>
                <p className="font-[400] text-[12px] tablet:text-[16px]">{ProductDetails.productDetails}</p>
                <div className="flex gap-4">
                  <p>In Stock :</p>
                  <p>{ProductDetails.Total_items - ProductDetails.Sold_items} Left</p>
                </div>
                <div className="flex items-center gap-8">
                  <div
                    className="bg-[#F2EBD9] w-[3rem] h-[3rem] rounded-full border-[1px] border-[#364A15] flex justify-center items-center cursor-pointer"
                    onClick={subitems}
                  >
                    <FiMinus />
                  </div>
                  <div className="w-[1rem]">{Noitems}</div>
                  <div
                    className="bg-[#F2EBD9] w-[3rem] h-[3rem] rounded-full border-[1px] border-[#364A15] flex justify-center items-center cursor-pointer"
                    onClick={additems}
                  >
                    <FiPlus />
                  </div>
                </div>
                <div className="w-1/2">
                  <div className="flex gap-3 select-none text-[14px] font-[400]">
                    Shop Name:
                    <Link to={`/home/Vendor/${ProductDetails.VendorName}`} className="font-bold cursor-pointer">
                      {ProductDetails.VendorName}
                    </Link>
                  </div>
                  <div className="flex gap-3 text-[14px] font-[400]">
                    Id: <span className="font-[300]">{ProductDetails.vendorId}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex max-tablet:flex-col tablet:flex-row justify-between items-center my-8 w-[95%] mx-auto gap-2">
              <div className="flex gap-3">
                {ProductDetails.productPreview.slice(0, 4).map((element, index) => (
                  <div
                    key={index}
                    className="max-Mmobile:w-[4rem] max-Mmobile:h-[4rem] max-tablet:w-[5rem] max-tablet:h-[5rem] laptop:w-[7rem] laptop:h-[7rem] Llaptop:w-[8rem] Llaptop:h-[8rem] rounded-3xl bg-[#fff] border-[#D4D4D480] border-2 cursor-pointer"
                    onClick={() => setSelectedImage(element)}
                  >
                    <img src={`${element}`} alt="Product Preview" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex gap-4 tablet:gap-5">
                <div className="flex justify-center items-center w-[150px] h-[48px] tablet:w-[160px] tablet:h-[50px] laptop:w-[200px] laptop:h-[58px] rounded-full bg-[#F2EBD9] cursor-pointer" onClick={handleAddToCart}>
                  <p>Add to cart</p>
                </div>
                <div className="flex justify-center items-center w-[150px] h-[48px] tablet:w-[160px] tablet:h-[50px] laptop:w-[200px] laptop:h-[58px] rounded-full bg-[#F2EBD9] cursor-pointer">
                  <p>Checkout</p>
                </div>
              </div>
            </div>
            <FrequentlyBoughtTogether />
            
          </>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
      <Detail vendor={ProductDetails}/>
      <OffCount />
    </div>
  );
};

export default ShopProduct;
