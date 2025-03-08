import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaTruck } from "react-icons/fa";

import { fetchOrders, filterOrdersByTime, filterOrdersByState } from '../../Redux/OrderSlice';
import { logDOM } from '@testing-library/react';
const OrderDeliveryStatus = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => (state.order) || []);
  const loading = useSelector(state => state.order.loading||[]);
  const error = useSelector(state => state.order.error);
  const [activeOrder, setActiveOrder] = useState(null);
  const [expandedOrders, setExpandedOrders] = useState({});

  const toggleOrder = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };
  
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Filter orders to only show those with "Delivery" status
  const deliveryOrders = orders.items ? orders.items.filter(item => item.Status === "Delivery") : [];
  console.log(deliveryOrders.find(order => order.DeliveredID === activeOrder));
  
  
  const handleCancelConfirmation = (orderId) => {
    setActiveOrder(orderId);
  };
  
  const handleCancelOrder = () => {
    // Here you would dispatch an action to cancel the order
    console.log(`Cancelling order ${activeOrder}`);
    // dispatch(cancelOrder(activeOrder));
    setActiveOrder(null);
  };
  
  const handleCloseModal = () => {
    setActiveOrder(null);
  };

  // if (loading) return <div className="p-4 text-center">Loading orders...</div>;
  // if (error) return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  
  return (
    <div className="p-4  mx-auto">
      <h1 className="text-2xl font-bold mb-4">Orders in Delivery</h1>
      
      {deliveryOrders.length === 0 ? (
        <div className="text-center p-6 bg-gray-100 rounded-lg">
          No orders currently in delivery.
        </div>
      ) : (
        <div className="tablet:space-y-4 flex tablet:gap-3 justify-around items-start w-[90%] mx-auto max-tablet:flex-col ">
          <div className='space-y-2'>
          {deliveryOrders.map(order => (
            <div key={order.DeliveredID} className="border rounded-2xl p-4 bg-white shadow-sm border-[1px] border-[#1AC84B] ">
              <div className="flex justify-between items-center" onClick={() => toggleOrder(order.DeliveredID)}>
                <div className="flex items-center">
                  
                  {/* <div>
                    <h3 className="font-semibold">Delivering ID {order.DeliveredID}</h3>
                    
                  </div> */}
                  <div className="flex items-center max-tablet:gap-2 tablet:gap-2 laptop:gap-6 Llaptop:gap-8 py-2">
                            <FaTruck className="max-Mmobile:text-[12px] max-tablet:text-[15px] tablet:text-[20px] laptop:text-[30px] text-[#1AC84B]" />
                            <div>
                              <div className="font-[400] max-Mmobile:text-[7px]  max-tablet:text-[9px] max-tablet:leading-[10px] tablet:text-[10px] tablet:leading-[12px] laptop:text-[12px]  laptop:leading-[15px]">Delivering ID</div>
                              <div className=" font-[700] max-Mmobile: max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">{order.DeliveredID}</div>
                            </div>
                            <div className="px-4 py-1 max-tablet:px-2 max-tablet:py-1 laptop:px-8 laptop:py-2 rounded-full bg-[#DEF9EC] font-[400] max-tablet:text-[6px] tablet:text-[8px] tablet:leading-[12px] laptop:text-[14px] laptop:leading-[18px]">
                              {order.Status}
                            </div>
                   </div>
                </div>
                
                <button className="px-3 py-1 ">{!expandedOrders[order.DeliveredID] ? <MdOutlineKeyboardArrowDown className='text-[2rem] opacity-50 -rotate-90' /> : <MdOutlineKeyboardArrowDown  className='text-[2rem] opacity-50 rotate-0'/>}</button>
                
              </div>
              {expandedOrders[order.DeliveredID] && (
              <>
              <div className="mt-4 pt-3 border-t font-[400] max-Mmobile:text-[7px]  max-tablet:text-[9px] max-tablet:leading-[10px] tablet:text-[10px] tablet:leading-[12px] laptop:text-[12px]  laptop:leading-[15px]">
              <div className="text-sm text-gray-600">
                      Expected delivery: {order.Expected_delivery_date}
                    </div>
                <p className="text-sm font-medium mb-2">Order Summary:</p>
                <div className="mb-3">
                  {order.Product_detail.map((product, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <div className="w-8 h-8 bg-gray-100 rounded flex-shrink-0 flex items-center justify-center text-xs">
                        {product.productImg ? (
                          <img src={product.productImg} alt={product.productName} className="w-6 h-6" />
                        ) : (
                          product.categories?.charAt(0)
                        )}
                      </div>
                      <div className="ml-2 flex-1">
                        <p className="text-sm">{product.productName}</p>
                        <p className="text-xs text-gray-500">
                          {product.quantity} × {product.Currency} {product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total:</span>
                  <span className="font-bold">{order.Currency} {order.Total}</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Payment:</span>
                  <span>{order.paymentStatus} ({order.paymentMode})</span>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t font-[400] max-Mmobile:text-[7px]  max-tablet:text-[9px] max-tablet:leading-[10px] tablet:text-[10px] tablet:leading-[12px] laptop:text-[12px]  laptop:leading-[15px]">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">Recipient</p>
                    <p className="font-medium">{order.Receiver_name || 'Not assigned'}</p>
                    <p className="text-sm text-gray-600">{order.shipping_address}</p>
                    <div className='flex gap-4 opacity-70'>
                  <button className='text-[#02992C]'>Track order</button>
                    <button 
                  onClick={() => handleCancelConfirmation(order.DeliveredID)}
                  className=" "
                >
                  Cancel
                </button>
                </div>
                  </div>
                  <div className="ml-auto">
                    <button className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </button>
                  </div>
                </div>
                
              </div>
              </>)}
            </div>
          ))}
          
          
          </div>
          <div className=' h-[530px] '>
             <img src="Asset/map.svg" alt="" className='w-full h-full bg-cover'/>
          </div>
        </div>
      )}
      
      {/* Cancellation Confirmation Modal */}
      {activeOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-center text-green-800">Are you sure</h2>
            <p className="text-center mt-2 mb-4">You want to cancel the order?</p>
            
            {deliveryOrders.find(order => order.DeliveredID === activeOrder) && (
              <div className="border-t border-b py-4 my-4">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                  <div className="text-sm">
                    <p className="font-medium">
                      1 Shamelin Mall{/*address of owner*/ }
                    </p>
                    <p className="text-xs text-gray-500">
                    {deliveryOrders.shipping_address}{/*address of owner*/ }
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <div className="text-sm">
                    <p className="font-medium">
                     {deliveryOrders.find(order => order.DeliveredID === activeOrder).Receiver_name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {deliveryOrders.find(order => order.DeliveredID === activeOrder).shipping_address}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="flex items-center mt-3 border-t pt-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="font-medium">
                  {deliveryOrders.find(order => order.DeliveredID === activeOrder).Delivery_Partner}
                </p>
                <p className="text-sm text-gray-600">
                {deliveryOrders.find(order => order.DeliveredID === activeOrder).Delivery_Boy_Name}

                </p>
              </div>
              <button className="ml-auto w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
            </div>
            
            <div className="flex justify-between mt-6">
              <button
                onClick={handleCancelOrder}
                className="w-full py-2  text-gray-800 rounded-md mr-2 font-medium bg-[#DEF9EC]"
              >
                YES
              </button>
              <button
                onClick={handleCloseModal}
                className="w-full py-2 bg-gray-100 text-gray-800 rounded-md ml-2 font-medium"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
   
  );
};

export default OrderDeliveryStatus;