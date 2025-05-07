import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity,resetcart } from "../../Redux/CartSlice";
import { FiPlus, FiMinus } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";
import { fetchVendors } from "../../Redux/VendorsSlice";
import { Link, useNavigate } from "react-router-dom";
import ProductPrice from "../ProductPrice";
import middleapi from "../../utils/middleapi";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartData = useSelector((state) => state.cart.items);
  const { items: vendors } = useSelector((state) => state.vendors);

  const [subtotal, setSubtotal] = useState(0);
  const [totalDelivery, setTotalDelivery] = useState(0);
  const [tax, setTax] = useState(0); // Future Axios Integration
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState("");

  // Fetch vendors
  useEffect(() => {
    dispatch(fetchVendors());

  }, [dispatch]);

  const reset=()=>{
    dispatch(resetcart())
  }
  // Calculate Subtotal, Delivery Charge, and Tax
  useEffect(() => {
    const total = cartData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSubtotal(Number(total.toFixed(2)));

    // Calculate delivery charge
    const uniqueVendors = [...new Set(cartData.map((item) => item.vendorName))];
    const deliveryChargeTotal = uniqueVendors.reduce((acc, vendorName) => {
      const vendor = vendors.find((v) => v.VendorName === vendorName);
      return acc + (vendor?.deliveryCharge || 0);
    }, 0);
    setTotalDelivery(deliveryChargeTotal);

    // Calculate tax (assuming 10% for now)
    setTax(Number((total * 0.1).toFixed(2)));
  }, [cartData, vendors]);

  // Calculate Grand Total
  const total = subtotal + totalDelivery + tax - discount;

  // Apply Coupon
  const handleApplyCoupon = () => {
    if (couponCode === "SAVE10") {
      setDiscount(Number((subtotal * 0.1).toFixed(2))); // 10% off
    } else if (couponCode === "FREEDEL") {
      setDiscount(totalDelivery); // Free delivery
    } else {
      setDiscount(0);
      alert("Invalid coupon code!");
    }
  };

  // Proceed to Checkout-1
  const handleProceedToCheckout = () => {
    if (cartData.length > 0) {
      navigate("/home/checkout", { state: { cartData, total } });
    } else {
      alert("Your cart is empty!");
    }
  };

  return (
    <div className="bg-cart_bg  text-center text-[#364A15] py-2">
      <div className="font-[400] text-[40px] laptop:text-[60px]">Cart</div>
      <p className="font-[300] text-[10px] laptop:text-[20px]">
        Your Fresh Picks Await: Review and Confirm Your Selections
      </p>

      <div className=" w-full h-full pt-9">
        <div className="w-[90%] tablet:w-[90%] bg-white bg-opacity-50 rounded-xl mx-auto border-2">
          <table className="w-[90%] mx-auto">
            <thead>
              <tr className="text-center border-b-2 font-[400] text-[10px] laptop:text-[20px]">
                <th className="py-4">Thumb</th>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Sub total</th>
                <th className="max-tablet:hidden">Remove</th>
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
                  <tr
                    key={item.productId}
                    className="text-center max-tablet:text-[8px] tablet:text-[12px] laptop:text-[18px]"
                  >
                    <td>
                      <img
                        src={item.productImg}
                        alt={item.productName}
                        className="w-[60px] laptop:w-[80px] mx-auto"
                      />
                    </td>
                    <td>{item.productName}</td>
                    <td>
                      <ProductPrice
                        price={Number(item.OfferPrice ? item.OfferPrice : item.price ).toFixed(2)}
                        
                      />
                    </td>
                    <td>
                      <div className="flex justify-center items-center gap-2">
                        <button
                          className="bg-[#F2EBD9] p-2 rounded-xl border-[1px] max-tablet:hidden"
                          onClick={() =>
                            item.quantity > 1 &&
                            dispatch(
                              updateQuantity({
                                productId: item.productId,
                                vendorId: item.vendorId,
                                quantity: item.quantity - 1,
                              })
                            )
                          }
                        >
                          <FiMinus />
                        </button>

                        <div
                          className="tablet:w-[50px] text-center   rounded-full cursor-pointer"
                          onClick={() =>
                            alert(
                              "Quantity is not editable directly. Use + or - buttons."
                            )
                          }
                        >
                          {item.quantity}
                        </div>

                        <button
                          className="bg-[#F2EBD9] p-2 rounded-full border-[1px] max-tablet:hidden"
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                productId: item.productId,
                                vendorId: item.vendorId,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </td>
                    <td>
                      <ProductPrice
                        price={(item.OfferPrice ? item.OfferPrice * item.quantity : item.price * item.quantity).toFixed(2)}
                        
                      />
                    </td>
                    <td className="max-tablet:hidden">
                      <button
                        onClick={() =>
                          dispatch(
                            removeFromCart({ productId: item.productId ,vendorId: item.vendorId })
                          )
                        }
                        className="bg-[#DEF9EC] p-2 rounded-3xl"
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
      </div>
      {cartData.length > 0 && (
        <div className=" w-[90%] mx-auto mt-10 ">
          {/* Coupon Section */}
          {/* <div className="flex gap-2 items-center max-tablet:text-[8px] tablet:text-[12px] laptop:text-[18px]">
              <p className="max-tablet:text-[8px] tablet:text-[12px] laptop:text-[18px]">Coupon:</p>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder="Enter coupon code"
                className="border-2 rounded-[67px] p-2 tablet:p-3 w-[120px] tablet:w-[160px] laptop:w-[250px] max-tablet:text-[8px] tablet:text-[12px] laptop:text-[18px]"
              />
              <button onClick={handleApplyCoupon} className="bg-[#D2F4D6] p-2 tablet:p-3 rounded-[67px] max-tablet:text-[8px] tablet:text-[12px] laptop:text-[18px]">
                Apply Coupon
              </button>
            </div> */}

          {/* Cart Summary */}
          <div className="   mt-10 max-Lmobile:mx-auto max-tablet:text-[8px] tablet:text-[12px] laptop:text-[18px] flex flex-col max-tablet:items-center tablet:items-end">
            <p className="text-[20px] tablet:text-[32px] px-2 tablet:text-start">
              Cart Total
            </p>
            <div className="bg-[#D2F4D6] w-[90%] tablet:w-[40%] rounded-xl px-6 py-4">
              <div className="space-y-3">
                <div className="flex justify-between border-b-1 border-[#000] ">
                  <p>Subtotal:</p>
                  <ProductPrice
                    price={subtotal.toFixed(2)}
                    currency={cartData[0]?.currency || "INR"}
                  />
                </div>
                {/* <div className="flex justify-between">
                  <p>Delivery Charge:</p>
                  <p>₹{totalDelivery}</p>
                </div> */}
                <div className="flex justify-between">
                  <p>Tax (10%):</p>
                  <p>₹{tax}</p>
                </div>
                {/* <div className="flex justify-between">
                  <p>Discount:</p>
                  <p>- ₹{discount}</p>
                </div> */}
                <div className="flex justify-between  font-bold max-tablet:text-[8px] tablet:text-[12px] laptop:text-[18px]">
                  <p>Total:</p>
                  <p>₹{total.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <button
              className="bg-[#D2F4D6] w-[40%] rounded-full py-4 mt-5"
              onClick={handleProceedToCheckout}
            >
              Proceed To Payment
            </button>
          </div>
        </div>

      )}
      {/* <div onClick={reset}>rest</div> */}
    </div>
  );
};

export default Cart;
