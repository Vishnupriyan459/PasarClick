import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { TiDocumentText } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { CiCalendar } from "react-icons/ci";
import { removeFromCart, updateQuantity } from "../../Redux/CartSlice";
import ProductPrice from "../ProductPrice";
import { FiPlus, FiMinus } from "react-icons/fi";
import axios from 'axios';
import BillingDetails from "./BillingDetails";


export const placeOrder = async (orderData) => {
  try {
    const response = await axios.post('http://your-api-endpoint.com/orders', orderData);
    return response.data;
  } catch (error) {
    console.error("Order placement failed:", error);
    throw error;
  }
};

const OldCheckout = ({addresses, latitude, longitude}) => {
  const [note, setNote] = useState("");
  const dispatch = useDispatch();
  const API_URL = process.env.REACT_APP_API_URL;
  const cartdata = useSelector((state) => state.cart.items);
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    contact_number: "",
  });

  const address = addresses || [];
  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await fetch(`${API_URL}/customers/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
        if (response.ok) {
          const extractedInfo = {
            full_name: data.full_name,
            email: data.email,
            contact_number: data.contact_number,
          };
          setProfile(extractedInfo);
        } else {
          console.error("Failed to fetch profile:", data);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
  
    fetchProfile();
  }, []);

  const [selectedAddress, setSelectedAddress] = useState();
  const [selectedOrderType, setSelectedOrderType] = useState(null);
  const [location, setLocation] = useState({ altitude: "", longtitude: "" });
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const groupedCart = cartdata.reduce((acc, item) => {
    if (!acc[item.vendorName]) {
      acc[item.vendorName] = [];
    }
    acc[item.vendorName].push(item);
    return acc;
  }, {});

  const itemTotal = cartdata.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 50;
  const taxesAndCharges = 18;
  const discountAmount = (itemTotal * discount) / 100;
  const finalTotal = itemTotal - discountAmount + deliveryFee + taxesAndCharges;

  const applyCoupon = () => {
    if (coupon === "SAVE20") {
      setDiscount(20);
    } else {
      alert("Invalid Coupon");
    }
  };

  const handleProceedToPayment = async () => {
    if (!selectedAddress || !selectedAddress.address_line_1) {
      alert("Please select a delivery address before proceeding.");
      return;
    }
  
    const items = cartdata.map((item) => ({
      product_id: item.productId,
      quantity: item.quantity
    }));
    
    const orderPayload = {
      items,
      billing_info: {
        item_total: parseFloat(itemTotal.toFixed(2)),
        delivery_fee: deliveryFee,
        taxes_and_charges: taxesAndCharges,
        discount,
        billing_address: selectedAddress ? `${selectedAddress.address_line_1}, ${selectedAddress.address_line_2}, ${selectedAddress.city}, ${selectedAddress.country}`
  : "N/A",
        phone: profile.contact_number,
        contact_email: profile.email,
      },
      lat: latitude,
      lon: longitude,
      note
    };
  
    try {
      const response = await placeOrder(orderPayload);
      alert("Order placed successfully!");
      console.log(response);
    } catch (err) {
      alert("Order failed. Please try again.");
    }
  };

  return (
    <div className="w-[90%] mx-auto">
      <div className="text-center mb-8">
        <h1 className="max-tablet:text-2xl tablet:text-4xl font-bold text-green-800">Checkout</h1>
        <p className="max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px] text-gray-600">Secure Checkout: Complete Your Order with Confidence</p>
      </div>

      <div className="flex max-laptop:flex-col laptop:flex-row justify-around gap-3">
        <div className="space-y-6 max-tablet:w-full laptop:w-3/4">
          <div className="flex gap-2 items-center">
            <FaMapMarkerAlt />
            <div className="font-semibold max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]">Delivery Address</div>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            {address.slice(0, showAllAddresses ? address.length : 4).map((item) => (
              <div
                key={item.id}
                className={`flex flex-col gap-2 justify-center border-2 border-dashed border-[#95CF9C] p-3 rounded-lg max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px] w-[8rem] tablet:w-[20rem] cursor-pointer 
                ${selectedAddress?.id === item.id ? "bg-[#D2F4D6]" : ""}`}
                onClick={() => {
                  setLocation({ altitude:longitude , longtitude: latitude});
                  setSelectedAddress(item);
                }}
              >
                <FaMapMarkerAlt />
                <div>
                  <div>{item.address_line_1}, {item.address_line_2}</div>
                  <div>{item.city}, {item.country}</div>
                </div>
              </div>
            ))}
            {address.length > 4 && (
              <button 
                onClick={() => setShowAllAddresses(!showAllAddresses)}
                className="flex items-center justify-center border-2 border-dashed border-[#95CF9C] p-3 rounded-lg max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px] w-[8rem] tablet:w-[20rem]"
              >
                {showAllAddresses ? 'Show Less' : `+${address.length - 4} More`}
              </button>
            )}
          </div>

          {selectedAddress && (
            <div className="mt-4">
              <img src="/Asset/orderlocation.png" alt="Map Location" className="max-tablet:w-full laptop:w-[30rem] h-auto max-laptop:mx-auto" />
            </div>
          )}

          <div className="flex items-center gap-5">
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

          <div className="max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]">
            <div>Any Note for us?</div>
            <textarea 
              rows="3" 
              className="border-2 border-[#808080] rounded-lg w-1/2 p-2" 
              placeholder="Write your message..." 
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        <BillingDetails 
          cartdata={cartdata}
          groupedCart={groupedCart}
          handleQuantityChange={handleQuantityChange}
          itemTotal={itemTotal}
          deliveryFee={deliveryFee}
          taxesAndCharges={taxesAndCharges}
          discount={discount}
          discountAmount={discountAmount}
          finalTotal={finalTotal}
          handleProceedToPayment={handleProceedToPayment}
        />
      </div>
    </div>
  );
};

export default OldCheckout;
