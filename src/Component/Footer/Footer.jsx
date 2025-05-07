import React from 'react'
import { FaAngleDown} from "react-icons/fa6";
import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  return (
    
<div className="flex bg-footer-texture bg-cover overflow-hidden relative flex-col px-10 pt-10 pb-6 w-full min-h-[684px] max-md:px-5 max-md:max-w-full">
      
      <div className="flex relative flex-col px-10 py-4 rounded-2xl bg-stone-200 max-md:px-5 max-md:max-w-full">
        <div className="flex gap-4  flex-col items-center tablet:justify-between tablet:items-start tablet:flex-row w-full max-md:flex-wrap max-md:max-w-full">
          <img
            loading="brand"
            srcSet="Asset\nav\Icon.svg"
            className="shrink-0 aspect-square w-[93px]"
            alt='brand'
          />
          <div className="self-stretch max-md:max-w-full">
            <div className="flex gap-5   max-md:flex-col max-md:gap-0">
              <div className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col grow pb-7 text-base leading-6 text-stone-900 max-md:mt-4">
                  <div className="text-xs font-bold tracking-wide uppercase">
                    Contact us
                  </div>
                  <div className="mt-6">Support</div>
                  <div className="mt-1"><Link to={'/Home/FAQ'}>FAQ</Link></div>
                  <div className="mt-1"><Link to={'/Home/Partnerwithus'}>Partner with us</Link></div>
                  <div className="mt-1"><Link to={'/Home/Ridewithus'}>Ride with us</Link></div>
                  <div className="mt-1"><Link to={'/Home/Chatbot'}>Chat bot</Link></div>
                </div>
              </div>
              <div className="flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col text-base leading-6 text-stone-900 max-md:mt-4">
                  <div className="text-xs font-bold tracking-wide uppercase">
                    Legal
                  </div>
                  <div className="mt-6"><Link to={'/Home/Terms&Condition'}>Terms Conditions</Link></div>
                  <div className="mt-1"><Link to={'/Home/CookiePolicy'}>Cookie Policy</Link></div>
                  <div className="mt-1"><Link to={'/Home/PrivacyPolicy'}>Privacy Policy</Link></div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col justify-center  text-[16px] font-[400] text-black">
            <div className="flex flex-col justify-center px-4 py-3 tablet:px-8 tablet:py-6 w-full bg-white rounded-[304px] max-md:px-5">
              <div className="flex gap-2.5">
                <div>13 States </div>
                
                <FaAngleDown className="shrink-0 w-6 aspect-square" />

              </div>
            </div>
          </div> */}
        </div>
        <div className="flex flex-col Lmobile:flex-row gap-4 mt-24 max-md:flex-wrap max-md:mt-10">
          <div className="flex flex-1 gap-2 pr-20">
            <div className="flex justify-center items-center px-3 w-10 h-10 bg-stone-900 rounded-[40px]">
              
              <FaTelegramPlane className='aspect-[1.28] fill-white w-[18px]'/> 
            </div>
            <div className="flex justify-center items-center px-3 w-10 h-10 bg-stone-900 rounded-[40px]">
              
              <FaWhatsapp className="w-4 aspect-square fill-white"/>
            </div>
          </div>
          <div className="my-auto text-xs italic font-bold leading-4 text-stone-900 max-md:max-w-full">
            1901 Thornridge Cir. Shiloh,
            <br />
            Malaysia  81063
          </div>
        </div>
      </div>

      <div className="text-slate-50 flex flex-col gap-2  py-2 tablet:flex-row items-center mt-5">
        
          
         <div className="font-[700] text-[40px] leading-[40px] italic ">
              If you didn’t find the products
              <br />
              you are interested in or have questions?
         </div>
          
          {/* <div className="laptop:ms-12	">
            <div className="">
              <div className="font-[700] text-[14px] leading-[19.6px] italic ">
                Just send us your contact email and we will contact you.
              </div>
              <div className="flex justify-between flex-col gap-5 tablet:justify-start tablet:flex-row items-center ">
                <div className="flex justify-between w-[155px] h-[34px] px-4 tablet:w-[255px] tablet:h-[60px] border border-solid border-white border-opacity-60 rounded-[47px] ">
                  <div className='flex'>
                    <img
                      loading="lazy"
                      src="Asset/chatbot.svg"
                      className="shrink-0 w-6 aspect-square"
                      alt='chatbot'
                    />
                   
                    <div className="my-auto opacity-[0.5] text-[10px] tablet:text-[20px]">Chat bot</div>
                    </div>
                  <img
                    loading="lazy"
                    src="Asset/arrow.svg"
                    className="shrink-0 my-auto  aspect-[1.89] stroke-[1.5px] stroke-white w-[15px] "
                    alt='arrow'
                  />
                  
                </div>
                <div className=" flex justify-between tablet:justify-start items-center">
                  <div className="flex justify-between w-[155px] h-[34px] px-4 tablet:w-[255px] tablet:h-[60px]  border border-solid border-white border-opacity-60 rounded-[47px]">
                    <div className='flex'>
                      <img
                        loading="lazy"
                        src="Asset/mail.svg"
                        className="shrink-0 self-start mt-2 w-6 aspect-square"
                        alt='mail'
                      />
                      <div className="p-2">
                        <div className="hidden tablet:block">
                          Email
                        </div>                        
                        <input type="text" placeholder='Enter your mail' className='bg-transparent h-[20px] w-full my-auto opacity-[0.5] text-[8px] tablet:text-[20px]' />
                      </div>
                    </div>
                    <img
                    
                    src="Asset/arrow.svg"
                    className="shrink-0 my-auto  aspect-[1.89] stroke-[1.5px] stroke-white w-[15px]"
                    alt='arrow'
                  />
                  </div>
                  
                </div>
              </div>
            </div>
          </div> */}
        
      </div>
      <div className="flex relative gap-5 justify-between mt-12 text-xs leading-4 text-white max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
        <div>© 2023 — Copyright</div>
        <div className="text-right">Privacy</div>
      </div>
    </div>


    
    
        
    
    
  )
}

export default Footer