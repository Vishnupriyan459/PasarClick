import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ToogleButton from "./ToogleButton";
import axios from "axios";

const CookiePolicy = () => {
  const [toggleStates, setToggleStates] = useState({
    Essential: false,
    Personalization: false,
    Analytics: false,
    Research: false,
  });

  useEffect(() => {
    // Fetch toggle states from the JSON file
    const getToggleData = async () => {
      try {
        const response = await axios.get("/Data/Personalization.json");
        console.log("Fetched data:", response.data.personalization[0]);
        setToggleStates(response.data.personalization[0]); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching toggle data:", error);
      }
    };

    getToggleData();
  }, []);

  const handleToggleChange = (title, value) => {
    setToggleStates((prevStates) => ({
      ...prevStates,
      [title]: value,
    }));
  };

  // Simulate POST request on state change
  useEffect(() => {
    const sendToggleData = async () => {
      try {
        // Replace with your backend API URL if available
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          toggleStates
        );
        console.log("Toggle data sent successfully:", response.data);
      } catch (error) {
        console.error("Error sending toggle data:", error);
      }
    };

    sendToggleData();
  }, [toggleStates]);

  return (
    <div className="tablet:mt-[1rem] laptop:mt-[1rem] pb-[1rem] bg-FAQ bg-cover w-[100%] ">
      <div className="w-[90vw] mx-auto space-y-3 h-full">
        <div className="font-[700] text-[#364A15] text-[14px] tablet:text-[25px] laptop:text-[27px] max-tablet:text-center">
          Cookie Policy
        </div>
        <p className="font-[400] text-[8px] tablet:text-[14px] laptop:text-[18px] text-[#494949]">
          This website uses cookies, pixel tags, and local storage for performance and marketing purposes. We use our own cookies and some from third parties. If you opted to accept any non-Essential cookies, you can change or customize your selection at any time by changing the boxes checked below. To learn more about our privacy practices, please see our
          <Link to="/Home/PrivacyPolicy" className="font-[500] text-[#1AC84B]">
            {" "}
            Privacy Policy
          </Link>
          .
        </p>

        <div className="flex flex-col gap-5 ">
          {/* Toggle Buttons */}
          {Object.keys(toggleStates).map((key) => (
            <div
              key={key}
              className="w-full rounded-xl bg-[#F6F6F6B2] bg-opacity-70 py-3 flex items-center gap-[1rem] px-[2rem] tablet:gap-[4rem] tablet:px-[4rem] "
            >
              <ToogleButton
                title={key}
                isAvailable={toggleStates[key]}
                onToggle={handleToggleChange}
              />
              <div className="space-y-1 text-[#364A15] ">
                <h1 className="font-[500] text-[12px] leading-[18px] tablet:text-[20px] tablet:leading-[28px] laptop:text-[28px] laptop:leading-[33px] ">
                  {key}
                </h1>
                <p className="font-[400] text-[10px] tablet:text-[16px] laptop:text-[20px]">
                  {/* Add descriptive text based on the key */}
                  Description for {key}.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;
