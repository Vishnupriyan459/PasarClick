import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import "./Login.css";
import "../../css/sweetalert.css";

const SignUp = () => {
  const [phoneNumberString, setPhoneNumberString] = useState("");
  const [countryCode, setCountryCode] = useState("+91"); // Default country code
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  const handlePhoneNumberChange = (value) => {
    if (typeof value !== "string") {
      setPhoneNumberString("");
      return;
    }
    setPhoneNumberString(value);
    const phoneNumber = parsePhoneNumberFromString(value, countryCode);
    if (phoneNumber && phoneNumber.country !== countryCode) {
      setCountryCode(phoneNumber.country);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;

    const userData = {
      username: form.Name.value.replace(/\s+/g, "_"),
      email: form.email.value,
      mobile: form.phone.value,
      password: form.password.value,
      user_type: "customer",
    };

    try {
      const response = await axios.post(`${API_URL}/register`, userData);
      
      

      Swal.fire({
        title: "Registered!",
        text: response.data.message,
        icon: "success",
        confirmButtonText: "Go to Login",
        customClass: {
          confirmButton: "Custom-Login-button",
        },
      }).then(() => {
        navigate("/login");
      });
    }catch (err) {
      const errorData = err.response?.data;
      
    
      let errorMessage = "Something went wrong.";
      if (errorData && typeof errorData === "object") {
        const firstKey = Object.keys(errorData)[0];
        if (Array.isArray(errorData[firstKey])) {
          errorMessage = errorData[firstKey][0];
        }
      }
    
      Swal.fire({
        title: "Oops!",
        text: errorMessage, // ✅ Show the actual message
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
     
  };

  return (
    <div className="flex justify-center items-center h-screen login-block">
      <div className="overflow-visible  laptop:gap-4 bg-[#ffffff] mx-8 relative h-[500px] laptop:h-[500px] w-[1204px] rounded-lg flex flex-row items-center justify-between shadow-2xl">
        <div
          className="flex-grow"
          style={{ fontFamily: "Lufga", fontWeight: 400 }}
        >
          <div className="mx-5">
            <h1 className="sm:text-center md:text-start sm:text-[26px] tablet:text-[25px] laptop:text-[36px] ">
              SignUp
            </h1>
            <p  className="tablet:text-[18px] tablet:leading-[20px] laptop:text-[20px] laptop:leading-[26px]">
              Welcome to Pasar Click. Please sign in to access your information.
            </p>
          </div>

          <form
            className="flex flex-col justify-center p-4 mx-5 max-tablet:text-[12px] tablet:text-[16px]"
            onSubmit={handleSubmit}
          >
            <label htmlFor="Name">Name</label>
            <input
              type="text"
              name="Name"
              id="Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />

            <label htmlFor="phoneNumber">Mobile</label>
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

            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
              required
            />

            <input
              type="submit"
              className="bg-[#DEF9EC] w-[60%] px-4 py-3 rounded-3xl text-black font-semibold mx-auto my-5 cursor-pointer"
              value="Sign Up"
            />

            <div className="mx-auto">
              Already have an account?
              <Link to="/Login" className="px-4 text-bordergreen font-semibold">
                Sign In
              </Link>
            </div>
          </form>
        </div>

        <div className="hidden tablet:flex justify-start items-center w-[450px]">
          <div className="w-[300px] tablet:h-[470px] laptop:h-[600px] rounded-lg overflow-hidden -mt-[244px] -mb-[244px]">
            <img
              src="Asset/signup vegetables layout.svg"
              alt="vegetables"
              className="object-cover w-full h-full rounded-3xl"
            />
          </div>
          <div className="rotate-90 hidden laptop:flex">
            <span
              style={{
                fontFamily: "Lufga",
                fontWeight: 400,
                fontSize: "50px",
                lineHeight: "104.41px",
                opacity: "0.4",
              }}
            >
              SignUp
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
