import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../Redux/CartSlice";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";
import { fetchVendors } from "../../Redux/VendorsSlice";
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import ProductPrice from "../ProductPrice";

const Cart = () => {
  const [canAccessCheckout, setCanAccessCheckout] = useState(false);
  const dispatch = useDispatch();
  const [subtotal,setSubtotal]=useState(0);
  const [totalDelivery, setTotalDelivery] = useState(0);
  

  

   const { items: vendors, status, error } = useSelector((state) => state.vendors);
  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);
  
  
  
  
  // Access cart data using useSelector
  const cartData = useSelector((state) => state.cart.items);

  // Function to handle removing an item from the cart
  const handleRemove = (productId) => {
    dispatch(removeFromCart({ productId }));
  };

  // Function to update the quantity of an item
  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };
  useEffect(() => {
    const total = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setSubtotal(Number(total.toFixed(2)));
    // const tax = cartData.reduce((acc, item) => acc + (item.price * item.quantity * item.taxRate), 0);


    // Calculate total delivery charge based on vendor
    const uniqueVendors = [...new Set(cartData.map((item) => item.vendorName))];
    const deliveryChargeTotal = uniqueVendors.reduce((acc, vendorName) => {
      const vendor = vendors.find((v) => v.VendorName === vendorName);
      return acc + (vendor?.deliveryCharge || 0);
    }, 0);

    setTotalDelivery(deliveryChargeTotal);
  }, [cartData, vendors]);

  const total = subtotal + totalDelivery;
  const handleProceedToCheckout = () => {
    if (cartData.length > 0) {
      // Redirect to checkout if the cart is not empty
      setCanAccessCheckout(true);
    } else {
      alert('Your cart is empty!'); // Alert if the cart is empty
    }
  };

  if (canAccessCheckout && cartData.length > 0) {
    // Redirect to checkout page
    return <Navigate to="/home/checkout" />;
  }
  


  return (
    <>
      <div className=" text-center text-[#364A15] py-2 ">
        <div className="font-[400] max-tablet:text-[40px] max-laptop:text-[45px] max-laptop:leading-[68.31px] laptop:text-[60px] laptop:leading-[78.31px]">
          Cart
        </div>
        <p className="font-[300] max-laptop:text-[10px] max-laptop:leading-[16px] laptop:text-[20px] laptop:leading-[26.1px]">
          Your Fresh Picks Await: Review and Confirm Your Selections
        </p>
        <div className="bg-cart_bg w-[100vw] h-full  pt-9">
          <div className="w-[90%] tablet:w-[80%] bg-[#ffffff] rounded-xl mx-auto border-2">
            <table className="w-[90%] mx-auto ">
              <thead>
                <tr className="text-center border-b-2 font-[400] max-tablet:text-[9px] max-table:leading-[20px] max-laptop:text-[14px] max-laptop:leading-[18px] laptop:text-[20px] laptop:leading-[26px]">
                  <th className=" py-4">Thumb</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Sub total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {cartData.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4">
                      Your cart is empty
                    </td>
                  </tr>
                ) : (
                  cartData.map((item) => (
                    <tr key={item.productId} className="text-center font-[300] max-tablet:text-[8px] max-table:leading-[10px] max-laptop:text-[10px] max-laptop:leading-[16px] laptop:text-[18px] laptop:leading-[23px]">
                      <td>
                        <img
                          src={item.productImg}
                          alt={item.productName}
                          className="max-tablet:w-[30px] max-tablet:h-[30px] max-laptop:w-[60px] max-laptop:h-[60px] laptop:w-[80px] laptop:h-[80px] mx-auto"
                        />
                      </td>
                      <td>{item.productName}</td>
                      <td> <ProductPrice price={item.price} currency={item.currency}/></td>
                      <td>
                        <div className="flex justify-center items-center">
                          <div
                            className="bg-[#F2EBD9] tablet:p-2 rounded-xl border-[1px] border-[#364A15]"
                            onClick={() => {
                              if (item.quantity > 1) {
                                handleQuantityChange(
                                  item.productId,
                                  item.quantity - 1
                                );
                              }
                            }}
                          >
                            <FiMinus />
                          </div>
                          <input
                            type="number"
                            value={item.quantity}
                            min="1"
                            onChange={(e) =>
                              handleQuantityChange(
                                item.productId,
                                parseInt(e.target.value)
                              )
                            }
                            className="w-[50px] text-center"
                          />
                          <div
                            className="bg-[#F2EBD9] tablet:p-2 rounded-xl border-[1px] border-[#364A15]"
                            onClick={(e) =>
                              handleQuantityChange(
                                item.productId,
                                item.quantity + 1
                              )
                            }
                          >
                            <FiPlus />
                          </div>
                        </div>
                      </td>
                      <td>
                      
                        {isNaN(item.quantity)
                          ? 0
                          : <ProductPrice price={(item.price * item.quantity).toFixed(2)} currency={item.currency}/>}
                          
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemove(item.productId)}
                          className="  bg-[#DEF9EC] tablet:p-2 rounded-3xl border-[1px] border-[#364A15]"
                        >
                          <IoIosClose />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center my-[5rem] mx-auto w-[80%] gap-[1rem] tablet:gap-[2rem] max-sm:w-full max-md:gap-[0.5rem]">
  <p className="font-[400] text-[#364A15] max-Mmobile:text-[8px] max-Mmobile:leading-[12px] max-tablet:text-[10px] max-tablet:leading-[16px] tablet:text-[20px] tablet:leading-[26px] laptop:text-[22px] laptop:leading-[28px]">
    Coupon:
  </p>
  <input
    type="text"
    placeholder="Enter the Coupon code"
    className="border-[#9E9E9E80] border-2 rounded-[67px] text-[10px] p-2 tablet:p-3 max-Mmobile:h-[25px] max-tablet:h-[30px] tablet:h-[43px] tablet:w-[150px] w-[60%] laptop:w-[250px] laptop:h-[47px]"
  />
  <button className="bg-[#D2F4D6] font-[400] text-[#364A15] p-2 max-Mmobile:text-[6px] max-tablet:text-[8px] tablet:p-3 rounded-[67px] tablet:text-[12px] laptop:text-[14px]">
    Apply Coupon
  </button>
</div>

          <div className="mx-auto max-Lmobile:mx-5 Lmobile:ml-auto w-[90%] tablet:w-[40%] mr-9 flex jusitfy-end items-end flex-col space-y-3">
            <p className="  px-1 text-[20px] tablet:text-[32px]">Cart Total</p>
            <div className="w-[300px] tablet:w-[547px] bg-[#D2F4D6] rounded-xl px-6 py-4">
              <div className="space-y-3">
                <div className="flex justify-between border-b-2 border-[#364A1533]/[0.1] ">
                  <div>Sub total :</div>
                  {cartData?<div><ProductPrice price={(subtotal).toFixed(2)} currency={cartData[0].currency}/> </div>:<div><ProductPrice price={0} currency={'inr'}/> </div>}
                  
                </div>
                <div className="flex justify-between  ">
                  <div className="flex items-center">
                    Delivery charge :
                    <div className="relative group">
                      <CiCircleInfo />
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block p-2  text-[#364A15] text-[10px] w-[10vw] rounded-lg shadow-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100 ">
                        As per the Delivery charge based on the distance between
                        yours with vendor
                      </div>
                    </div>
                  </div>
                  <div>₹{55}</div>
                </div>
                <div className="flex justify-between border-b-2 border-[#364A1533]/[0.1]">
                  <div className="flex items-center">
                    Tax :
                    <div className="relative group">
                      <CiCircleInfo />
                      <div className="absolute  left-[6rem] -top-[0.5rem] transform -translate-x-1/2 mb-2 hidden group-hover:block p-2  text-[#364A15]  text-[10px] w-[10vw] h-[4rem] rounded-lg shadow-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100 ">
                        As per the Delivery charge based on the distance between
                        yours with vendor
                      </div>
                    </div>{" "}
                  </div>
                  <div>₹{55}</div>
                </div>
                <div className="flex justify-between  ">
                  <div>Total :</div>
                  <div>₹{5}</div>
                </div>

              </div>
            </div>
            <div className="bg-[#D2F4D6] w-[298px] rounded-full px-3 py-4 cursor-pointer" onClick={handleProceedToCheckout}>
            
            Proceed To Payment
              
            </div>
          </div>
          
          
        </div>
      </div>
    </>
  );
};

export default Cart;
