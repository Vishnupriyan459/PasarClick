import React from "react";
import { LiaCheckDoubleSolid } from "react-icons/lia";

const StatusTracker = ({ status }) => {
  const statuses = ["packed", "dispatched", "delivered"];
  const currentIndex = statuses.indexOf(status);

  return (
    <div className="flex items-center  space-x-0 max-tablet:w-[100%] tablet:w-[90%] laptop:w-[70%] Llaptop:w-[60%] laptop:mx-4 py-5 px-4">
      {statuses.map((state, index) => (
        <React.Fragment key={state}>
          {/* Status Icon */}
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center laptop:w-8 laptop:h-8 Llaptop:w-[3rem] Llaptop:h-[3rem] rounded-full border-2 ${
                index <= currentIndex
                  ? "border-[#E5FAE6] bg-[#E5FAE6] text-green-700"
                  : " bg-white text-gray-400"
              }`}
            >
              {index <= currentIndex ? (
                <LiaCheckDoubleSolid size={20} />
              ) : (
                
                <div className="w-6 h-6 laptop:w-8 laptop:h-8 Llaptop:w-[3rem] Llaptop:h-[3rem] rounded-full bg-[#E8E8E8]"></div>
                
              )}
            </div>
            <span
              className={`max-tablet:text-[8px]  tablet:text-[10px] tablet:leading-[14px] laptop:leading-[18px] laptop:text-[14px] mt-2 ${
                index <= currentIndex
                  ? "text-green-700 font-semibold "
                  : "text-gray-400"
              }`}
            >
              {state.charAt(0).toUpperCase() + state.slice(1)}
            </span>
          </div>

          {/* Connector Line */}
          {index < statuses.length - 1 && (
            <div
              className={`flex-1 h-[3px] ${
                index < currentIndex
                  ? "bg-[#E5FAE6]"
                  : index === currentIndex
                  ? "bg-gradient-to-r from-[#E5FAE6] to-gray-400"
                  : "bg-gray-400"
              } `}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StatusTracker;
