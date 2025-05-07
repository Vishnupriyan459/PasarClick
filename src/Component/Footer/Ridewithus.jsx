import React, { useState } from "react";
import axios from "axios";
import { CiMail, CiLock } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { FaQuoteLeft } from "react-icons/fa";

import "./scroll.css";

const Ridewithus = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const REGISTER_URL = `${API_URL}/register`;
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    user_type: "delivery",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, confirmPassword, user_type } = formData;

    // 1. Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(REGISTER_URL, {
        username,
        email,
        password,
        user_type, // must be "delivery"
      });

      setSuccess("User registered successfully!");
      setError("");
      console.log(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegisterClick = () => {
    setIsRegistered(true);
  };

  return (
    <div>
      {!isRegistered ? (
        <div className="bg-FAQ bg-cover">
          <div className="bg-Ridewithus w-full bg-cover h-[490px] tablet:h-[526px] laptop:h-[715px] flex justify-center laptop:justify-end items-center px-9 Llaptop:px-[9rem]">
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
              <form onSubmit={handleSubmit}>
                <div className="space-y-4 tablet:space-y-6 laptop:space-y-8 mt-3 tablet:mt-5 laptop:mt-8">
                  <div className="border-b border-[#000] space-y-2">
                    <div className="font-[500] text-[8px] tablet:text-[13px]">
                      Email
                    </div>
                    <div className="flex items-center">
                      <CiMail className="text-[1.2rem] tablet:text-[1.5rem]" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  <div className="border-b border-[#000] space-y-2">
                    <div className="font-[500] text-[8px] tablet:text-[13px]">
                      Username
                    </div>
                    <div className="flex items-center">
                      <BsPerson className="text-[1.2rem] tablet:text-[1.5rem]" />
                      <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  <div className="border-b border-[#000] space-y-2">
                    <div className="font-[500] text-[8px] tablet:text-[13px]">
                      Password
                    </div>
                    <div className="flex items-center">
                      <CiLock className="text-[1.2rem] tablet:text-[1.5rem]" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  <div className="border-b border-[#000] space-y-2">
                    <div className="font-[500] text-[8px] tablet:text-[13px]">
                      Confirm Password
                    </div>
                    <div className="flex items-center">
                      <CiLock className="text-[1.2rem] tablet:text-[1.5rem]" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-[#D2F4D6] mx-1 rounded-2xl py-3 px-4 flex justify-center items-center my-2 tablet:my-4 laptop:my-8 drop-shadow-2xl"
                >
                  <p>Register</p>
                </button>

                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                {success && (
                  <p className="text-green-600 text-sm mt-2">{success}</p>
                )}
              </form>
            </div>
          </div>
          <div className="w-[90%] mx-auto my-[3rem]">
            <p className="font-[200] text-[27px] leading-[36px]">
              Become a part of an{" "}
              <span className="font-[600] ">awesome fleet</span>
            </p>
            <div className="flex flex-col tablet:flex-row justify-between gap-2 items-center mt-7">
              <div className="flex flex-col justify-center">
                <img
                  src="/Asset/footer/frame1.svg"
                  className="w-[250px] h-[250px] tablet:w-[200px] tablet:h-[200px] laptop:w-[250px] laptop:h-[250px]"
                />
                <div className="flex mt-[1rem] gap-[1rem] items-center justify-center tablet:justify-start">
                  <p className="font-[600] text-[20px] tablet:text-[28px] laptop:text-[33px] ">
                    3Lakh+
                  </p>
                  <div className="font-[400] text-[15px] leading-[19px] text-[#364A15] ">
                    <p>restaurant</p>
                    <p>partners</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <img
                  src="/Asset/footer/frame2.svg"
                  className="w-[250px] h-[250px] tablet:w-[200px] tablet:h-[200px] laptop:w-[250px] laptop:h-[250px]"
                />
                <div className="flex mt-[1rem] gap-[1rem] items-center justify-center tablet:justify-start">
                  <p className="font-[600] text-[20px] tablet:text-[28px] laptop:text-[33px] ">
                    500+
                  </p>
                  <div className="font-[400] text-[15px] leading-[19px] text-[#364A15]">
                    <p>Cities</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <img
                  src="/Asset/footer/frame3.svg"
                  className="w-[250px] h-[250px] tablet:w-[200px] tablet:h-[200px] laptop:w-[250px] laptop:h-[250px]"
                />
                <div className="flex mt-[1rem] gap-[1rem] items-center justify-center tablet:justify-start">
                  <p className="font-[600] text-[20px] tablet:text-[28px] laptop:text-[33px] ">
                    10Cr+
                  </p>
                  <div className="font-[400] text-[15px] leading-[19px] text-[#364A15]">
                    <p>Happy</p>
                    <p>deliveries</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <img
                  src="/Asset/footer/frame4.svg"
                  className="w-[250px] h-[250px] tablet:w-[200px] tablet:h-[200px] laptop:w-[250px] laptop:h-[250px]"
                />
                <div className="flex mt-[1rem] gap-[1rem] items-center justify-center tablet:justify-start">
                  <p className="font-[600] text-[20px] tablet:text-[28px] laptop:text-[33px] ">
                    2Lakh+
                  </p>
                  <div className="font-[400] text-[15px] leading-[19px] text-[#364A15]">
                    <p>Happy</p>
                    <p>Partner</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-[#F2F2F2] rounded-xl w-full h-[530px] mt-[8rem] p-8 text-opacity-[50%]">
              <p className="font-[200] text-[21px] leading-[28px]">
                Hear from our <span className="font-[600] ">Partners</span>
              </p>
              <div className="flex flex-col tablet:flex-row gap-3 justify-around items-center tablet:items-start mt-6">
                <div className="flex flex-col justfy-center laptop:w-[500px] laptop:h-[350px] mt-7 bg-[#FFFFFF] rounded-xl relative ">
                  <FaQuoteLeft className="text-[#D2F4D6] text-[1.5rem] tablet:text-[1.8rem] laptop:text-[3rem] absolute max-tablet:-top-2 max-tablet:-left-2 tablet:-top-4 tablet:-left-4" />
                  <p className="w-[85%] mx-auto mt-9 font-[400] text-[6px] tablet:text-[12px]  laptop:text-[16px]">
                    "When I used to work as a security guard I had no job
                    guarantee, no extra benefits and very little time to rest. I
                    joined Pasar as a delivery partner six months ago, and
                    received the joining kit at my home. Since then, I have an
                    assured source of income and I also receive benefits like
                    medical insurance and EP."
                  </p>
                  <div className="m-5 flex gap-3 items-center">
                    <img
                      src="/Asset/footer/Profile.svg"
                      alt=""
                      className="w-[25px] h-[25px] tablet:w-[35px] tablet:h-[35px] laptop:w-[65px] laptop:h-[65px] "
                    />
                    <div className="font-[300] text-[4px] tablet:text-[8px] laptop:text-[12px]">
                      <p>Rahul Kumar</p>
                      <p>B.com student</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justfy-center laptop:w-[500px] laptop:h-[350px] mt-7 bg-[#FFFFFF] rounded-xl relative ">
                  <FaQuoteLeft className="text-[#D2F4D6] text-[1.5rem] tablet:text-[1.8rem] laptop:text-[3rem] absolute max-tablet:-top-2 max-tablet:-left-2 tablet:-top-4 tablet:-left-4" />
                  <p className="w-[85%] mx-auto mt-9 font-[400] text-[6px] tablet:text-[12px]  laptop:text-[16px]">
                    "When I used to work as a security guard I had no job
                    guarantee, no extra benefits and very little time to rest. I
                    joined Pasar as a delivery partner six months ago, and
                    received the joining kit at my home. Since then, I have an
                    assured source of income and I also receive benefits like
                    medical insurance and EP."
                  </p>
                  <div className="m-5 flex gap-3 items-center">
                    <img
                      src="/Asset/footer/Profile.svg"
                      alt=""
                      className="w-[25px] h-[25px] tablet:w-[35px] tablet:h-[35px] laptop:w-[65px] laptop:h-[65px] "
                    />
                    <div className="font-[300] text-[4px] tablet:text-[8px] laptop:text-[12px]">
                      <p>Rahul Kumar</p>
                      <p>B.com student</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-Ridewithus bg-opacity-50 backdrop-blur-lg  w-full bg-cover h-[490px] tablet:h-[526px] laptop:h-[715px] flex justify-center  items-center px-9 text-[#364A15]">
          <div className="bg-[#F6F6F6B2] rounded-xl py-5 tablet:py-4 w-[310px] h-[350px] tablet:w-[600px] tablet:h-[400px] laptop:w-[900px] laptop:h-[600px] flex flex-col items-center justify-around">
            <div className="w-[90%] mx-auto text-center">
              <p className="font-[500] text-[10px] leading-[18px] tablet:text-[20px] tablet:leading-[35px] laptop:text-[30px] laptop:leading-[39px]">
                Download the Application{" "}
                <span className="text-[700] text-black">Here</span>
              </p>

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
                <p className="font-[400px] text-left text-[10px] leading-[13px] tablet:text-[15px] tablet:leading-[19px] laptop:text-[23px] laptop:leading-[28px] ">
                  Ready to Get Started?
                </p>
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
  );
};

export default Ridewithus;
