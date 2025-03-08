import React, { useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { CiCalendar } from "react-icons/ci";
import { removeFromCart, updateQuantity } from "../../Redux/CartSlice";
import ProductPrice from "../ProductPrice";
import { FiPlus, FiMinus } from "react-icons/fi";

const OldCheckout = () => {
  const dispatch = useDispatch();
  const cartdata = useSelector((state) => state.cart.items);

  const addresses = [
    { id: 1, address: "Dno. 12-34-12, XYC Apartments, DOOR Colony, Hyderabad, Telangana", altitude: "89u98b8u2815", longtitude: "89u98b8u2820" },
    { id: 2, address: "Dno. 56-78-90, ABC Towers, Sdiveet 5, Bangalore, Karnataka", altitude: "89u98b8u2813", longtitude: "89u98b8u2812" },
  ];

  const orderTypes = [
    { id: 1, name: "Order Now" },
    { id: 2, name: "Subscription" },
    { id: 3, name: "Schedule Order" },
  ];

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedOrderType, setSelectedOrderType] = useState(null);
  const [location, setLocation] = useState({ altitude: "", longtitude: "" });
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0); // Default 20% discount

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  // ✅ Group cart items by vendorName
  const groupedCart = cartdata.reduce((acc, item) => {
    if (!acc[item.vendorName]) {
      acc[item.vendorName] = [];
    }
    acc[item.vendorName].push(item);
    return acc;
  }, {});

  // Calculate Item Total
  const itemTotal = cartdata.reduce((total, item) => total + item.price * item.quantity, 0);

  // Static Delivery Fee & Taxes
  const deliveryFee = 50;
  const taxesAndCharges = 18;

  // Calculate Discount
  const discountAmount = (itemTotal * discount) / 100;

  // Final Total After Discount
  const finalTotal = itemTotal - discountAmount + deliveryFee + taxesAndCharges;

  // Apply Coupon Logic
  const applyCoupon = () => {
    if (coupon === "SAVE20") {
      setDiscount(20); // 20% discount
    } else {
      alert("Invalid Coupon");
    }
  };

  return (
    <div className="w-[90%] mx-auto">
      <div className="text-center mb-8">
        <h1 className="max-tablet:text-2xl tablet:text-4xl font-bold text-green-800">Checkout</h1>
        <p className="max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px] text-gray-600">Secure Checkout: Complete Your Order with Confidence</p>
      </div>

      <div className="flex  max-laptop:flex-col laptop:flex-row justify-around gap-3">
        <div className="space-y-6 max-tablet:w-full laptop:w-3/4">
          {/* Delivery Address */}
          <div className="flex gap-2 items-center">
            <FaMapMarkerAlt />
            <div className="font-semibold max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]">Delivery Address</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4  ">
            {addresses.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col gap-2 justify-center border-2 border-dashed border-[#95CF9C] p-3 rounded-lg max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px] w-[8rem] tablet:w-[20rem] cursor-pointer 
                ${selectedAddress === item.id ? "bg-[#D2F4D6]" : ""}`}
                onClick={() => {
                  setLocation({ altitude: item.altitude, longtitude: item.longtitude });
                  setSelectedAddress(item.id);
                }}
              >
                <FaMapMarkerAlt />
                <div>{item.address}</div>
              </div>
            ))}
          </div>
          {/*Map */}
          {selectedAddress && (
            <div className="mt-4">
              <img src="/Asset/orderlocation.png" alt="Map Location" className="max-tablet:w-full laptop:w-[30rem] h-auto max-laptop:mx-auto" />
            </div>
          )}

          {/* Order Type */}
          <div className="flex gap-2 items-center max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]">
            <TiDocumentText />
            <div className="font-semibold">Type of Order</div>
          </div>
          <div className="flex gap-[30px]">
            {orderTypes.map((type) => (
              <div
                key={type.id}
                className={`flex max-tablet:gap-1 tablet:gap-2 justify-center items-center border-2 border-dashed border-[#95CF9C] p-3 rounded-lg w-[12rem] cursor-pointer  max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]
                ${selectedOrderType === type.id ? "bg-[#D2F4D6]" : ""}`}
                onClick={() => setSelectedOrderType(type.id)}
              >
                <CiCalendar />
                <div>{type.name}</div>
              </div>
            ))}
          </div>

          {/* Coupon Section */}
          <div className="flex items-center gap-5  ">
            <div className="max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]">Coupon:</div>
            <input
              type="text"
              className="rounded-full p-3 border-2 border-[#9E9E9E80] max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]"
              placeholder="Enter the coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button className="bg-green-500 text-white px-4 py-2 rounded-full max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]" onClick={applyCoupon}>
              Apply Coupon
            </button>
          </div>
          {/* Notes Section */}
          <div className="max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]">
            <div>Any Note for us?</div>
            <textarea rows="3" className="border-2 border-[#808080] rounded-lg w-1/2 p-2" placeholder="Write your message..."></textarea>
          </div>

        </div>
        

        {/* Cart Summary */}
        <div className="rounded-xl shadow-md max-laptop:w-full laptop:w-1/4 p-4 bg-white max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Cart</p>
            <p>{cartdata.length} items</p>
          </div>

          {/* ✅ Grouped Cart Items by Vendor */}
          {Object.keys(groupedCart).map((vendorName) => (
            <div key={vendorName} className="mt-5">
              <div className="font-semibold">{vendorName}</div>
              {groupedCart[vendorName].map((item) => (
                <div key={item.productId} className="mt-3 flex justify-between items-center">
                  <div>
                    <div>{item.productName}</div>
                    <div className="opacity-50">
                      <ProductPrice price={(item.price * item.quantity).toFixed(2)} currency={item.currency} />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <button className="p-2 border rounded-full" onClick={() => item.quantity > 1 && handleQuantityChange(item.productId, item.quantity - 1)}>
                      <FiMinus />
                    </button>
                    <div className="w-8 text-center">{item.quantity}</div>
                    <button className="p-2 border rounded-full" onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}>
                      <FiPlus />
                    </button>
                  </div>
                  
                </div>
              ))}
            </div>
          ))}

          {/* Billing Details */}
          <div className="mt-10">
            <div className="font-semibold opacity-50">Bill Details</div>
            <div className="flex justify-between opacity-50">
              <div>Item Total</div>
              <div><ProductPrice price={itemTotal.toFixed(2)} currency="INR" /></div>
            </div>
            <div className="flex justify-between items-center opacity-50">
              <div>Delivery Fee | 12.9 kms</div>
              <div><ProductPrice price={deliveryFee.toFixed(2)} currency="INR" /></div>
              </div>
              <div className="flex justify-between items-center opacity-50">
              <div>Taxes & Charges</div>
              <div><ProductPrice price={taxesAndCharges.toFixed(2)} currency="INR" /></div>
            </div>
            {discount?
            <div className="flex justify-between items-center opacity-50">
            <div>Discount (-{discount}%)</div>
            <div><ProductPrice price={discountAmount.toFixed(2)} currency="INR" /></div>
          </div>:""}
            <div className="font-bold mt-3 flex justify-between  max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]">
              <div>Total</div>
              <div><ProductPrice price={finalTotal.toFixed(2)} currency="INR" /></div>
            </div>
            <div className="rounded-lg bg-[#D2F4D6] flex justify-center px-4 py-3 mt-4 cursor-pointer">
              Proceed To Payment
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OldCheckout;
