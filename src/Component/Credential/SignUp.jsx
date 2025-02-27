
import React, { useState } from 'react';
import Loginwithnumber from './Loginwithnumber';
import Loginwithemail from './Loginwithemail';
import OtpVerification from './OtpVerification';
import { Link,Outlet } from 'react-router-dom';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { WiDayThunderstorm } from 'react-icons/wi';
import './Login.css'

const SignUp = () => {
  const [isoptionClicked, setIsOptionClicked] = useState(true);
  const [verification,setverification]=useState(false);
  const [name,setname]=useState('')
  const handleClick = () => {
    setIsOptionClicked(!isoptionClicked);
    
  };
  const verify=(item)=>{
    setverification(!verification)
    setname(item);
  } 
  const [phoneNumberString, setPhoneNumberString] = useState('');
  const [countryCode, setCountryCode] = useState('+91'); // Default country code

  const handlePhoneNumberChange = (value) => {
    // Ensure value is a string
    if (typeof value !== 'string') {
      setPhoneNumberString('');
      return;
    }
    setPhoneNumberString(value);
    
    // Parse the phone number string
    const phoneNumber = parsePhoneNumberFromString(value, countryCode);
    
    // If the parsed phone number is valid and the country code has changed, update the country code
    if (phoneNumber && phoneNumber.country !== countryCode) {
      setCountryCode(phoneNumber.country);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Created")
    // Handle form submission here
    // props.verify(phoneNumberString) ;
  };

  return (
    <>
    
    <div className=' flex justify-center items-center h-screen  login-block'>
  <div className='overflow-visible gap-4 bg-[#ffffff] mx-8 relative h-[500px] w-[1204px] rounded-lg flex flex-row items-center justify-between shadow-2xl'>
    
    <div className='flex-grow justify-self-start ' style={
      {fontFamily:'Lufga',fontWeight:400}}>
      <div className='mx-5'>
      <h1 className='sm:text-center md:text-start sm:text-[26px] leading-[26.99px] md:text-[36px] leading-[46.99px]'>SignUp</h1>
      <p style={{ fontSize:'20px',lineHeight:'26.1px' }}>Welcome to Pasar Click. please sign in to access your information.</p>
      </div>
      
      <div>
        <form action="" className='flex flex-col justify-center  p-4 mx-5'onSubmit={handleSubmit}>
            <label htmlFor="Name">Name</label>
            <input type="text" name="Name" id="Name" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" required />
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" required/>
            <label htmlFor="phoneNumber">Mobile</label>
                  <PhoneInput
                  id="phoneNumber"
                  value={phoneNumberString}
                  onChange={handlePhoneNumberChange}
                  placeholder="Enter phone number"
                  style={{ width: "100%", border: "1px solid", borderRadius: "0.375rem", padding: "0.5rem 0.75rem", outline: "none", boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.5)" }}
                  // className="w-full border border-gray-300  rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
                  required
                  />
            <label htmlFor="password" >Password</label>
            <input type="password" name="password" id="password" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"/>
            <input type="submit" className="bg-[#DEF9EC] w-[60%] px-4 py-3 rounded-3xl text-black font-semibold mx-auto my-5"/>
            <div className='mx-auto'>
              Already have account?<Link to="/Login" className='px-4 text-bordergreen font-semibold'>Sign In</Link>
            </div>
        </form>
      </div>
      
    </div>
    <div className='hidden tablet:flex justify-start items-center w-[450px]'>
      
      <div className='w-[300px] h-[600px] rounded-lg overflow-hidden -mt-[244px] -mb-[244px]'>
        <img src="Asset/signup vegetables layout.svg" alt="vegetables" className="object-cover w-full h-full rounded-3xl" />
      </div>
      <div className='rotate-90 '>
      <span  style={{ fontFamily:'Lufga',fontWeight:400,fontSize:'50px',lineHeight:'104.41px',opacity:'0.4', padding:'0px' }}>SignUp</span>

      </div>
    </div>
  </div>
</div>
</>
  )
}

export default SignUp



