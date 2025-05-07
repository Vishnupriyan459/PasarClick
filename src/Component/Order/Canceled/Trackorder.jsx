import  { React,useState } from "react"; 
import { LiaCheckDoubleSolid } from "react-icons/lia";
import CanceledOrder from "./CanceledOrder";
import { CheckCircle, MapPin, Clock } from 'lucide-react';
const Trackorder = ({order,canceldate} ) => {
  // Core statuses for canceled orders
  // const statuses = ["Preparing", "Delivery"];
  // const currentIndex = statuses.indexOf(order);
  // console.log(order,canceldate);

  const[laststage,setnewlaststage]=useState("")

  // const dynamicStatuses =
  //   currentIndex !== -1
  //     ? [...statuses.slice(0, currentIndex + 1), "Cancelled"]
  //     : ["Cancelled"];
  
  
  return (
    <div className="w-full mt-1">
    <div className="max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">The order is canceled in phase of {laststage} on <span className="font-[500] text-green-500">{canceldate.split('T')[0] }</span></div>
    <div className="flex items-center space-x-0 max-tablet:w-[100%] tablet:w-[80%] laptop:w-[70%] Llaptop:w-[50%] laptop:mx-4 py-5 px-4">
    <CanceledOrder tracking_history={order} data={setnewlaststage} canceldate={canceldate}/>
    </div>
    
    </div>
  );
};

export default Trackorder;
