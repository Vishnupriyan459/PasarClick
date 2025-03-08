import React, { useState, useRef, useEffect } from "react";
import { BsFilterCircle } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa6";
import { LiaFireAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import Browsercomp from "./Browsercomp";

const HomeNav = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [showCategories, setShowCategories] = useState(false);
  const dropdownRef = useRef(null);

  const handleClick = (button) => {
    setActiveButton(button);
  };

  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-[90%] mx-auto flex justify-center items-center">
      <div className="relative" ref={dropdownRef}>
        {/* Browse Categories Button */}
        <div
          className={`flex items-center justify-center bg-lightgreen w-[3rem] h-[2rem] Lmobile:w-[4rem] Lmobile:h-[3rem] tablet:justify-center tablet:px-2 tablet:w-[230.55px] tablet:h-[50.18px] laptop:w-[250.55px] laptop:h-[59.18px] Ldesktop:w-[500px] Ldesktop:h-[100px] 
          transition-all duration-300 ease-in-out cursor-pointer gap-2 ${
            showCategories ? "h-[3rem] tablet:h-[70px] rounded-t-3xl rounded-b-none" : "rounded-full"
          }`}
          onClick={toggleCategories}
        >
          <BsFilterCircle className="text-[15px] desktop:text-[20px] Ldesktop:text-[30px]" />
          <span className="hidden tablet:block tablet:text-[13px] laptop:text-[17px] font-[400] Ldesktop:text-[27px]">
            Browse All Categories
          </span>
          <FaAngleDown
            className={`hidden text-[15px] tablet:block desktop:text-[20px] Ldesktop:text-[30px] transition-transform ${
              showCategories ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Browser Component (Dropdown) */}
        {showCategories && <Browsercomp />}
      </div>

      <div className="flex self-center mx-2">
        <div className="border-l border-solid border-black h-10 tablet:h-[3rem] Ldesktop:h-[5rem]"></div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center justify-around gap-1">
        {[
          { name: `Hot Deals`, icon: <LiaFireAltSolid />, path: "/Home/hotdeals", hideText: true },
          { name: "Home", path: "/" },
          { name: "Shop", path: "/Home/Shop" },
          { name: "Vendor", path: "/Home/Vendor" },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center justify-center w-[3rem] h-[2rem] Mmobile:w-[3.5rem] Mmobile:h-[2.5rem] Lmobile:w-[4rem] Lmobile:h-[3rem]  tablet:w-[6rem] tablet:h-[3rem] laptop:w-[9rem] laptop:h-[4rem] Ldesktop:w-[300px] Ldesktop:h-[100px] rounded-full m-1 px-1 transition-all duration-300 ${
              activeButton === item.name ? "bg-[#F2EBD9]" : "bg-lightgreen " 
            } ${item.name==="Hot Deals"?" tablet:w-[7rem]":""}cursor-pointer`}
            onClick={() => handleClick(item.name)}
          >
            {/* Show only the icon for Hot Deals on small screens */}
            {item.icon && <span className="mr-2">{item.icon}</span>}
            
            {/* Hide text for Hot Deals on smaller screens */}
            <p className={`text-[10px] Smobile:text-xs Mmobile:text-sm Lmobile:text-base tablet:text-sm laptop:text-lg Ldesktop:text-[27px] ${
              item.hideText ? "hidden laptop:inline  " : ""
            }`}>
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeNav;
