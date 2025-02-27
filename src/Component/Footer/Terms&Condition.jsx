import React from 'react'
import { RxExternalLink } from "react-icons/rx";
import { Link } from "react-router-dom";
const TermsCondition = () => {
  return (
    <div className='bg-FAQ bg-cover w-[100%] '>
      <div className='w-[90vw] mx-auto  '>
        <div className='font-[700] text-[#364A15] text-[26px] tablet:text-[28px] laptop:text-[34px] tablet:mt-[1rem] laptop:mt-[2rem]'>Terms & Condition</div>
        <div className='grid grid-cols-2 gap-8 justify-center px-2 py-[5rem] px-[1rem] '>
            
                <a href={`${process.env.PUBLIC_URL}/Data/Terms&Condition.pdf`} rel="noreferrer" target="_blank" className='bg-[#ffff] flex items-center justify-between px-4 w-[583.33px] h-[80px]  border border-2 rounded-xl'>
                  <div className='font-[500] text-[22px]'>Terms and Conditions of Service - PDF</div>
                  <div><RxExternalLink className='text-[#4CAF50]' /></div>
                </a>
                <a href={`${process.env.PUBLIC_URL}/Data/Agreement.pdf`} rel="noreferrer" target="_blank" className='bg-[#ffff] flex items-center justify-between px-4 w-[583.33px] h-[80px]  border border-2 rounded-xl'>
                  <div className='font-[500] text-[22px]'>Pasar Click agreement  & End user right - PDF</div>
                  <div><RxExternalLink className='text-[#4CAF50]' /></div>
                </a>
                <Link to='/CookiePolicy' rel="noreferrer" className='bg-[#ffff] flex items-center justify-between px-4 w-[583.33px] h-[80px]   border-2 rounded-xl'>
                  <p className='font-[500] text-[22px]'>Cookie Policy</p>
                </Link>
                <Link to='/PrivacyPolicy' className='bg-[#ffff] flex items-center justify-between px-4 w-[583.33px] h-[80px]  border-2 rounded-xl'>
                  <p className='font-[500] text-[22px]'>Privacy Policy</p>
                </Link>

            
        </div>

      </div>
    
    </div>
  )
}

export default TermsCondition;