import React, { useState } from "react";
import { FaTruck } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { CiDeliveryTruck } from "react-icons/ci";
import ProductPrice from "../../ProductPrice";
import { formatDate } from "../../../utils/Dateconvertion";
import ProductList from "../Canceled/Productlist";
import CancellationDetails from "../Canceled/CancellationDetails";
import RefundStatus from "../Canceled/RefundStatus";
import ReorderItem from "../Canceled/ReorderItem";
import Trackorder from "./Trackorder";
import Feedback from "../../feedback/Feedback";
import Report from "../../feedback/Report";
import Returnitem from "./Returnitem";


const Received = (order) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(true); // State to toggle visibility
  const [isRotated, setIsRotated] = useState(false);
  const [isReceiverVisible, setIsReceiverVisible] = useState(false);
  const [isView, setIsView] = useState("productview");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false); 
  const[toggleFeedback,setToggleFeedback] = useState(false);

  const [activeModal, setActiveModal] = useState(null); // Manage which modal is open
  const [selectedOrder, setSelectedOrder] = useState(null); // Store selected order
  const [feedbackType, setFeedbackType] = useState(null);

   const handleOpenModal = (modalType, order, type ) => {
    setActiveModal(modalType);
    setSelectedOrder(order);
    if (modalType === "Feedback") {
      setFeedbackType(type); // Set feedback type if Feedback modal
    }
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    setSelectedOrder(null);
    setFeedbackType(null); // Reset feedback type
  };

  const handleToggle = () => {
    setIsDetailsVisible(!isDetailsVisible); // Toggle visibility
    setIsRotated(!isRotated); // Toggle icon rotation
  };

  const handleReceiverToggle = () => {
    setIsReceiverVisible(!isReceiverVisible); // Toggle receiver visibility
  };
  const Onclose=()=>{
    setIsFeedbackVisible(!isFeedbackVisible)
  }



  // Change view on button click
  const handleViewChange = (view) => {
    setIsView(view);
  };
  
  const handlefeedback = (item) => {
    setIsFeedbackVisible(!isFeedbackVisible)
    setFeedbackType(item);
  }

  // Conditional component rendering
  const renderComponent = () => {
    switch (isView) {
      case "productview":
        return <ProductList order={order} />;
      // case "CancellationDetails":
      //   return <CancellationDetails order={order} />;
      // case "RefundStatus":
      //   return <RefundStatus order={order.order} />;
      // case "ReorderItem":
      //   return <ReorderItem order={order} />;
      case "Trackorder":
        return (
          <Trackorder
          orderData={order.order}
          />
        );
      default:
        return null; // Return null for unsupported views previousState
    }
  };
  

  return (
    <div className=" max-tablet:rounded-2xl tablet:rounded-3xl w-full border bg-[#ffff] max-tablet:px-3 max-tablet:py-1 tablet:px-5 tablet:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center max-tablet:gap-2 tablet:gap-4 laptop:gap-6 py-2">
          <FaTruck className="max-Mmobile:text-[12px] max-tablet:text-[15px] tablet:text-[20px] laptop:text-[30px] text-[#D4D4D4]" />
          <div>
            <div className="font-[400] max-Mmobile:text-[7px]  max-tablet:text-[9px] max-tablet:leading-[10px] tablet:text-[10px] tablet:leading-[12px] laptop:text-[12px]  laptop:leading-[15px]">
              Delivering ID
            </div>
            <div className="font-[700] max-Mmobile: max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">
              {order.order.DeliveredID}
            </div>
          </div>
          <div className="px-4 py-1 flex items-center gap-1 max-tablet:px-2 max-tablet:py-1 laptop:px-8 laptop:py-2 rounded-full bg-[#D2F4D6] font-[400] max-tablet:text-[6px] tablet:text-[8px] tablet:leading-[12px] laptop:text-[14px] laptop:leading-[18px]">
            <CiDeliveryTruck className="text-[#000]" /> {order.order.Status}
          </div>
          <div className="max-Lmobile:hidden Lmobile:block">
            <div className="font-[400] text-[8px] leading-[10px] tablet:text-[12px] tablet:leading-[15px] ">
              Total
            </div>
            <div className="font-[500] text-[10px] leading-[12px] tablet:text-[14px] tablet:leading-[18px] ">
              <ProductPrice
                price={order.order.Total}
                currency={order.order.Currency}
              />
            </div>
          </div>
          <div className="max-Lmobile:hidden Lmobile:block">
            <div className="flex items-center gap-5">
              <div className="font-[400] text-[8px] leading-[10px] tablet:text-[12px] tablet:leading-[15px] ">
                Ship to
              </div>
              <FaAngleDown
                className={`transform transition-transform text-[5px] tablet:text-[7px] laptop:text-[12px] ${
                  isReceiverVisible ? "" : "-rotate-90"
                }`}
                onClick={handleReceiverToggle}
              />
            </div>
            {isReceiverVisible && (
              <div className="font-[500] text-[10px] leading-[12px] tablet:text-[14px] tablet:leading-[18px] ">
                {order.order.Receiver_name}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center tablet:gap-4 laptop:gap-1 Llaptop:gap-8" >
          <div className="px-4 py-1 laptop:px-8 laptop:py-2 rounded-full bg-[#F2EBD9] flex items-center justify-center gap-2 max-tablet:text-[6px] tablet:text-[8px] tablet:leading-[12px] laptop:text-[14px] laptop:leading-[18px]" onClick={()=>handleOpenModal("Report",order,null)}>
            <HiOutlineExclamationTriangle />
            <p>Report</p>
          </div>
          <FaAngleDown
            className={`transform transition-transform text-[7px] tablet:text-[10px] laptop:text-[20px] ${
              isRotated ? "-rotate-90" : ""
            }`}
            onClick={handleToggle}
          />
        </div>
      </div>
      {isDetailsVisible && (
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden py-3 max-h-[1000px] border-y-2 border-[#364A1580]/[.10]`}
        >
          <div className="flex items-start justify-between w-[100%]">
            <div className="w-[68%]">   
              {/* df */}
            <div className="max-tablet:space-y-1 tablet:space-y-2">
              <div
                className="font-[400]
                 max-tablet:text-[10px] max-tablet:leading-[12px] tablet:text-[15px] tablet:leading-[18px] laptop:text-[20px] laptop:leading-[26px] "
              >
                Received on {formatDate(order.order.ReceiveDate)}
              </div>
              <div className="max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">
                Package was handed to resident
              </div>

            </div>
            {renderComponent()}
            
            </div>
            
              
              <div className="space-y-3">
              <div
                className="font-[400] max-tablet:w-[87px] max-tablet:h-[16px] tablet:w-[160px] tablet:h-[26px] laptop:w-[183px] laptop:h-[36px]  max-tablet:text-[6px] max-tablet:leading-[8px]  tablet:text-[10px] tablet:leading-[14px]  laptop:text-[12px] laptop:leading-[15px] flex justify-center items-center rounded-full border-opacity-50 border-[0.5px] border-[#364A15] cursor-pointer"
                onClick={() => handleViewChange("Trackorder")}
              >
                Track Package
              </div>
              <div
                className="font-[400] max-tablet:w-[87px] max-tablet:h-[16px] tablet:w-[160px] tablet:h-[26px] laptop:w-[183px] laptop:h-[36px]  max-tablet:text-[6px] max-tablet:leading-[8px]  tablet:text-[10px] tablet:leading-[14px]  laptop:text-[12px] laptop:leading-[15px] flex justify-center items-center rounded-full border-opacity-50 border-[0.5px] border-[#364A15] cursor-pointer"
                onClick={() => handleViewChange("productview")}
              >
                View Product
              </div>
              <div
                className="font-[400] max-tablet:w-[87px] max-tablet:h-[16px] tablet:w-[160px] tablet:h-[26px] laptop:w-[183px] laptop:h-[36px]  max-tablet:text-[6px] max-tablet:leading-[8px]  tablet:text-[10px] tablet:leading-[14px]  laptop:text-[12px] laptop:leading-[15px] flex justify-center items-center rounded-full border-opacity-50 border-[0.5px] border-[#364A15] cursor-pointer"
                onClick={()=>handleOpenModal("ReturnItem",order,null)}
              >
                Return items
              </div>
              <div
                className="font-[400] max-tablet:w-[87px] max-tablet:h-[16px] tablet:w-[160px] tablet:h-[26px] laptop:w-[183px] laptop:h-[36px]  max-tablet:text-[6px] max-tablet:leading-[8px]  tablet:text-[10px] tablet:leading-[14px]  laptop:text-[12px] laptop:leading-[15px] flex justify-center items-center rounded-full border-opacity-50 border-[0.5px] border-[#364A15] cursor-pointer"
                onClick={() => handleOpenModal("Feedback", order,"seller Feedback")}
              >
                Leave seller feedback
              </div>
              <div
                className="font-[400] max-tablet:w-[87px] max-tablet:h-[16px] tablet:w-[160px] tablet:h-[26px] laptop:w-[183px] laptop:h-[36px]  max-tablet:text-[6px] max-tablet:leading-[8px]  tablet:text-[10px] tablet:leading-[14px]  laptop:text-[12px] laptop:leading-[15px] flex justify-center items-center rounded-full border-opacity-50 border-[0.5px] border-[#364A15] cursor-pointer"
                onClick={() => handleOpenModal("Feedback", order,"delivery Feedback")}
              >
                Leave delivery feedback
              </div>
              <div
                className="font-[400] max-tablet:w-[87px] max-tablet:h-[16px] tablet:w-[160px] tablet:h-[26px] laptop:w-[183px] laptop:h-[36px]  max-tablet:text-[6px] max-tablet:leading-[8px]  tablet:text-[10px] tablet:leading-[14px]  laptop:text-[12px] laptop:leading-[15px] flex justify-center items-center rounded-full border-opacity-50 border-[0.5px] border-[#364A15] cursor-pointer"
                onClick={() => handleOpenModal("Feedback", order,"product Feedback")}
              >
                Write a product review
              </div>
            </div>
            
            
          </div>
          {/* <div className="flex justify-between w-[98%]">
            {renderComponent()}
            <ReorderItem
              isOpen={isModalOpen} // Control visibility
              onRequestClose={() => setIsModalOpen(false)} // Close modal
              products={order.order.Product_detail} // Pass products to the modal
            />

            <div className="space-y-3">
              <div
                className="font-[400] max-tablet:w-[87px] max-tablet:h-[16px] tablet:w-[160px] tablet:h-[26px] laptop:w-[183px] laptop:h-[36px]  max-tablet:text-[6px] max-tablet:leading-[8px]  tablet:text-[10px] tablet:leading-[14px]  laptop:text-[12px] laptop:leading-[15px] flex justify-center items-center rounded-full border-opacity-50 border-[0.5px] border-[#364A15] cursor-pointer"
                onClick={() => handleViewChange("productview")}
              >
                View Product
              </div>
              <div
                className="font-[400] max-tablet:w-[87px] max-tablet:h-[16px] tablet:w-[160px] tablet:h-[26px] laptop:w-[183px] laptop:h-[36px]  max-tablet:text-[6px] max-tablet:leading-[8px]  tablet:text-[10px] tablet:leading-[14px]  laptop:text-[12px] laptop:leading-[15px] flex justify-center items-center rounded-full border-opacity-50 border-[0.5px] border-[#364A15] cursor-pointer"
                onClick={() => handleViewChange("RefundStatus")}
              >
                Return items
              </div>
              <div
                className="font-[400] max-tablet:w-[87px] max-tablet:h-[16px] tablet:w-[160px] tablet:h-[26px] laptop:w-[183px] laptop:h-[36px]  max-tablet:text-[6px] max-tablet:leading-[8px]  tablet:text-[10px] tablet:leading-[14px]  laptop:text-[12px] laptop:leading-[15px] flex justify-center items-center rounded-full border-opacity-50 border-[0.5px] border-[#364A15] cursor-pointer"
                onClick={() => handleViewChange("RefundStatus")}
              >
                Leave seller feedback
              </div>
              <div
                className="font-[400] max-tablet:w-[87px] max-tablet:h-[16px] tablet:w-[160px] tablet:h-[26px] laptop:w-[183px] laptop:h-[36px]  max-tablet:text-[6px] max-tablet:leading-[8px]  tablet:text-[10px] tablet:leading-[14px]  laptop:text-[12px] laptop:leading-[15px] flex justify-center items-center rounded-full border-opacity-50 border-[0.5px] border-[#364A15] cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                Leave delivery feedback
              </div>
              <div
                className="font-[400] max-tablet:w-[87px] max-tablet:h-[16px] tablet:w-[160px] tablet:h-[26px] laptop:w-[183px] laptop:h-[36px]  max-tablet:text-[6px] max-tablet:leading-[8px]  tablet:text-[10px] tablet:leading-[14px]  laptop:text-[12px] laptop:leading-[15px] flex justify-center items-center rounded-full border-opacity-50 border-[0.5px] border-[#364A15] cursor-pointer"
                onClick={() => handleViewChange("CancellationDetails")}
              >
                Write a product review
              </div>
            </div>
          </div> */}
          {isFeedbackVisible && <Feedback onClose={Onclose}  feedback={feedbackType} order={order.order} />}
        </div>
      )}
      {isDetailsVisible && (
        <div className="flex mt-[10px]">
          <div className="max-tablet:p-[6px] tablet:p-[10px] flex justify-center items-center  underline decoration-[#364A15] border-[#364A1580] max-tablet:space-y-3 tablet:space-y-4 max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">
            Archive order
          </div>
          
        </div>
      )}
      {activeModal === "Report" && selectedOrder && (
        <Report onClose={handleCloseModal} Report="Missed delivery" order={selectedOrder} />
      )}
      {activeModal === "ReturnItem" && selectedOrder && (
        <Returnitem onClose={handleCloseModal} order={selectedOrder} />
      )}
      {activeModal === "Feedback" && selectedOrder && feedbackType && (
        <Feedback
          onClose={handleCloseModal}
          order={selectedOrder}
          feedback={feedbackType} // Pass feedback type to Feedback modal
        />
      )}
    </div>
  );
};




export default Received