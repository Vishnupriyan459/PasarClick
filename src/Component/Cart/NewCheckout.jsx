import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import BillingDetails from "./BillingDetails";
import { updateQuantity } from "../../Redux/CartSlice";
import { placeOrder } from "./OldCheckout";
import Swal from "sweetalert2";

function NewCheckout({ latitude, longitude }) {
  const dispatch = useDispatch();
  const cartdata = useSelector((state) => state.cart.items);
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [formData, setFormData] = useState({
    fullName: '',
    surname: '',
    addressLine1: '',
    addressLine2: '', 
    city: '',
    postalCode: '',
    phoneNumber: '',
    country: '',
    email: '',
    state: ''
  });
  const token = localStorage.getItem('access');
  
  const groupedCart = cartdata.reduce((acc, item) => {
    if (!acc[item.VendorName]) {
      acc[item.VendorName] = [];
    }
    acc[item.VendorName].push(item);
    return acc;
  }, {});
  console.log(cartdata);
  
  const itemTotal = cartdata.reduce((total, item) => total + item.price * item.quantity, 0);
  const deliveryFee = 50;
  const taxesAndCharges = 18;
  const discountAmount = (itemTotal * discount) / 100;
  const finalTotal = itemTotal - discountAmount + deliveryFee + taxesAndCharges;

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  const applyCoupon = () => {
    if (coupon === "SAVE20") {
      setDiscount(20);
    } else {
      alert("Invalid Coupon");
    }
  };

  const handleProceedToPayment = async () => {
    if (!formData.addressLine1) {
      alert("Please fill in delivery address before proceeding.");
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
        billing_address: `${formData.addressLine1}, ${formData.addressLine2}, ${formData.city}, ${formData.state}, ${formData.country}`,
        phone: formData.phoneNumber,
        contact_email: formData.email,
      },
      lat: latitude,
      lon: longitude
    };

    try {
      const response = await placeOrder(orderPayload);
      alert("Order placed successfully!");
      console.log(response);
    } catch (err) {
      alert("Order failed. Please try again.");
    }
  };

  const [selectedCountry, setSelectedCountry] = useState("IN");
  const API_URL = process.env.REACT_APP_API_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (value) => {
    const numericValue = value ? value.replace(/\D/g, "") : "";
    if (numericValue.length >= 7 && numericValue.length <= 15) {
      setFormData(prev => ({
        ...prev,
        phoneNumber: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['fullName', 'surname', 'addressLine1', 'city', 'country', 'postalCode', 'phoneNumber', 'email','state'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      // Update profile
      const profileResponse = await fetch(`${API_URL}/customers/profile/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: formData.fullName+" "+formData.surname,

          contact_number: formData.phoneNumber,
          email: formData.email
        })
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to update profile');
      }

      // Update address
      const addressResponse = await fetch(`${API_URL}/customers/address/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          address_line_1: formData.addressLine1,
          address_line_2: formData.addressLine2,
          city: formData.city,
          postal_code: formData.postalCode,
          country: formData.country,
          state: formData.state
        })
      });

      if (addressResponse.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Address updated successfully',
          confirmButtonColor: '#4CAF50'
        });
      }

      if (!addressResponse.ok) {
        throw new Error('Failed to update address');
      }

    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  return (
    <div className="bg-cart_bg">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800">Checkout</h1>
          <p className="text-gray-600">
            Secure Checkout: Complete Your Order with Confidence
          </p>
        </div>

        <div className="flex max-laptop:flex-col laptop:flex-row gap-8 relative justify-around max-tablet:text-[8px]">
          <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-sm z-10">
            <h2 className="text-xl font-semibold text-green-800 mb-4 pb-2 border-b border-gray-200">
              Billing Details
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Surname *
                  </label>
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Street address *
                </label>
                <input
                  type="text"
                  name="addressLine1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  required
                  placeholder="House number and Street name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 mb-2"
                />
                <input
                  type="text"
                  name="addressLine2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  placeholder="Apartment, suite, units etc. (optional)"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Town / City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State / Province *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your state"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your country"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Postal code *
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  required
                  placeholder="000000"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="w-full mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile number *
                </label>
                <PhoneInput
                  international
                  defaultCountry={selectedCountry}
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter phone number"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  />
                  <button
                    type="button"
                    onClick={applyCoupon}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition duration-300"
                  >
                    Apply
                  </button>
                </div>
              </div>

              <button 
                type="submit"
                className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300">
                Save Details
              </button>
            </form>
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
    </div>
  );
}

export default NewCheckout;
