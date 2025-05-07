import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ProductPrice from "../ProductPrice";
import { FiPlus, FiMinus } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { addToCart,resetcart } from "../../Redux/CartSlice";
import FrequentlyBoughtTogether from "./FrequentlyBoughtTogether";
import Detail from "../details/Detail";
import OffCount from "../OffCount";
import RelevantProducts from "./RelavantProducts";
import middleapi from "../../utils/middleapi";

const API_URL = process.env.REACT_APP_API_URL;

const ShopProduct = () => {
  const { productId,vendorId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [noItems, setNoItems] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [relatedData,setRelatedData]=useState()
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Assume vendorId is 1 for this call, or fetch dynamically if needed
        const response = await middleapi.get(`/vendors/productdetail/${vendorId}/${productId}/`);
        const { product,related_products } = response.data;
        setRelatedData(related_products)

        const productData = {
          productId: product.id,
          productName: product.name,
          productDetails: product.description,
          OriginalPrice: parseFloat(product.price),
          productImg: product.image,
          Currency: "₹",
          off: parseFloat(product.product_discount),
          Total_items: product.stock,
          Sold_items: 0,
          VendorName: product.vendor_name,
          vendorId: product.vendor,
          productPreview: [product.image], // If only 1 image
        };

        setProductDetails(productData);
        setSelectedImage(product.image);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const addItems = () => setNoItems(noItems + 1);
  const subItems = () => noItems > 1 && setNoItems(noItems - 1);

  const handleAddToCart = () => {
    if (productDetails && productDetails.Total_items - productDetails.Sold_items > 0) {
      dispatch(
        addToCart({
          productId: productDetails.productId,
          productName: productDetails.productName,
          OriginalPrice: productDetails.OriginalPrice,
          productImg: productDetails.productImg,
          quantity: noItems,
          VendorName: productDetails.vendor_name,
          price: productDetails.has_active_offer?productDetails.OfferPrice:productDetails.OriginalPrice
           
        })
      );
    }
  };
  
  const handleCheckout = () => {
    
    
    dispatch(resetcart())
    if (productDetails && productDetails.Total_items - productDetails.Sold_items > 0) {
      dispatch(
        
        addToCart({
          productId: productDetails.productId,
          productName: productDetails.productName,
          OriginalPrice: productDetails.OriginalPrice,
          productImg: productDetails.productImg,
          quantity: noItems,
          VendorName: productDetails.VendorName,
          price: productDetails.has_active_offer?productDetails.OfferPrice:productDetails.OriginalPrice
           
        })
      );
    }
  };

  return (
    <div className="w-full bg-cart_bg">
      <div className="w-[95%] laptopw-[80%] mx-auto my-6">
        {productDetails ? (
          <>
            <div className="flex max-tablet:flex-col max-tablet:items-center tablet:flex-row justify-evenly gap-1">
              <div className="w-[8rem] h-[8rem] Mmobile:w-[10rem] Mmobile:h-[10rem] tablet:w-[20rem] tablet:h-[20rem] laptop:w-[28rem] laptop:h-[28rem] bg-[#ffff] rounded-2xl relative flex justify-center items-center border-2 border-[#D4D4D480]">
                <div className="absolute right-0 top-3 bg-[#FF943B] rounded-sm w-[82px] h-[30px] text-[#ffffff] flex justify-center items-center">
                  {productDetails.off}% Off
                </div>
                <div>
                  <img src={selectedImage} alt="Product" className="w-full h-full object-cover" />
                </div>
              </div>

              <div className="max-tablet:flex max-tablet:flex-col max-tablet:items-center max-tablet:w-[90%] tablet:w-1/2 text-[#364A15] space-y-4 tablet:space-y-6">
                <h1 className="text-[50px] tablet:text-[64px] font-[300] tablet:leading-[78.31px]">
                  {productDetails.productName}
                </h1>

                <div className="flex gap-3 font-[400] items-center">
                  <p className="line-through opacity-[.7] text-[10px] tablet:text-[24px]">
                    <ProductPrice price={productDetails.OriginalPrice} currency={productDetails.Currency} />
                  </p>
                  <p className="text-[18px] tablet:text-[34px]">
                    <ProductPrice
                      price={
                        productDetails.OriginalPrice -
                        (productDetails.OriginalPrice * productDetails.off) / 100
                      }
                      currency={productDetails.Currency}
                    />
                  </p>
                </div>

                <p className="font-[400] text-[12px] tablet:text-[16px]">{productDetails.productDetails}</p>

                <div className="flex gap-4">
                  <p>In Stock:</p>
                  <p>{productDetails.Total_items - productDetails.Sold_items} Left</p>
                </div>

                <div className="flex items-center gap-8">
                  <div
                    className="bg-[#F2EBD9] w-[3rem] h-[3rem] rounded-full border-[1px] border-[#364A15] flex justify-center items-center cursor-pointer"
                    onClick={subItems}
                  >
                    <FiMinus />
                  </div>
                  <div className="w-[1rem]">{noItems}</div>
                  <div
                    className="bg-[#F2EBD9] w-[3rem] h-[3rem] rounded-full border-[1px] border-[#364A15] flex justify-center items-center cursor-pointer"
                    onClick={addItems}
                  >
                    <FiPlus />
                  </div>
                </div>

                <div className="w-1/2">
                  <div className="flex gap-3 select-none text-[14px] font-[400]">
                    Shop Name:
                    <Link to={`/home/Vendor/${productDetails.VendorName}`} className="font-bold cursor-pointer">
                      {productDetails.VendorName}
                    </Link>
                  </div>
                  <div className="flex gap-3 text-[14px] font-[400]">
                    Id: <span className="font-[300]">{productDetails.vendorId}</span>
                  </div>
                  
                </div>
              </div>
            </div>

            <div className="flex max-tablet:flex-col tablet:flex-row justify-between items-center my-8 w-[95%] mx-auto gap-2">
              {/* <div className="flex gap-3">
                {productDetails.productPreview.slice(0, 4).map((element, index) => (
                  <div
                    key={index}
                    className="max-Mmobile:w-[4rem] max-Mmobile:h-[4rem] max-tablet:w-[5rem] max-tablet:h-[5rem] laptop:w-[7rem] laptop:h-[7rem] Llaptop:w-[8rem] Llaptop:h-[8rem] rounded-3xl bg-[#fff] border-[#D4D4D480] border-2 cursor-pointer"
                    onClick={() => setSelectedImage(element)}
                  >
                    <img src={element} alt="Product Preview" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div> */}

<div className="flex justify-end w-full gap-4 tablet:gap-5">
  <div
    className="flex justify-center items-center w-[150px] h-[48px] tablet:w-[160px] tablet:h-[50px] laptop:w-[200px] laptop:h-[58px] rounded-full bg-[#F2EBD9] cursor-pointer"
    onClick={handleAddToCart}
  >
    <p>Add to cart</p>
  </div>
  <Link to="/home/checkout" className="flex justify-center items-center w-[150px] h-[48px] tablet:w-[160px] tablet:h-[50px] laptop:w-[200px] laptop:h-[58px] rounded-full bg-[#F2EBD9] cursor-pointer" onClick={()=>{handleCheckout() }}> 
    <p>Checkout</p>
  </Link>
</div>

            </div>

            <RelevantProducts related_products={relatedData}/>
            
          </>
        ) : (
          <p>Loading product details...</p>
        )}
      </div>
      {/* {productDetails && <Detail vendor={productDetails} />} */}
      <div className="w-[90%] mx-auto my-4">
      <h2 className="text-xl font-semibold mb-2">Product Description</h2>
      <div className="text-sm leading-6">
      {productDetails?.productDetails || "No description available."}
      </div>
    </div>
      {/* <OffCount /> */}
    </div>
  );
};

export default ShopProduct;
