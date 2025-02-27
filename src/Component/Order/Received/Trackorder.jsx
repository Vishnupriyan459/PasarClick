import React from 'react';
import { CheckCircle, MapPin, Clock } from 'lucide-react';


const TrackOrder = ({ orderData }) => {
  const {
    DeliveredID,
    Receiver_name,
    Delivered_address,
    Total,
    Delivery_Partner,
    paymentMode,
    Tracking_history,
    Status,
    ReceiveDate,
    Product_detail,
  } = orderData;

  return (
    <div className="w-full  mx-auto">
      

      <div className="space-y-6 pt-4   ">
      
        {/* Order Status Banner */}
        <div className={`max-tablet:p-2 tablet:p-4 rounded-lg flex items-center gap-3  ${
          Status === 'Received' ? 'bg-green-50' : 'bg-yellow-50 '
        }`}>
            
          
          <CheckCircle className="max-tablet:h-3 max-tablet:w-3 tablet:h-5 tablet:w-5 text-green-600" />
          <div>

            <p className={`font-medium ${
              Status === 'Received' ? 'text-green-800' : 'text-yellow-800'
            } max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[18px] laptop:leading-[20px]`}>
                {Status} Successfully
                </p>
            <p className="text-sm  max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[18px] laptop:leading-[20px]">
              {Status === 'Received' ? 'Your package has been delivered' : `Expected on: ${ReceiveDate} `}
            </p>
          </div>
        </div>

        {/* Order Information */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-[600] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">Order ID</p>
            <p className="max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">{DeliveredID}</p>
          </div>
          <div>
            <p className="font-[600] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">Delivery Partner</p>
            <p className="max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">{Delivery_Partner}</p>
          </div>
          <div>
            <p className="font-[600] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">Receiver Name</p>
            <p className="max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">{Receiver_name}</p>
          </div>
          <div>
            <p className="font-[600] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">Total Amount</p>
            <p className="max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">INR {Total}</p>
          </div>
          <div>
            <p className="font-[600] max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">Payment Mode</p>
            <p className="max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">{paymentMode}</p>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="flex items-center gap-3 p-4 bg-gray-100 rounded-lg">
          <MapPin className="max-tablet:h-3 max-tablet:w-3 tablet:h-5 tablet:w-5 text-gray-600" />
          <div>
            <p className="max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[14px] laptop:leading-[18px]">Delivered To</p>
            <p className="max-tablet:text-[8px] max-tablet:leading-[10px] tablet:text-[12px] tablet:leading-[14px] laptop:text-[15px] laptop:leading-[18px]">{Delivered_address}</p>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="space-y-4">
          <h3 className="font-medium">Tracking History</h3>
          <div className="space-y-6">
            {Tracking_history.map((step, index) => (
              <div key={index} className="relative flex gap-4">
                {/* Timeline Line */}
                {index !== Tracking_history.length - 1 && (
                  <div className="absolute max-tablet:left-[15px] tablet:left-[20px] top-[24px] w-[2px] h-[calc(100%+24px)] bg-gray-200" />
                )}

                {/* Status Icon */}
                <div className={`relative z-10 rounded-full p-1 max-tablet:w-7 max-tablet:h-7 tablet:w-10 tablet:h-10 flex justify-center items-center ${
                  step.completed ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  {step.completed ? (
                    <CheckCircle className="max-tablet:h-3 max-tablet:w-3 tablet:h-6 tablet:w-6 text-green-600" />
                  ) : (
                    <Clock className="max-tablet:h-3 max-tablet:w-3 tablet:h-6 tablet:w-6 text-gray-400" />
                  )}
                </div>

                {/* Status Content */}
                <div className="flex-1 pb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium max-tablet:text-[12px] max-tablet:leading-[13px] tablet:text-[15px] tablet:leading-[14px] laptop:text-[20px] laptop:leading-[18px]">{step.status}</p>
                      <p className="  max-tablet:text-[8px] max-tablet:leading-[12px]  tablet:text-[12px] tablet:leading-[16px] laptop:text-[14px] laptop:leading-[18px] ">{step.description}</p>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      <p className='max-tablet:text-[8px] max-tablet:leading-[12px]  tablet:text-[12px] tablet:leading-[16px] laptop:text-[14px] laptop:leading-[18px]'>{step.date}</p>
                      <p className='max-tablet:text-[8px] max-tablet:leading-[12px]  tablet:text-[12px] tablet:leading-[16px] laptop:text-[14px] laptop:leading-[18px]'>{step.time}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default TrackOrder;
