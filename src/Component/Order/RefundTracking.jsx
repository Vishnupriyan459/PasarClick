import React from "react";
import { CheckCircle2, Loader, AlertTriangle, XCircle } from "lucide-react";

const RefundTracking = ({data, refundStatus, refundDate, failureReason, evidence, is_canceled }) => {
  const refundStatuses = [
    "Pending Verification",
    "Refund Processing",
    "Refunded",
  ];

  // Normalize refund status to match the display statuses
  const statusMap = {
    "pending": 0,          // Pending Verification 
    "processing": 1,       // Refund Processing
    "refunded": 2,         // Refunded
    "failed": "failed",    // Special case
    "cancelled": "cancelled" // Special case
  };

  // Get the current step index based on the refund status
  const getCurrentIndex = () => {
    if (refundStatus === "failed") {
      // For failure, we set it to the previous status index before failure
      return 1; // Assuming failure happens after "Pending Verification"
    }
    
    if (refundStatus === "cancelled") {
      return 0; // For cancelled, we show it at "Pending Verification" step
    }
    
    return statusMap[refundStatus] || 0;
  };
  
  const currentIndex = getCurrentIndex();

  const getRefundStatusStyles = (status, index) => {
    // Determine if the step is active, completed, failed, or cancelled
    const isActive = index === currentIndex && refundStatus !== "failed" && refundStatus !== "cancelled";
    const isCompleted = index < currentIndex;
    const isFailed = refundStatus === "failed" && index === currentIndex;
    const isCancelled = refundStatus === "cancelled" && index === currentIndex;
    
    // Return styles based on step status
    if (isFailed) {
      return {
        borderColor: "border-red-500",
        bgColor: "bg-red-100",
        textColor: "text-red-500",
        icon: <AlertTriangle className="w-5 h-5" />,
      };
    }
    
    if (isCancelled) {
      return {
        borderColor: "border-amber-500",
        bgColor: "bg-amber-100",
        textColor: "text-amber-500",
        icon: <XCircle className="w-5 h-5" />,
      };
    }
    
    if (isCompleted || (isActive && status === "Refunded")) {
      return {
        borderColor: "border-green-500",
        bgColor: "bg-green-100",
        textColor: "text-green-500",
        icon: <CheckCircle2 className="w-5 h-5" />,
      };
    }
    
    if (isActive) {
      return {
        borderColor: "border-green-500",
        bgColor: "bg-green-100",
        textColor: "text-green-500",
        icon: <Loader className="w-5 h-5 animate-spin" />,
      };
    }
    
    // Default (inactive) style
    return {
      borderColor: "border-gray-300",
      bgColor: "bg-[#E8E8E8]",
      textColor: "text-gray-400 opacity-70",
      icon: <div className="w-4 h-4 rounded-full bg-[#E8E8E8]"></div>,
    };
  };

  // Modify display text for cancelled status
  const getStatusText = (status, index) => {
    if (refundStatus === "cancelled" && index === 0) {
      return "Cancelled";
    }
    return status;
  };

  return (
    <div className="w-full ">
      <div className="mb-4">
        <h3 className="font-[600] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">Order ID: <span className="font-[400] text-green-500">{data.orderID}</span></h3>
              {/* <p className="font-[600] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">Receiver: <span className="font-[400]">{order.Receiver_name}</span></p> */}
              
              {/* <p className="font-[600] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">
                Total: <span className="font-[400]">{order.Total} </span>
              </p> */}
              <p className="font-[600] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">Reason: <span className="font-[400]">{data.reason}</span></p>
              <img src={data.evidence} alt="" className="w-[60px] h-[60px] max-tablet:w-[180px] max-tablet:h-[160px] tablet:w-[250px] tablet:h-[220px]  laptop:w-[350px] laptop:h-[300px]"/>
              <div className="refund-section">
          <h4 className="font-[600] text-[1.1rem] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px] ">Refund Status</h4>
          
        </div>
        <div className="font-[400] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">
          Refund applied on {refundDate}
        </div>
        
        {refundStatus === "failed" && failureReason && (
          <p className="text-red-500 mt-2">
            Reason for failure: {failureReason}
          </p>
        )}
      </div>
      
      <div className="max-tablet:mt-12 max-tablet:w-full tablet:w-full laptop:w-[70%] Llaptop:w-[60%] laptop:mx-4 py-5 px-4">
        <div className="flex items-center">
          {refundStatuses.map((status, index) => {
            const { borderColor, bgColor, textColor, icon } = getRefundStatusStyles(status, index);
            const displayText = getStatusText(status, index);
            
            return (
              <div key={status} className="flex-1 flex flex-col items-center">
                {/* Circle wrapper with connector */}
                <div className="relative flex items-center justify-center w-full">
                  {/* Connector line before circle */}
                  {index > 0 && (
                    <div 
                      className={`absolute max-tablet:h-1 tablet:h-1.5 right-1/2 left-0 top-1/2 -translate-y-1/2 ${
                        index <= currentIndex && refundStatus !== "cancelled" && refundStatus !== "failed"
                          ? "bg-[#E5FAE6]"
                          : index === 1 && refundStatus === "failed"
                            ? "bg-[#E5FAE6]"
                            : "bg-[#E8E8E8]"
                      }`}
                    />
                  )}
                  
                  {/* Circle */}
                  <div
                    className={`relative z-10 flex items-center justify-center max-tablet:w-6 max-tablet:h-6 tablet:w-8 tablet:h-8 laptop:w-8 laptop:h-8 Llaptop:w-12 Llaptop:h-12 rounded-full border-2 ${borderColor} ${bgColor} ${textColor}`}
                  >
                    {icon}
                  </div>
                  
                  {/* Connector line after circle */}
                  {index < refundStatuses.length - 1 && (
                    <div 
                      className={`absolute max-tablet:h-1 tablet:h-1.5 left-1/2 right-0 top-1/2 -translate-y-1/2 ${
                        index < currentIndex && refundStatus !== "cancelled" && refundStatus !== "failed"
                          ? "bg-[#E5FAE6]"
                          : "bg-[#E8E8E8]"
                      }`}
                    />
                  )}
                </div>
                
                {/* Status text */}
                <span
                  className={`font-[600] max-tablet:text-[6px] max-tablet:leading-[10px] tablet:text-[10px] tablet:leading-[14px] laptop:text-[10px] laptop:leading-[18px] Llaptop:text-[12px] text-center mt-2 ${textColor}`}
                >
                  {displayText}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {refundStatus === "failed" && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-600 rounded max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">
          <p>
            We apologize, your refund could not be processed. Please{" "}
            <a href="/support" className="underline text-blue-600">
              contact customer support
            </a>{" "}
            for assistance or try again.
          </p>
        </div>
      )}
      
      {refundStatus === "cancelled" && (
        <div className="mt-4 p-4 bg-amber-100 border border-amber-400 text-amber-600 rounded max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">
          <p>
            This refund request has been cancelled. If you need further assistance,{" "}
            <a href="/support" className="underline text-blue-600">
              contact customer support
            </a>.
          </p>
        </div>
      )}
    </div>
  );
};

export default RefundTracking;