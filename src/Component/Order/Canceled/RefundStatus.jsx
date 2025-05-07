import React, { useState,useEffect } from "react";
import RefundTracking from "../RefundTracking";
import axios from "axios";
import Returnitem from "../Received/Returnitem";
const API_URL = process.env.REACT_APP_API_URL;
const RefundStatus = ({ order }) => {
  const [Refundrequest, setRefundrequest] = useState(order.refundrequest);
  const [refundDate, setRefundDate] = useState(order.refundDate||0);
  const [activeModal, setActiveModal] = useState(false);
  const[data,setdata]=useState({
    "id": 2,
    "orderID": 47,
    "created_at": "2025-04-25T00:30:31.648352Z",
    "createdBy": 10,
    "status": "pending",
    "reason": "dd",
    "evidence": null
  });
  
  // console.log(order);
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');       // dd
    const month = String(date.getMonth() + 1).padStart(2, '0'); // mm (0-based)
    const year = date.getFullYear();                            // yyyy
    return `${day}-${month}-${year}`;
  }
  const handleCloseModal = () => {
    setActiveModal(false);
    
  };
  useEffect(() => {
    const fetchRefundData = async () => {
      const token = localStorage.getItem("access");
      try {
        const response = await axios.get(
          `${API_URL}/customers/refund-request/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const matchingRefund = response.data.find(
          (refund) => refund.orderID === order.id
        );
        console.log(matchingRefund,response.data,order.id);

        
        if (matchingRefund) {
          setdata(matchingRefund);
          
          
          if (matchingRefund.status === "Refunded") {
            setRefundDate(`Refund received at ${formatDate(matchingRefund.refundDate || 0)}`);
          } else {
            setRefundDate(`Refund is in process since ${formatDate(matchingRefund.created_at)}`);
          }
        }
      } catch (error) {
        console.error("Error fetching refund data:", error);
      }
    };
  
    fetchRefundData();
  }, [order]);
  
  // useEffect(async() => {
  //   const token = localStorage.getItem("access");
  //   const response = await axios.get(
  //     `${API_URL}/customers/refund-request/`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   const matchingRefund = response.data.find(
  //     (refund) => refund.orderID === order.orderID
  //   );
  //   setdata(matchingRefund);
  //   console.log(data);
    
  //   if (matchingRefund.status === "Refunded") {
  //     setRefundDate(`Refund recived at ${formatDate(matchingRefund.refundDate||0)}`);//we have to change it 
  //   }
  //   else{
  //     setRefundDate(`Refund is in ${formatDate(matchingRefund.created_at)} `);
  //   }
  // }, [order]);
  // Function to handle refund application
  const applyRefund = () => {
    // if (order.paymentMode === "CashOnDelivery") {
    //   alert("Refunds are not applicable for Cash on Delivery orders.");
    //   return;
    // }
    setActiveModal(true);

    // Simulate a refund process (e.g., API call)
    setRefundrequest("Refund Issued"); // Update the status
    // Update backend or database here if necessary
  };

  return (
    <div className="refund-status  max-tablet:w-[100vw] tablet:w-[60vw] laptop:w-[70vw] Llaptop:w-[80vw] ">
      
{
    data ? (
      data? (
       
      <RefundTracking
      refundStatus={data.status}
      refundDate={formatDate(data.created_at)}
      failureReason={data.reason}
      data={data}
      evidence={data.evidence}
      is_canceled={data.status === 'cancelled'}
    />
      ) : (
        
        <>
        <p className="">You can apply for a refund.</p>
        <button
          className="max-tablet:w-[110px] max-tablet:h-[30px] tablet:w-[130px] tablet:h-[35px] laptop:w-[152px] laptop:h-[40px] Llaptop:w-[162px] Llaptop:h-[49px] bg-[#D2F4D6] rounded-full flex items-center justify-center border-[1px] hover:border-[#364A15] max-tablet:text-[7.5px] tablet:text-[8px] laptop:text-[11px] Llaptop:text-[16px] font-[400]"
          onClick={applyRefund}
        >
          Apply Refund
        </button>

        
        
      </>
        
      )
    ) : (
      <p>Loading refund data...</p>
    )
  }
      {activeModal===true &&<Returnitem onClose={handleCloseModal} order={data.orderID} />}
    </div>
  );
};

export default RefundStatus;
