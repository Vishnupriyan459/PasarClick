import React, { useEffect } from 'react';
import {  useSelector } from 'react-redux';

import ProductPrice from '../ProductPrice'; // make sure you have this component
import { PlusIcon } from 'lucide-react'; // if you're using Lucide
import { Link } from 'react-router-dom';

const Cart = () => {
   

    
    // Assuming your cart data is under orders.cart or similar
    const cartData = useSelector((state) => state.cart?.items ||[]);// <- adjust path based on your store
  
 
  return (
    <div className="mb-8">
              <div className="flex justify-between mb-4">
                <h3 className="text-lg font-semibold">Your cart</h3>
               
              </div>
              <div className="space-y-4 bg-white p-6 border-2   rounded-lg h-auto">
                {cartData.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <img
                        src={item.productImg}
                        alt={item.productName}
                        className="w-12 h-12 rounded-lg"
                      />
                      <p className="text-gray-600">x {item.quantity}</p>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.productName}</p>
                    </div>

                    <ProductPrice
                      price={item.price}
                      currency={"inr"}
                      className="font-medium"
                    />
                  </div>
                ))}

                {!cartData.length ? (
                  <>
                    <div>"Your cart is empty"</div>
                    <Link
                      to="/Home/Shop"
                      className="text-gray-600 p-3 flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-200 rounded-lg"
                    >
                      <PlusIcon size={20} />
                      Add items
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/Home/cart"
                    className="text-gray-600 p-3 flex items-center justify-center gap-2 w-full border-2 border-dashed border-gray-200 rounded-lg"
                  >
                    <PlusIcon size={20} />
                    Edit items
                  </Link>
                )}
              </div>
            </div>
  )
}

export default Cart