import React from "react";
import { CheckCircle2, Loader, AlertTriangle } from "lucide-react";

const RefundTracking = ({ refundStatus, refundDate, failureReason, previousRefundState }) => {
  const refundStatuses = [
    "Pending Verification",
    "Refund Processing",
    "Refunded",
  ];

  const currentIndex = refundStatuses.indexOf(refundStatus);
  const previousIndex = refundStatuses.indexOf(previousRefundState);

  const getRefundStatusStyles = (status, isActive, isFailed, isCompleted) => {
    // if (status === "Refunded" && isCompleted) {
    //     return {
    //       borderColor: "border-green-500",
    //       bgColor: "bg-green-100",
    //       textColor: "text-green-500",
    //       icon: <CheckCircle2 className="w-5 h-5" />,
    //     };
    //   }
      
    if (isFailed) {
      return {
        borderColor: "border-red-500",
        bgColor: "bg-red-100",
        textColor: "text-red-500",
        icon: <AlertTriangle className="w-5 h-5" />,
      };
    }
    if (isCompleted) {
      return {
        borderColor: "border-green-500",
        bgColor: "bg-green-100",
        textColor: "text-green-500",
        icon: <CheckCircle2 className="w-5 h-5" />,
      };
    }
    if (isActive && status === "Refunded" ) {     
      return {
        borderColor: "border-green-500",
        bgColor: "bg-green-100",
        textColor: "text-green-500",
        icon: <CheckCircle2 className="w-5 h-5" />,
    };
      
    }
    else if(isActive ){
        return {
            borderColor: "border-green-500",
            bgColor: "bg-green-100",
            textColor: "text-green-500",
            icon: <Loader className="w-5 h-5 animate-spin" />,
          };
}
    return {
      borderColor: "border-gray-300",
      bgColor: "bg-[#E8E8E8]",
      textColor: "text-gray-400 opacity-70",
      icon: <div className="w-4 h-4 rounded-full bg-[#E8E8E8]"></div>,
    };
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <div className="font-[400] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">{refundDate}</div>
        {refundStatus === "Failed" && failureReason && (
          <p className="text-red-500 mt-2">
            Reason for failure: {failureReason}
          </p>
        )}
      </div>
      <div className="max-tablet:w-full tablet:w-[100%]  laptop:w-[70%] Llaptop:w-[60%] laptop:mx-4 py-5 px-4">
        <div className="flex items-center">
          {refundStatuses.map((status, index) => {
            const isActive = index === currentIndex;
            const isFailed = refundStatus === "Failed" && index === previousIndex + 1;
            const isCompleted = index < currentIndex;
            const { borderColor, bgColor, textColor, icon } =
              getRefundStatusStyles(status, isActive, isFailed, isCompleted);

            return (
              <div key={status} className="flex-1 flex flex-col items-center ">
                
                {/* Circle wrapper with connector */}
                <div className="relative flex items-center justify-center w-full">
                  {/* Connector line before circle */}
                  {index > 0 && (
                    <div 
                      className={`absolute max-tablet:h-1 tablet:h-1.5 right-1/2 left-0 top-1/2 -translate-y-1/2 ${
                        (index <= currentIndex || (refundStatus === "Failed" && index <= previousIndex + 1))
                          ? "bg-[#E5FAE6]"
                          : "bg-[#E8E8E8]"
                      }`}
                    />
                  )}
                  
                  {/* Circle */}
                  <div
                    className={`relative z-10 flex items-center justify-center laptop:w-8 laptop:h-8 Llaptop:w-12 Llaptop:h-12 rounded-full border-2 ${borderColor} ${bgColor} ${textColor}`}
                  >
                    {icon}
                  </div>
                  
                  {/* Connector line after circle */}
                  {index < refundStatuses.length - 1 && (
                    <div 
                      className={`absolute max-tablet:h-1 tablet:h-1.5 left-1/2 right-0 top-1/2 -translate-y-1/2 ${
                        (index < currentIndex || (refundStatus === "Failed" && index <= previousIndex))
                          ? "bg-[#E5FAE6]"
                          : "bg-[#E8E8E8]"
                      }`}
                    />
                  )}
                </div>
                
                {/* Status text */}
                <span
                  className={`font-[600] max-tablet:text-[4px] max-tablet:leading-[10px] tablet:text-[10px] tablet:leading-[14px] laptop:text-[10px] laptop:leading-[18px] Llaptop:text-[12px] text-center mt-2 ${
                    isActive || isCompleted || isFailed
                      ? textColor
                      : "text-gray-400 opacity-70"
                  }`}
                >
                  {status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      
      {refundStatus === "Failed" && (
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
    </div>
  );
};

export default RefundTracking;