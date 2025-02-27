import React, { useState, useEffect, useRef } from 'react';
import Filter from './Filter';
import Sort from './Sort';

const SubCategories = () => {
    const [activeButtons, setActiveButtons] = useState([]); // State to track active buttons
    const filterRef = useRef(null);
    const sortRef = useRef(null);
    const [filtsort, setfiltsort] = useState([]);
    const categories = ["Fast", "New", "Fresh", "Meats", "Veg", "Off"]; // Categories for buttons

    const handleButtonClick = (btn) => {
        setActiveButtons((prev) => {
            const isActive = prev.includes(btn);
            
            // If "Filter" is clicked and "Sort" is active, deactivate "Sort"
            if (btn === "Filter" && prev.includes("Sort")) {
                return ["Filter"];
            }
            // If "Sort" is clicked and "Filter" is active, deactivate "Filter"
            if (btn === "Sort" && prev.includes("Filter")) {
                return ["Sort"];
            }

            // Toggle the clicked button
            return isActive
                ? prev.filter(activeBtn => activeBtn !== btn) // Remove if already active
                : [...prev, btn]; // Add if not active
        });
    };

    // Close only Filter and Sort dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                filterRef.current && !filterRef.current.contains(event.target) &&
                sortRef.current && !sortRef.current.contains(event.target)
            ) {
                setActiveButtons((prev) => prev.filter(btn => btn !== "Filter" && btn !== "Sort")); // Only remove "Filter" and "Sort"
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='flex flex-wrap items-center gap-2 tablet:gap-4 text-[15px] leading-[26px]'>
            {/* Filter Button */}
            <div className='relative' ref={filterRef}>
                <div 
                    className={`w-[38px] h-[38px] rounded-full flex justify-center items-center hover:bg-[#E5FAE6] ${activeButtons.includes("Filter") ? "bg-[#E5FAE6]" : "bg-[#E6E6DD]"}`} 
                    onClick={() => handleButtonClick("Filter")}
                >
                    <img src="/Asset/Search/filter.svg" alt="Filter" />
                </div>
                <div className={`w-[270px] rounded-xl bg-[#E9E9E9] absolute px-3 py-4 z-30 mt-2 ${activeButtons.includes("Filter") ? "" : "hidden"}`}>
                    <Filter />
                </div>
            </div>

            {/* Sort Button */}
            <div 
                className={`flex justify-between px-3 w-[75px] h-[30px] text-[7.5px] tablet:w-[140px] tablet:h-[48px] tablet:text-[15px] rounded-full items-center ${activeButtons.includes("Sort") ? "bg-[#E5FAE6]" : "bg-[#E6E6DD]"}`} 
                onClick={() => handleButtonClick("Sort")} 
                ref={sortRef}
            >
                <div className='relative flex w-full justify-evenly items-center'>
                    <div>Sort By</div>
                    <img src="/Asset/Search/downvec.svg" alt="Sort" className='w-[7px] h-[4px] tablet:w-[14px] h-[8px]' />
                </div>
                <div className={`w-[270px] rounded-xl bg-[#E9E9E9] absolute px-3 py-4 z-30 mt-[25rem]  ${activeButtons.includes("Sort") ? "" : "hidden"}`}>
                    <Sort />
                </div>
            </div>

            {/* Divider */}
            <div className="flex self-center mx-2 hidden tablet:block">
                <div className="border-l border-solid border-black h-10 tablet:h-[2.5rem] Ldesktop:h-[5rem]"></div>
            </div>

            {/* Category Buttons */}
            {categories.map((item) => (
                <div 
                    key={item} 
                    className={`flex justify-center w-[75px] h-[30px] text-[7.5px] tablet:w-[140px] tablet:h-[48px] tablet:text-[15px] rounded-full items-center flex-shrink-0 ${activeButtons.includes(item) ? "bg-[#E5FAE6]" : "bg-[#E6E6DD]"} hover:bg-[#E5FAE6]`} 
                    onClick={() => handleButtonClick(item)}
                >
                    {item === "Off" ? "Offers" : item}
                </div>
            ))}
        </div>
    );
};

export default SubCategories;
