import React, { useState,useEffect } from "react";
import RefundTracking from "../RefundTracking";

const RefundStatus = ({ order }) => {
  const [Refundrequest, setRefundrequest] = useState(order.refundrequest);
  const [refundDate, setRefundDate] = useState(order.refundDate);
  useEffect(() => {
    
    
    if (order.refundState === "Refunded") {
      setRefundDate(`Refund recived at ${order.refundDate}`);
    }
    else if (order.refundState === "Failed") {
      setRefundDate(`Refund failed at ${order.refundDate}`);
    }
    else if (order.refundState === "Pending Verification"||order.refundState==="Refund Processing") {
      setRefundDate(`Expected date for refund at ${order.refundDate} `);
    }
    else{
      setRefundDate(`Refund is in ${order.refundDate} `);
    }
  }, [order]);
  // Function to handle refund application
  const applyRefund = () => {
    if (order.paymentMode === "CashOnDelivery") {
      alert("Refunds are not applicable for Cash on Delivery orders.");
      return;
    }

    // Simulate a refund process (e.g., API call)
    setRefundrequest("Refund Issued"); // Update the status
    // Update backend or database here if necessary
  };

  return (
    <div className="refund-status  max-tablet:w-[100vw] tablet:w-[60vw] laptop:w-[70vw] Llaptop:w-[80vw] space-y-2">
      <h3 className="font-[600] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">Order ID: <span className="font-[400] text-green-500">{order.DeliveredID}</span></h3>
      <p className="font-[600] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">Receiver: <span className="font-[400]">{order.Receiver_name}</span></p>
      
      <p className="font-[600] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">
        Total: <span className="font-[400]">{order.Total} {order.Currency}</span>
      </p>
      <p className="font-[600] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">Payment Method: <span className="font-[400]">{order.paymentMode}</span></p>

      <div className="refund-section">
        <h4 className="font-[600] text-[1.1rem] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px] ">Refund Status</h4>
        {order.refund === "Applicable" ? (
          Refundrequest === "Not Applied" ? (
            <>
              <p className="">You can apply for a refund.</p>
              <button
                className="max-tablet:w-[110px] max-tablet:h-[30px] tablet:w-[130px] tablet:h-[35px] laptop:w-[152px] laptop:h-[40px] Llaptop:w-[162px] Llaptop:h-[49px] bg-[#D2F4D6] rounded-full flex items-center justify-center border-[1px] hover:border-[#364A15] max-tablet:text-[7.5px] tablet:text-[8px] laptop:text-[11px] Llaptop:text-[16px] font-[400]"
                onClick={applyRefund}
              >
                Apply Refund
              </button>
            </>
          ) : (
            <>
              
              <RefundTracking
                refundStatus={order.refundState}
                refundDate={refundDate}
                
                previousRefundState={order.previousRefundState}

              />
              {/* add failureReason="Payment method declined" if the payment failed */}
            </>
          )
        ) : (
          <p className="mt-4 py-5 px-4 w-3/4 mx-auto bg-red-100 border border-red-400 text-red-600 rounded text-center  max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">No refund is applicable for this order.</p>
        )}
      </div>
    </div>
  );
};

export default RefundStatus;
