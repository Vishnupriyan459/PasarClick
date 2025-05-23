import React, { useState } from 'react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Link,Outlet } from 'react-router-dom';

const Loginwithnumber = (props) => {
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
    // Handle form submission here
    props.verify(phoneNumberString) ;
  };

  return (
    <div className="   px-5">
      <form className="flex flex-col justify-center items-center p-4" onSubmit={handleSubmit}>
        <div className="mb-5 w-full max-w-[100%]">
          <label htmlFor="phoneNumber">Mobile number</label>
          <div className='w-full border border-gray-300  rounded-md px-3 py-1 focus:outline-none focus:ring focus:border-blue-300'>
          <PhoneInput
              id="phoneNumber"
              country={"in"}
              name="phone"
              value={phoneNumberString}
              onChange={handlePhoneNumberChange}
              inputProps={{
                required: true,
                name: "phone",
                autoFocus: true,
              }}
              inputClass="!w-full !py-2 !pl-14 !pr-4 !text-base !rounded-md !border !border-gray-300 focus:!outline-none focus:!ring-2 focus:!ring-blue-500"
              buttonClass="!border-none"
              containerClass="!w-full !mb-3"
            />
            </div>
        </div>
        <div className="mb-5 w-full max-w-[100%]">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='*********'
            className="w-full border border-gray-300  rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        
        <button type="submit" className="bg-[#DEF9EC] w-[60%]  px-4 py-3 rounded-3xl text-black font-semibold">Submit</button>
        <div>
        Don’t have an account?
        <Link to="/SignUp" className='px-4 text-bordergreen font-semibold'>Sign up</Link>
        </div>
        
      </form>
    </div>
  );
};

export default Loginwithnumber;
