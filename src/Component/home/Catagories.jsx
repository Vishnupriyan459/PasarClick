import React, { useState } from "react";

const Categories = ({ setCategory }) => {
  const [selected, setSelected] = useState("All");

  const items = [
    "All",
    "Fresh Fruits",
    "Milks & Dairies",
    "Meat",
    "Vegetables",
  ];

  const handleCategoryClick = (item) => {
    setSelected(item);
    setCategory(item); // Pass the selected category to the parent component
  };

  return (
    <div className="hidden tablet:flex justify-end items-center gap-4 font-[400] text-[7.5px] leading-[9.79px] w-full">
      {items.map((item, index) => [
        <div
          key={item}
          className={`border-black border rounded-xl w-[65.99px] h-[25.5px] flex justify-center items-center cursor-pointer ${
            selected === item ? "bg-lightgreen" : "bg-[#ffff] "
          }`}
          onClick={() => handleCategoryClick(item)}
        >
          {item}
        </div>,
        index === 0 && (
          <div
            key={`line-${index}`}
            className="w-[1px] h-[25.5px] bg-black"
          />
        ),
      ])}
    </div>
  );
};

export default Categories;
