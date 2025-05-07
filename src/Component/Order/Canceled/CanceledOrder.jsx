import React, { useEffect } from "react";
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { CheckCircle, MapPin, Clock, XCircle } from 'lucide-react'; // Import XCircle for cancelled

const CanceledOrder = ({ tracking_history, data, canceldate }) => {
  const statuses = ["Preparing", "Order Packed", "Dispatched", "Delivery", "Delivered"];

  useEffect(() => {
    if (tracking_history && tracking_history.length > 0) {
      const lastTracking = tracking_history[tracking_history.length - 1].status;
      data(lastTracking);
    }
  }, [tracking_history, data]);

  // Helper function to format cancel date and time
// const formatCancelDateTime = (canceldate) => {
//   if (!canceldate) return { date: '', time: '' };
  
//   const dateObj = new Date(canceldate);

//   // Format date as DD/MM/YYYY
//   const day = String(dateObj.getDate()).padStart(2, '0');
//   const month = String(dateObj.getMonth() + 1).padStart(2, '0');
//   const year = dateObj.getFullYear();
//   const formattedDate = `${day}/${month}/${year}`;

//   // Format time as H:MM
//   const hours = dateObj.getHours();
//   const minutes = String(dateObj.getMinutes()).padStart(2, '0');
//   const formattedTime = `${hours}:${minutes}`;

//   return { date: formattedDate, time: formattedTime };
// };
const formatCancelDateTime = (canceldate) => {
  if (!canceldate) return { date: '', time: '' };
  
  const dateObj = new Date(canceldate);

  // Format date as DD/MM/YYYY
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  // Format time as H:MM AM/PM
  let hours = dateObj.getHours();
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  const formattedTime = `${hours}:${minutes} ${ampm}`;

  return { date: formattedDate, time: formattedTime };
};


  // Add "Cancelled" as a final step
  const updatedHistory = [
    ...tracking_history,
    {
      status: "Cancelled",
      description: "Your order has been cancelled",
      date:  formatCancelDateTime(canceldate).date||"", // split into date if needed
      time:  formatCancelDateTime(canceldate).time||"", // split into time if needed
      completed: false, // not completed, obviously
      cancelled: true,  // custom flag to identify cancelled status
    }
  ];
  // console.log(updatedHistory.date,updatedHistory.time);
  // console.log(updatedHistory);
  
  

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Tracking History</h3>
      <div className="space-y-6">
        {updatedHistory.map((step, index) => (
          <div key={index} className="relative flex gap-4">
            {/* Timeline Line */}
            {index !== updatedHistory.length - 1 && (
              <div className="absolute max-tablet:left-[15px] tablet:left-[20px] top-[24px] w-[2px] h-[calc(100%+24px)] bg-gray-200" />
            )}

            {/* Status Icon */}
            <div className={`relative z-10 rounded-full p-1 max-tablet:w-7 max-tablet:h-7 tablet:w-10 tablet:h-10 flex justify-center items-center ${
              step.cancelled 
                ? 'bg-red-100' 
                : step.completed 
                ? 'bg-green-100' 
                : 'bg-gray-100'
            }`}>
              {step.cancelled ? (
                <XCircle className="max-tablet:h-3 max-tablet:w-3 tablet:h-6 tablet:w-6 text-red-600" />
              ) : step.completed ? (
                <CheckCircle className="max-tablet:h-3 max-tablet:w-3 tablet:h-6 tablet:w-6 text-green-600" />
              ) : (
                <Clock className="max-tablet:h-3 max-tablet:w-3 tablet:h-6 tablet:w-6 text-gray-400" />
              )}
            </div>

            {/* Status Content */}
            <div className="flex-1 pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium max-tablet:text-[12px] max-tablet:leading-[13px] tablet:text-[15px] tablet:leading-[14px] laptop:text-[20px] laptop:leading-[18px]">
                    {step.status}
                  </p>
                  <p className="max-tablet:text-[8px] max-tablet:leading-[12px] tablet:text-[12px] tablet:leading-[16px] laptop:text-[14px] laptop:leading-[18px]">
                    {step.description}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p className="max-tablet:text-[8px] max-tablet:leading-[12px] tablet:text-[12px] tablet:leading-[16px] laptop:text-[14px] laptop:leading-[18px]">
                    {step.date}
                  </p>
                  <p className="max-tablet:text-[8px] max-tablet:leading-[12px] tablet:text-[12px] tablet:leading-[16px] laptop:text-[14px] laptop:leading-[18px]">
                    {step.time}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CanceledOrder;
