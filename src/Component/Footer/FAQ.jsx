import React, { useState } from 'react';
import { FiPlus, FiMinus } from "react-icons/fi";

const FAQ = () => {
  const faqData = [
    { question: "What documents are needed to register as a delivery person?", answer: "Valid Government ID, Driver’s License, Insurance, Bank Account Details, etc." },
    { question: "How long does the registration process take?", answer: "The process can take anywhere from a few hours to a few days depending on the platform." },
    { question: "Can I edit my information after approval?", answer: "Yes, you can update your information after approval, but it may require re-approval for certain changes." },
    { question: "Should I update the latest driver's license after renewal?", answer: "Yes, it's important to keep your driver's license up to date in your account." },
    { question: "What are the working hours for a delivery partner at Pasar Click?", answer: "The working hours vary, but typically you can choose your shifts during peak hours like evenings or weekends." },
    { question: "Is there a fee to register as a delivery partner?", answer: "Generally, there are no fees, but there may be minimal charges for background checks or verification." },
    { question: "What equipment do I need for account registration?", answer: "You need a smartphone, vehicle, charger, and safety gear (if applicable)." },
    { question: "When and How will I be paid by Pasar Click?", answer: "Payments are usually processed weekly or bi-weekly, transferred directly to your bank account." },
  ];

  // State to track which FAQ is expanded
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // Function to toggle the FAQ visibility
  const toggleFAQ = (index) => {
    setExpandedFAQ(prevIndex => (prevIndex === index ? null : index)); // Toggle between showing and hiding
  };

  return (
    <div className='bg-FAQ w-[100%]'>
      <div className='w-[90vw] mx-auto'>
        <p className='font-[700] tablet:mt-[1rem] laptop:mt-[2rem] text-[#364A15] text-[26px] tablet:text-[28px] laptop:text-[34px]'>FAQ section:</p>
        <div className='bg-[#F6F6F699] bg-opacity-[50%] rounded-xl tablet:py-9 laptop:px-10 laptop:py-8 grid tablet:grid-cols-2 gap-4'>
          {faqData.map((item, index) => (
            <div key={index} className='bg-[#ffff] rounded-xl p-5 space-y-3'>
              <div className='flex justify-between items-center gap-2'>
                <h3 className='font-[500] text-[#170F49] w-3/4 text-[14px] leading-[20px] tablet:text-[17px] tablet:leading-[23px] laptop:text-[22px] laptop:leading-[28px] '>{item.question}</h3>
                <div
                  className={`rounded tablet:w-[36px] tablet:h-[36px]  laptop:w-[40px] laptop:h-[40px] flex justify-center items-center laptop:w-1/2 cursor-pointer ${
                    expandedFAQ === index ? 'bg-[#4CAF50]' : 'bg-[#D2F4D64D] bg-opacity-30'
                  }`} 
                  onClick={() => toggleFAQ(index)} // Toggle when clicked
                >
                  {expandedFAQ === index ? (
                    <FiMinus className='text-[#fff]' />
                  ) : (
                    <FiPlus className='text-[#1AC84B]' />
                  )}
                </div>
              </div>

              {expandedFAQ === index && (
                <p className='px-1 font-[400] text-[#6F6C90] text-[10px] tablet:text-[14px] laptop:text-[18px]'>{item.answer}</p> // Only display answer if this FAQ is expanded
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
