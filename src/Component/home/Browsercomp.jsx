import React from "react";
import { useNavigate } from "react-router-dom";
import { PiCarrotThin } from "react-icons/pi";
import { PiBreadThin } from "react-icons/pi";
import { LuMilk } from "react-icons/lu";
import { PiOrangeThin } from "react-icons/pi";
import { GiChickenLeg } from "react-icons/gi";
import { LiaShoppingBagSolid } from "react-icons/lia";

const categories = [
  { icon: <PiCarrotThin />, label: "Vegetables" },
  { icon: <PiBreadThin />, label: "Bread and Juice" },
  { icon: <LuMilk />, label: "Milk and Dairy" },
  { icon: <PiOrangeThin />, label: "Fresh Fruits" },
  { icon: <GiChickenLeg />, label: "Non-Vegetables" },
  { icon: <LiaShoppingBagSolid />, label: "Grocery" },
];

const Browsercomp = () => {
  const navigate = useNavigate();

  const handleNavigation = (category) => {
    const searchValue = category.toLowerCase();
    navigate(`/Home/search?query=${searchValue}`);
  };

  return (
    <div className="absolute  z-30 flex items-center justify-center bg-lightgreen w-[13rem] h-[20rem] Lmobile:w-[4rem] Lmobile:h-[3rem] tablet:justify-evenly tablet:px-1 py-0 tablet:w-[500px] tablet:h-[300px] Ldesktop:w-[500px] Ldesktop:h-[100px] rounded-tr-3xl rounded-b-3xl">
      <div className="grid max-tablet:grid-cols-1 tablet:grid-cols-2 gap-3 ">
        {categories.map((item, index) => (
          <div
            key={index}
            className="py-1 px-2 tablet:py-4 tablet:px-7 flex gap-2 tablet:gap-3 bg-white rounded-xl cursor-pointer hover:bg-gray-100 active:bg-gray-200 transition-all"
            onClick={() => handleNavigation(item.label)}
          >
            {item.icon} {item.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Browsercomp;
