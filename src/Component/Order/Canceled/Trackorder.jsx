import React from "react";
import { LiaCheckDoubleSolid } from "react-icons/lia";

const Trackorder = ({order,canceldate} ) => {
  // Core statuses for canceled orders
  const statuses = ["Preparing", "Delivery"];
  const currentIndex = statuses.indexOf(order);

  const dynamicStatuses =
    currentIndex !== -1
      ? [...statuses.slice(0, currentIndex + 1), "Cancelled"]
      : ["Cancelled"];

  return (
    <div className="w-full mt-1">
    <div className="max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">The order is canceled in phase of {order.order} on <span className="font-[500] text-green-500">{canceldate }</span></div>
    <div className="flex items-center space-x-0 max-tablet:w-[100%] tablet:w-[80%] laptop:w-[70%] Llaptop:w-[50%] laptop:mx-4 py-5 px-4">
      {dynamicStatuses.map((state, index) => (
        <React.Fragment key={state}>
          {/* Status Icon */}
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center max-tablet:w-[27px] max-table:h-[15px] tablet:w-[30px] tablet:h-[30px] laptop:w-8 laptop:h-8 Llaptop:w-[3rem] Llaptop:h-[3rem] rounded-full border-2 ${
                state === "Cancelled"
                  ? "border-red-500 bg-red-100 text-red-500"
                  : "border-[#E5FAE6] bg-[#E5FAE6] text-green-700"
              }`}
            >
              {state === "Cancelled" ? (
                "X"
              ) : (
                <LiaCheckDoubleSolid size={20} />
              )}
            </div>
            <span
              className={`max-tablet:text-[7px] max-tablet:leading-[12px] tablet:text-[10px] tablet:leading-[14px] laptop:leading-[18px] laptop:text-[14px] mt-2 ${
                state === "Cancelled"
                  ? "text-red-500 font-semibold"
                  : "text-green-700 font-semibold"
              }`}
            >
              {state}
            </span>
          </div>

          {/* Connector Line */}
          {index < dynamicStatuses.length - 1 && (
            <div
              className={`flex-1 max-tablet:h-[2px] tablet:h-[3px] ${
                state === "Cancelled" ? "bg-red-500 " : "bg-[#E5FAE6]"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
    </div>
  );
};

export default Trackorder;
