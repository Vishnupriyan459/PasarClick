import React, { useState } from "react";
import { BsFilterCircle } from "react-icons/bs";
import { FaAngleDown } from "react-icons/fa6";
import { LiaFireAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

const HomeNav = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div className="w-[90%] mx-auto flex justify-center items-center">
      <div className="flex items-center justify-center bg-lightgreen w-[3rem] h-[2rem] Lmobile:w-[4rem] Lmobile:h-[3rem] tablet:justify-evenly tablet:px-2  tablet:w-[291.55px] tablet:h-[59.18px] Ldesktop:w-[500px] Ldesktop:h-[100px] rounded-full">
        <BsFilterCircle className="text-[15px] desktop:text-[20px] Ldesktop:text-[30px]" />
        <span className="hidden tablet:block tablet:text-[13px] laptop:text-[17px] font-[400] Ldesktop:text-[27px] ">
          Browse All Categories
        </span>
        <FaAngleDown className="hidden text-[15px] tablet:block desktop:text-[20px] Ldesktop:text-[30px]" />
      </div>

      <div className="flex self-center mx-2">
        <div className="border-l border-solid border-black h-10 tablet:h-[3rem] Ldesktop:h-[5rem]"></div>
      </div>

      <div className="flex items-center justify-around gap-1">
        <div
          className={`flex items-center justify-center w-[3rem] h-[2rem] Mmobile:w-[3.5rem] Mmobile:h-[2.5rem] Lmobile:w-[4rem] Lmobile:h-[3rem]  tablet:w-[7rem] tablet:h-[4rem]  laptop:w-[9rem] laptop:h-[4rem] Ldesktop:w-[300px] Ldesktop:h-[100px] rounded-full m-1 px-1 ${
            activeButton === "Hot Deals" ? "bg-[#F2EBD9]" : "bg-lightgreen"
          } cursor-pointer`}
          onClick={() => handleClick("Hot Deals")}
        >
          <LiaFireAltSolid className="text-[15px] desktop:text-[20px] Ldesktop:text-[30px]" />
          <p className="ml-2 hidden tablet:block text-[17px] font-[400] Ldesktop:text-[27px]">Hot Deals</p>
        </div>
        <Link
          to="/"
          className={`flex items-center justify-center w-[3rem] h-[2rem] Mmobile:w-[3.5rem] Mmobile:h-[2.5rem] Lmobile:w-[4rem] Lmobile:h-[3rem]  tablet:w-[7rem] tablet:h-[4rem]  laptop:w-[9rem] laptop:h-[4rem]   Ldesktop:w-[300px] Ldesktop:h-[100px]  rounded-full m-1 px-1 ${
            activeButton === "Home" ? "bg-[#F2EBD9]" : "bg-lightgreen"
          } cursor-pointer`}
          onClick={() => handleClick("Home")}
        >
          <p className="text-[10px] Smobile:text-xs Mmobile:text-sm Lmobile:text-base tablet:text-lg Ldesktop:text-[27px]">Home</p>
        </Link>
        <Link
          to="/Home/Shop"
          className={`flex items-center justify-center w-[3rem] h-[2rem] Mmobile:w-[3.5rem] Mmobile:h-[2.5rem] Lmobile:w-[4rem] Lmobile:h-[3rem]  tablet:w-[7rem] tablet:h-[4rem]  laptop:w-[9rem] laptop:h-[4rem]  Ldesktop:w-[300px] Ldesktop:h-[100px]  rounded-full m-1 px-1 ${
            activeButton === "Shop" ? "bg-[#F2EBD9]" : "bg-lightgreen"
          } cursor-pointer`}
          onClick={() => handleClick("Shop")}
        >
          <p className="text-[10px] Smobile:text-xs Mmobile:text-sm Lmobile:text-base tablet:text-lg Ldesktop:text-[27px]">Shop</p>
        </Link>
        <Link
          to="/Home/Vendor"
          className={`flex items-center justify-center w-[3rem] h-[2rem] Mmobile:w-[3.5rem] Mmobile:h-[2.5rem] Lmobile:w-[4rem] Lmobile:h-[3rem]  tablet:w-[7rem] tablet:h-[4rem]  laptop:w-[9rem] laptop:h-[4rem]  Ldesktop:w-[300px] Ldesktop:h-[100px]  rounded-full m-1 px-1 ${
            activeButton === "Vendor" ? "bg-[#F2EBD9]" : "bg-lightgreen"
          } cursor-pointer`}
          onClick={() => handleClick("Vendor")}
        >
          <p className="text-[10px] Smobile:text-xs Mmobile:text-sm Lmobile:text-base tablet:text-lg Ldesktop:text-[27px]">Vendor</p>
        </Link>
      </div>
      
    </div>
  );
};

export default HomeNav;
