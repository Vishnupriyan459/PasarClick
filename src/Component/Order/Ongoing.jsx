import React, { useState } from "react";
import { FaTruck } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { CiDeliveryTruck } from "react-icons/ci";
import RankBasedProduct from "../home/RankBasedProduct";
import Report from "../feedback/Report";
import ProductPrice from "../ProductPrice";
import StatusTracker from "./StatusTracker";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = process.env.REACT_APP_API_URL;

const Ongoing = (order) => {
  
  const [isDetailsVisible, setIsDetailsVisible] = useState(true); // State to toggle visibility
  const [isRotated, setIsRotated] = useState(false); // State to toggle rotation of the icon
  const [showAllProducts, setShowAllProducts] = useState(false); // State to show all products
  const [showReportModal, setShowReportModal] = useState(false);

  const extraProductsCount = Math.max(0, order.order.items.length - 2);

  const handleCancelOrder = async () => {
    try {
      const token = localStorage.getItem('access');
      await axios.post(`${API_URL}/orders/cancel-order/${order.order.id}/`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Order Cancelled',
        text: 'Your order has been cancelled successfully',
        timer: 1500,
        showConfirmButton: false
      });

      // Optionally refresh the page or update the order status
      window.location.reload();

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to cancel order. Please try again.',
      });
      console.error('Error cancelling order:', error);
    }
  };

  const handleReportClick = () => {
    setShowReportModal(true);
  };
  
  const handleCloseReport = () => {
    setShowReportModal(false);
  };
  
  // Toggle the visibility and rotation
  const handleToggle = () => {
    setIsDetailsVisible(!isDetailsVisible); // Toggle visibility
    setIsRotated(!isRotated); // Toggle icon rotation
  };

  return (
    <div className="max-tablet:rounded-2xl tablet:rounded-3xl w-full border bg-[#ffff] max-tablet:px-3 max-tablet:py-1 tablet:px-5 tablet:py-4">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center max-tablet:gap-2 tablet:gap-4 laptop:gap-8 py-2">
          <FaTruck className="max-Mmobile:text-[12px] max-tablet:text-[15px] tablet:text-[20px] laptop:text-[30px] text-[#1AC84B]" />
          <div>
            <div className="font-[400] max-Mmobile:text-[7px]  max-tablet:text-[9px] max-tablet:leading-[10px] tablet:text-[10px] tablet:leading-[12px] laptop:text-[12px]  laptop:leading-[15px]">Delivering ID</div>
            <div className=" font-[700] max-Mmobile: max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">#{order.order.id}</div>
          </div>
          
        </div>
        <div className="flex items-center tablet:gap-4 laptop:gap-8">
          {/* <div  onClick={handleReportClick} className="px-4 py-1 laptop:px-8 laptop:py-2 rounded-full bg-[#F2EBD9] flex items-center justify-center gap-2 max-tablet:text-[6px] tablet:text-[8px] tablet:leading-[12px] laptop:text-[14px] laptop:leading-[18px]">
            <HiOutlineExclamationTriangle />
            <p>Report</p>
          </div> */}
          <div className="px-4 py-1 max-tablet:px-2 max-tablet:py-1 laptop:px-8 laptop:py-2 rounded-full bg-[#DEF9EC] font-[400] max-tablet:text-[6px] tablet:text-[8px] tablet:leading-[12px] laptop:text-[14px] laptop:leading-[18px] flex gap-1">
            {/* {order.order.status.charAt(0).toUpperCase() + order.order.status.slice(1)} */}
            <CiDeliveryTruck />Ongoing
          </div>
          <FaAngleDown
            className={`transform transition-transform tablet:text-[10px] laptop:text-[20px] ${
              isRotated ? "rotate-[-90deg] " : ""
            }`}
            onClick={handleToggle} // Handle click to toggle visibility and rotation
          />
        </div>
      </div>
            
      {/* Conditional Rendering of Details Section */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden max-h-[${
          isDetailsVisible ? "1000px" : "0px"
        }]`}
      >
        {isDetailsVisible && (
          <div className="flex max-tablet:flex-col w-full gap-[5%] text-[#364A15]">
            {/* Left Section */}
            <div className="tablet:border-r-2 tablet:w-[70%]">
              <div className="border-y-2 mx-2 py-4 space-y-1 laptop:space-y-2">
                <h1 className="font-[400]
                 max-tablet:text-[10px] max-tablet:leading-[12px] tablet:text-[15px] tablet:leading-[18px] laptop:text-[20px] laptop:leading-[26px]">Shipping information</h1>
                {/* <p className="max-tablet:text-[10px] max-tablet:leading-[11px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">{order.order.Receiver_name}</p> */}
                <div className="max-tablet:text-[10px] max-tablet:leading-[11px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">{order.order.billing_info.billing_address
                }</div>
              </div>
              <div>
                <h1 className="font-[400] max-tablet:text-[12px] max-tablet:leading-[15px] tablet:text-[15px] tablet:leading-[18px] laptop:text-[20px] laptop:leading-[26px] text-[#364A15]">Status</h1>
                <div>
                  <StatusTracker status={order.order.status} className="" />
                </div>
              </div>
              {/* <div className="font-[400] max-tablet:text-[10px] max-tablet:leading-[12px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">
                Expected delivery:{" "}
                <span className="text-[#1AC84B] max-table:text-[12px] max-table:leading-[15px] tablet:text-[16px] tablet:leading-[19px] laptop:text-[18px] laptop:leading-[23px]">
                  {order.order.Expected_delivery_date}
                </span>
              </div> */}
              <div className="rounded-2xl w-[95%] max-tablet:h-[60px] tablet:h-[79px] laptop:h-[104px] bg-Location group">
                <div className="w-full h-full flex justify-center items-center cursor-pointer rounded-2xl group-hover:bg-gray-300 group-hover:bg-opacity-30">
                  <div className="rounded-xl max-tablet:p-2 tablet:p-3 laptop:p-4 bg-white max-tablet:text-[7px] tablet:text-[10px] laptop:text-[12px] font-[400]">
                    Click to track in real-time
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="tablet:w-[30%] flex flex-col justify-between">
              <div className="space-y-3">
                <div className=" font-[400]  max-tablet:text-[10px] max-tablet:leading-[12px] tablet:text-[15px] tablet:leading-[18px] laptop:text-[20px] laptop:leading-[26px]">Items</div>
                {/* Display first two products */}
                {order.order.items.slice(0, 2).map((product, index) => (
                  <div
                  className="flex gap-1 items-center"
                  key={`extra-${index}`}
                >
                  <div className="w-3/4 max-tablet:w-[60px] max-tablet:h-[60px] tablet:w-[80px] tablet:h-[80px] laptop:w-[90px] laptop:h-[90px] Llaptop:w-[100px] Llaptop:h-[100px] rounded-2xl">
                    <img
                      src={product.image}
                      alt="items_img"
                      className="w-full h-full bg-cover"
                    />
                  </div>
                  <div className="font-[400] w-1/2 text-[#364A15]  flex flex-col space-y-4">
                    <div className="max-tablet:text-[10px] max-tablet:leading-[12px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[16px] Llaptop:text-[16px] Llaptop:leading-[18px]">{product.name}</div>
                    <div className="max-tablet:text-[12px] max-tablet:leading-[14px] tablet:text-[14px] tablet:leading-[14px] laptop:text-[16px] laptop:leading-[16px] Llaptop:text-[18px] Llaptop:leading-[20px]">
                      <ProductPrice
                        price={product.price}
                        
                      />
                    </div>
                  </div>
                </div>

                ))}

                {/* Show more or show less logic */}
                {extraProductsCount > 0 && !showAllProducts && (
                  <div
                    onClick={() => setShowAllProducts(true)} // Show all products
                    className="text-end text-gray-500 mt-2 mx-3 hover:text-[#1AC84B] cursor-pointer max-tablet:text-[8px] max-tablet:leading-[12px] tablet:text-[10px] tablet:leading-[14px] laptop:text-[12px] laptop:leading-[16px] Llaptop:text-[14px] Llaptop:leading-[18px]"
                  >
                    +{extraProductsCount} more
                  </div>
                )}

                {showAllProducts &&
                  order.order.items.slice(0,2).map((product, index) => (
                    <div
                      className="flex gap-1 items-center"
                      key={`extra-${index}`}
                    >
                            <div className="w-3/4 max-tablet:w-[60px] max-tablet:h-[60px] tablet:w-[80px] tablet:h-[80px] laptop:w-[90px] laptop:h-[90px] Llaptop:w-[100px] Llaptop:h-[100px] rounded-2xl">
                    <img
                      src={product.image}
                      alt="items_img"
                      className="w-full h-full bg-cover"
                    />
                  </div>
                  <div className="font-[400] w-1/2 text-[#364A15]  flex flex-col space-y-5">
                    <div className="max-tablet:text-[10px] max-tablet:leading-[12px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[16px] Llaptop:text-[16px] Llaptop:leading-[18px]">{product.productName}</div>
                    <div className="max-tablet:text-[12px] max-tablet:leading-[14px] tablet:text-[14px] tablet:leading-[14px] laptop:text-[16px] laptop:leading-[16px] Llaptop:text-[18px] Llaptop:leading-[20px]">
                      <ProductPrice
                        price={product.price}
                       
                      />
                    </div>
                  </div>
                    </div>
                  ))}

                {/* Show less button */}
                {showAllProducts && (
                  <div
                    onClick={() => setShowAllProducts(false)} // Hide additional products
                    className="text-end text-gray-500 mt-2 mx-3 hover:text-[#1AC84B] cursor-pointer max-tablet:text-[8px] max-tablet:leading-[12px] tablet:text-[10px] tablet:leading-[14px] laptop:text-[12px] laptop:leading-[16px] Llaptop:text-[14px] Llaptop:leading-[18px]"
                  >
                    Show less
                  </div>
                )}
              </div>

              <div className="flex  gap-2 tablet:justify-end items-center pt-1">
                <div onClick={handleCancelOrder} className="max-tablet:w-[110px] max-tablet:h-[30px] tablet:w-[130px] tablet:h-[35px]  laptop:w-[152px] laptop:h-[40px] Llaptop:w-[162px] Llaptop:h-[49px] bg-[#F2EBD9] rounded-full flex items-center justify-center max-tablet:text-[7.5px] tablet:text-[8px] laptop:text-[11px] Llaptop:text-[16px] font-[400] cursor-pointer hover:bg-[#e5d9bd]">
                  Cancel order
                </div>
                {/* <div className="max-tablet:w-[110px] max-tablet:h-[30px] tablet:w-[130px] tablet:h-[35px] laptop:w-[152px] laptop:h-[40px] Llaptop:w-[162px] Llaptop:h-[49px] bg-[#D2F4D6] rounded-full flex items-center justify-center border-[1px] border-[#364A15] max-tablet:text-[7.5px] tablet:text-[8px] laptop:text-[11px] Llaptop:text-[16px] font-[400]">
                  Confirm Receipt
                </div> */}
              </div>
            </div>
          </div>
        )}
      </div>

      {showReportModal && <Report onClose={handleCloseReport} order={order} />}

    </div>
  );
};

export default Ongoing;
