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
import { CreditDebitPayment, PayPalPayment, NetBankingPayment } from "./Paymentmethod";


// Checkout Page Component
function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);
  const [showCardOptions, setShowCardOptions] = useState(false);
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart.items);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("IN"); // Default to India

  // Function to validate length
  const handleNumberChange = (value) => {
    // Remove non-numeric characters
    const numericValue = value ? value.replace(/\D/g, "") : "";

    // Limit between 7 and 15 digits
    if (numericValue.length >= 7 && numericValue.length <= 15) {
      setPhoneNumber(value);
    }
  }; // Default country code

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
    if (method === "credit-debit") {
      setShowCardOptions(true);
    } else {
      setShowCardOptions(false);
    }
  };
  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: "easeInOut" },
  };
  const renderPaymentComponent = () => {
    switch (paymentMethod) {
      case "credit-debit":
        return <CreditDebitPayment />;
      case "paypal":
        return <PayPalPayment />;
      case "bank":
        return <NetBankingPayment />;
      default:
        return <p className="text-gray-500">Please select a payment method.</p>;
    }
  };

  return (
    <div className="bg-cart_bg">
      <div
        className="container mx-auto px-4 py-6 "
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800">Checkout</h1>
          <p className="text-gray-600">
            Secure Checkout: Complete Your Order with Confidence
          </p>
        </div>

        <div className="flex max-laptop:flex-col laptop:flex-row gap-8 relative justify-around max-tablet:text-[8px]">
          {/* Background vegetable illustrations */}
          {/* <div className="absolute inset-0 overflow-hidden z-0 opacity-10 pointer-events-none">
          <img src="/api/placeholder/800/800" alt="Background vegetables" className="w-full h-full object-cover" />
        </div> */}

          {/* Billing Details */}
          <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-sm z-10">
            <h2 className="text-xl font-semibold text-green-800 mb-4 pb-2 border-b border-gray-200">
              Billing Details
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First name
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Surname
                </label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
            </div>
            

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name{" "}
                <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Region
              </label>
              <div className="relative">
                <select className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-green-500 focus:border-green-500 pr-8">
                  <option>Penang</option>
                  <option>Kuala Lumpur</option>
                  <option>Johor</option>
                  <option>Sabah</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street address
              </label>
              <input
                type="text"
                placeholder="House number and Street name"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 mb-2"
              />
              <input
                type="text"
                placeholder="Apartment, suite, units etc."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Town / City
              </label>
              <div className="relative">
                <select className="w-full p-2 border border-gray-300 rounded-md appearance-none focus:ring-green-500 focus:border-green-500 pr-8">
                  <option>Penang</option>
                  <option>George Town</option>
                  <option>Butterworth</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Postal code
              </label>
              <input
                type="text"
                placeholder="000000"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <div className="flex">
              <div className="relative">
                <select className="p-2 border border-gray-300 rounded-l-md appearance-none focus:ring-green-500 focus:border-green-500 bg-gray-50 pr-8 w-16">
                  <option>🇺🇸</option>
                  <option>🇲🇾</option>
                  <option>🇸🇬</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-1 pointer-events-none">
                  <svg className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              <input type="tel" placeholder="+60(000) 0000 0000" className="flex-1 p-2 border border-gray-300 border-l-0 rounded-r-md focus:ring-green-500 focus:border-green-500" />
            </div>
          </div> */}
          <div className="w-full mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile number
                </label>
                
                <PhoneInput
                  international
                  defaultCountry={selectedCountry}
                  value={phoneNumber}
                  onChange={handleNumberChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter phone number"
                />
               
                
              </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="abcdef@email.com"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <button className="mt-4 bg-green-100 hover:bg-green-200 text-green-800 px-4 py-2 rounded-full transition duration-300">
              Create a new account
            </button>
          </div>
          {/* <div  className='w-[1px] bg-black h-[120vh] opacity-50'></div> */}

          {/* Order Summary */}
          <div className="lg:w-1/2 bg-white p-6 rounded-lg shadow-sm z-10">
            <h2 className="text-xl font-semibold text-green-800 mb-4 pb-2 border-b border-gray-200">
              Your order
            </h2>

            <div className="mb-6">
              <div className="flex justify-between py-2 border-b border-gray-100 font-medium">
                <span>Product</span>
                <span>Price</span>
              </div>

              {cartData?.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between py-3 border-b border-gray-100"
                >
                  <span>{item.productName}</span>
                  <span>${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* <div className="mb-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4 pb-2 border-b border-gray-200">
                Payment method
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <button
                  onClick={() => handlePaymentMethodChange("cash")}
                  className={`p-3 border rounded-md text-center transition duration-300 ${
                    paymentMethod === "cash"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  Cash on delivery
                </button>
                 <button
                  onClick={() => handlePaymentMethodChange("check")}
                  className={`p-3 border rounded-md text-center transition duration-300 ${
                    paymentMethod === "check"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  Check payment
                </button>
                <button
                  onClick={() => handlePaymentMethodChange("credit-debit")}
                  className={`p-3 border rounded-md text-center transition duration-300 ${
                    paymentMethod === "credit-debit"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  Credit or Debit
                </button>
                <button
                  onClick={() => handlePaymentMethodChange("bank")}
                  className={`p-3 border rounded-md text-center transition duration-300 ${
                    paymentMethod === "bank"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  Net Banking
                </button>
                <button
                  onClick={() => handlePaymentMethodChange("paypal")}
                  className={`p-3 border rounded-md text-center transition duration-300 ${
                    paymentMethod === "paypal"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-green-500"
                  }`}
                >
                  Paypal
                </button>
              </div>

              {showCardOptions && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-4"
                >
                  <h4 className="text-md font-medium text-gray-700 mb-3">
                    Your saved card
                  </h4>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setSelectedCard("card1")}
                      className={`flex-1 p-4 border rounded-md transition duration-300 bg-green-50 ${
                        selectedCard === "card1"
                          ? "border-green-500 ring-2 ring-green-200"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-yellow-500 w-8 h-6 rounded-md mr-2"></div>
                          <span className="font-medium">Master Card</span>
                        </div>
                        <div>
                          <span>•••••••••••••••• 119</span>
                        </div>
                      </div>
                    </button>
                    <button
                      onClick={() => setSelectedCard("card2")}
                      className={`flex-1 p-4 border rounded-md transition duration-300 ${
                        selectedCard === "card2"
                          ? "border-green-500 ring-2 ring-green-200"
                          : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="bg-yellow-500 w-8 h-6 rounded-md mr-2"></div>
                          <span className="font-medium">Master Card</span>
                        </div>
                        <div>
                          <span>•••••••••••••••• 112</span>
                        </div>
                      </div>
                    </button>
                  </div>
                  <button className="mt-4 flex items-center text-gray-600 hover:text-green-600 transition duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Use other card
                  </button>
                  <div className="mt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Receive pickup notice on SMS/Email
                      </span>
                    </label>
                  </div>
                  <div className="mt-4 text-sm text-gray-600">
                    <p>
                      Your personal data will be used to process your order,
                      support your experience throughout this website, and for
                      other purposes described in our privacy policy.
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        I have read and agree to the website terms and
                        conditions
                      </span>
                    </label>
                  </div>
                </motion.div>
              )}
            </div> */}
                <div className="max-w-lg mx-auto bg-white p-6 ">
      <h2 className="text-xl font-semibold text-green-800 mb-4 pb-2 border-b border-gray-200">
        Payment Options
      </h2>

      {/* Payment Selection Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <button
          onClick={() => setPaymentMethod("credit-debit")}
          className={`p-3 border rounded-md transition duration-300 ${
            paymentMethod === "credit-debit" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-500"
          }`}
        >
          Credit/Debit
        </button>
        <button
          onClick={() => setPaymentMethod("paypal")}
          className={`p-3 border rounded-md transition duration-300 ${
            paymentMethod === "paypal" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-500"
          }`}
        >
          PayPal
        </button>
        <button
          onClick={() => setPaymentMethod("bank")}
          className={`p-3 border rounded-md transition duration-300 ${
            paymentMethod === "bank" ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-500"
          }`}
        >
          Net Banking
        </button>
      </div>

      {/* Load Selected Payment Component */}
      <div className="mt-4">{renderPaymentComponent()}</div>

      {/* Place Order Button */}
      <button
        disabled={!paymentMethod}
        className={`w-full mt-4 ${
          paymentMethod
            ? "bg-green-500 hover:bg-green-600 text-white"
            : "bg-green-100 text-gray-400 cursor-not-allowed"
        } font-medium py-3 px-4 rounded-full transition duration-300`}
      >
        Place Order
      </button>
    </div>

            {/* <button className="w-full bg-green-100 hover:bg-green-200 text-green-800 font-medium py-3 px-4 rounded-full transition duration-300">
              Place order
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
