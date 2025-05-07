import React from 'react';
import { FiPlus, FiMinus } from "react-icons/fi";
import ProductPrice from "../ProductPrice";
import { useDispatch } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { removeFromCart } from "../../Redux/CartSlice";

const BillingDetails = ({
  cartdata,
  groupedCart,
  handleQuantityChange,
  itemTotal,
  deliveryFee,
  taxesAndCharges,
  discount,
  discountAmount,
  finalTotal,
  handleProceedToPayment
}) => {
  const dispatch = useDispatch();
    // console.log(groupedCart,cartdata);
    const groupedByVendor = cartdata.reduce((acc, item) => {
      const vendor = item.VendorName;
      if (!acc[vendor]) {
        acc[vendor] = [];
      }
      acc[vendor].push(item);
      return acc;
    }, {});
    
    
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm max-tablet:w-full laptop:w-1/4">
      <h2 className="font-semibold max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px] mb-4">Order Summary</h2>

      {Object.entries(groupedByVendor).map(([VendorName, items]) => (
        <div key={VendorName} className="mb-4">
          <h3 className="font-medium max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px] mb-2">{VendorName}</h3>
          {items.map((item) => (
            <div key={item.productId} className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                <div>
                  <p className="max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]">{item.name}</p>
                  <ProductPrice price={item.price} className="text-sm" />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                  className="p-1 rounded-full bg-gray-100"
                  disabled={item.quantity <= 1}
                >
                  <FiMinus className="max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]" />
                </button>
                <span className="max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                  className="p-1 rounded-full bg-gray-100"
                >
                  <FiPlus className="max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]" />
                </button>
                {/* <button
                  onClick={() => dispatch(removeFromCart(item.productId))}
                  className="text-red-500 max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]"
                >
                  <AiOutlineDelete />
                </button> */}
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="border-t pt-4 space-y-2">
        <div className="flex justify-between max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]">
          <span>Item Total</span>
          <ProductPrice price={itemTotal} />
        </div>
        <div className="flex justify-between max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]">
          <span>Delivery Fee</span>
          <ProductPrice price={deliveryFee} />
        </div>
        <div className="flex justify-between max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]">
          <span>Taxes and Charges</span>
          <ProductPrice price={taxesAndCharges} />
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600 max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]">
            <span>Discount ({discount}%)</span>
            <span>-₹{discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]">
          <span>Total</span>
          <ProductPrice price={finalTotal} />
        </div>
      </div>

      <button
        onClick={handleProceedToPayment}
        className="w-full mt-4 bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition-colors max-tablet:text-[8px] tablet:text-[12px] laptop:text-[16px]"
      >
        Proceed to Payment
      </button>
    </div>
  );
};

export default BillingDetails;
