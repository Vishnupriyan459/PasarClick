import React, { useState } from 'react';
import { BsSearch } from "react-icons/bs";
import {  FiX } from "react-icons/fi";
import { CiFilter } from "react-icons/ci"; // Icons for hamburger and close button

const Options = ({ setFilter }) => {
  const [istouched, setIstouched] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const handleFilterChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setFilter(value);
  };

  return (
    <>
      {/* Hamburger Icon for Small Screens */}
      <div className="flex items-center opacity-50 border-2 rounded-full tablet:hidden py-1 px-2 self-end">
        <CiFilter
          className="text-[10px] cursor-pointer"
          onClick={() => setShowModal(true)}
        />
        <span className='text-[10px]'>Filter</span>
      </div>

      {/* Modal Wrapper */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white w-3/4 max-w-md rounded-2xl p-5 relative">
            {/* Close Button */}
            <FiX
              className="absolute top-4 right-4 text-lg Mmobile:text-xl Lmobile:text-2xl cursor-pointer"
              onClick={() => setShowModal(false)}
            />

            {/* Search Input */}
            <div className="mb-5 mt-3">
              {!istouched ? (
                <div
                  className="border rounded-2xl Smobile:p-1 Mmobile:p-2 Lmobile:p-3 pl-3 flex items-center text-gray-500 cursor-text"
                  onClick={() => setIstouched(true)}
                >
                  <BsSearch className="mr-2" />
                  <span>{inputValue || "Search for items"}</span>
                </div>
              ) : (
                <div className="relative ">
                  <BsSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    autoFocus
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onBlur={() => !inputValue && setIstouched(false)}
                    className="border rounded-2xl p-3 pl-10 w-full"
                    placeholder="Search for items"
                  />
                </div>
              )}
            </div>

            {/* Filter Dropdown */}
            <div className="flex items-center gap-2">
              <div className='text-[10px] max-tablet:text-[14px]'>2 orders placed in</div>
              <select
                name="Lastdays"
                className="border rounded-2xl px-2 py-3 text-[10px] max-tablet:text-[14px]"
                onChange={handleFilterChange}
              >
                <option value="30">Last 30 days</option>
                <option value="7">Last 1 week</option>
                <option value="1">Last 1 day</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Regular Desktop View */}
      {/* <div className='hidden tablet:block w-1/4 mt-5 space-y-5 text-[#364A15]'>
        <div className='px-1'>
          {!istouched ? (
            <div
              className="border rounded-2xl p-3 pl-3 flex items-center text-gray-500 cursor-text"
              onClick={() => setIstouched(true)}
            >
              <BsSearch className="mr-2" />
              <span>{inputValue || "Search for items"}</span>
            </div>
          ) : (
            <div className="relative">
              <BsSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={() => !inputValue && setIstouched(false)}
                className="border rounded-2xl p-3 pl-10"
                placeholder="Search for items"
              />
            </div>
          )}
        </div>

        <div className="flex justify-items-center gap-2">
          <div>2 orders placed in</div>
          <select
            name="Lastdays"
            className="border rounded-2xl px-2 py-3"
            onChange={handleFilterChange}
          >
            <option value="30">Last 30 days</option>
            <option value="7">Last 1 week</option>
            <option value="1">Last 1 day</option>
          </select>
        </div>
      </div> */}
      <div className='hidden tablet:block w-1/4 mt-5 space-y-5 text-[#364A15] tablet:text-[8px] laptop:text-[12px] laptop:leading-[16px] Llaptop:text-[14px] Llaptop:leading-[18px]'>
      <div className='px-1'>
        {!istouched ? (
          <div
            className="border rounded-2xl p-3 pl-3 flex items-center text-gray-500 cursor-text tablet:w-[160px] laptop:w-[220px] max-Llaptop:w-[280px]"
            onClick={() => setIstouched(true)} // Show input field on click
          >
            <BsSearch className="mr-2" />
            <span>{inputValue || "Search for items"}</span>
          </div>
        ) : (
          <div className="relative">
            <BsSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              autoFocus
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)} // Update value on input
              onBlur={() => !inputValue && setIstouched(false)} // Hide input if value is empty on blur
              className="border rounded-2xl p-3 pl-10 tablet:w-[160px] laptop:w-[220px] max-Llaptop:w-[280px]"
              placeholder="Search for items"
            />
          </div>
        )}
      </div>
      <div className='flex justify- items-center gap-2 tablet:text-[8px] laptop:text-[12px] laptop:leading-[16px] Llaptop:text-[14px] Llaptop:leading-[18px] '>
        <div >2 orders placed in</div>
        <select
          name="Lastdays"
          id=""
          className='border rounded-2xl px-2 py-3 '
          onChange={handleFilterChange} // Trigger filter change
        >
          <option value="30">Last 30 days</option>
          <option value="7">Last 1 week</option>
          <option value="1">Last 1 day</option>
        </select>
      </div>
    </div>

    </>
  );
};

export default Options;
