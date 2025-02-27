import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { CiLock } from "react-icons/ci";

import './scroll.css';
const Partnerwithus = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegisterClick = () => {
    setIsRegistered(true);
  };
  return (
    
    <div>
      {!isRegistered ? (
        <div className="bg-FAQ bg-cover">
          <div className="bg-Partnerwithus w-full bg-cover h-[490px] tablet:h-[526px] laptop:h-[715px] flex justify-center laptop:justify-end items-center px-9 Llaptop:px-[9rem]">
            <div className="w-[310px] h-[430px] tablet:w-[350px] laptop:w-[400px] tablet:h-[490px] laptop:h-[620px] bg-[#F6F6F6B2] rounded-2xl p-4">
              <div className="space-y-2 tablet:space-y-3 laptop:space-y-4">
                <div className="font-[700] text-[25px] leading-[36px] tablet:text-[30px] tablet:leading-[39px]">
                  Register Now
                </div>
                <div className="font-[400] text-[12px] leading-[15px] tablet:text-[16px] tablet:leading-[20px]">
                  <div>If you already have an account register</div>
                  <div>
                    You can{" "}
                    <a href="#" className="font-[700] text-[#364A15]">
                      Login here!
                    </a>
                  </div>
                </div>
              </div>
              <div className="space-y-4 tablet:space-y-6 laptop:space-y-8 mt-3 tablet:mt-5 laptop:mt-8">
                <div className="border-b border-[#000] space-y-2">
                  <div className="font-[500] text-[8px] leading-[11px] tablet:text-[13px] tablet:leading-[16px]">
                    Email
                  </div>
                  <div className="flex items-center">
                    <CiMail className="text-[1.2rem] tablet:text-[1.5rem]" />
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      className="input-field"
                      required
                    />
                  </div>
                </div>
                <div className="border-b border-[#000] space-y-2">
                  <div className="font-[500] text-[8px] leading-[11px] tablet:text-[13px] tablet:leading-[16px]">
                    Username
                  </div>
                  <div className="flex items-center">
                    <BsPerson className="text-[1.2rem] tablet:text-[1.5rem]" />
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter your User name"
                    />
                  </div>
                </div>
                <div className="border-b border-[#000] space-y-2">
                  <div className="font-[500] text-[8px] leading-[11px] tablet:text-[13px] tablet:leading-[16px]">
                    Password
                  </div>
                  <div className="flex items-center">
                    <CiLock className="text-[1.2rem] tablet:text-[1.5rem]" />
                    <input
                      type="password"
                      className="input-field"
                      placeholder="Enter your Password"
                    />
                  </div>
                </div>
                <div className="border-b border-[#000] space-y-2">
                  <div className="font-[500] text-[8px] leading-[11px] tablet:text-[13px] tablet:leading-[16px]">
                    Confirm Password
                  </div>
                  <div className="flex items-center">
                    <CiLock className="text-[1.2rem] tablet:text-[1.5rem]" />
                    <input
                      type="password"
                      className="input-field"
                      placeholder="Confirm your Password"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={handleRegisterClick}
                className="bg-[#D2F4D6] mx-1 rounded-2xl py-3 px-4 flex justify-center items-center my-2 tablet:my-4 laptop:my-8 drop-shadow-2xl"
              >
                <p>Register</p>
              </button>
            </div>
          </div>
          
        </div>
      ) : (
        <div className="bg-Partnerwithus w-full bg-cover h-[490px] tablet:h-[526px] laptop:h-[715px] flex justify-center  items-center px-9 text-[#364A15]">
          <div className="bg-[#F6F6F6B2] rounded-xl py-5 tablet:py-4 w-[310px] h-[350px] tablet:w-[600px] tablet:h-[400px] laptop:w-[900px] laptop:h-[600px] flex flex-col items-center justify-around">
            <div className="w-[90%] mx-auto text-center">
              <p className="font-[500] text-[10px] leading-[18px] tablet:text-[20px] tablet:leading-[35px] laptop:text-[30px] laptop:leading-[39px]">Download the Application <span className="text-[700] text-black">Here</span></p>

              <div className="mt-2 space-y-2 tablet:mt-7 laptop:mt-9 tablet:space-y-4 laptop:space-y-5 text-left">
                <h2 className="font-[400]  text-[10px] leading-[13px] tablet:text-[15px] tablet:leading-[19px] laptop:text-[23px] laptop:leading-[28px]">
                  Why Choose Pasar Click Partner?
                </h2>
                <ul className="list-disc pl-6 space-y-2 tablet:space-y-3 laptop:space-y-4 text-[8px] leading-[10px] tablet:text-[12px] laptop:text-[16px] laptop:leading-[30px]">
                  <li>
                    Wider Reach: Tap into a diverse customer base across various
                    demographics and regions.
                  </li>
                  <li>
                    Effortless Integration: Easily upload your products and
                    services onto our platform within minutes.
                  </li>
                  <li>
                    Boosted Visibility: Stand out among competitors with
                    enhanced visibility and targeted marketing tools.
                  </li>
                  <li>
                    Streamlined Management: Manage orders, track sales, and
                    monitor performance conveniently through our user-friendly
                    dashboard.
                  </li>
                </ul>
              </div>

              <div className="space-y-2 mt-1 tablet:mt-5 latop:mt-7">
                <p className="font-[400px] text-left text-[10px] leading-[13px] tablet:text-[15px] tablet:leading-[19px] laptop:text-[23px] laptop:leading-[28px] ">Ready to Get Started?</p>
                <p className="font-[300] text-[8px] leading-[9px] tablet:text-[12px] tablet:leading-[25px] laptop:text-[16px] laptop:leading-[30px] text-left text-opacity-[30%]">
                  Click the download button below to join Pasar Click Partner
                  and unlock endless possibilities for your business.
                </p>
              </div>
              <div className="w-[120px] h-[35px] tablet:w-[350px] tablet:h-[43px] laptop:w-[429px] laptop:h-[53px] rounded-full flex justify-center items-center mx-auto mt-3 bg-[#D2F4D6] ">
                  <p className="text-[10px] leading-[9px] tablet:text-[14px]">
                  Download
                  </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Partnerwithus