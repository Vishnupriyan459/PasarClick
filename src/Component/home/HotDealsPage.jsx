import React from "react";
import { BiSolidBadge } from "react-icons/bi";
import { Link } from "react-router-dom";

const hotDeals = [
  { id: 1, name: "Veganfood", discount: 50, image: "Asset/hotdeals/img1.svg",vendorId: 1 },
  { id: 2, name: "LeafGreens", discount: 30, image: "Asset/hotdeals/img2.svg",vendorId: 3 },
  { id: 3, name: "Chilli Market", discount: 40, image: "Asset/hotdeals/img3.svg",vendorId: 7 },
  { id: 4, name: "Veganfood", discount: 20, image: "Asset/hotdeals/img5.svg",vendorId: 1 },
  { id: 5, name: "SizzlingStreak", discount: 10, image: "Asset/hotdeals/img6.svg",vendorId: 9 },
  { id: 6, name: "Veganfood", discount: 60, image: "Asset/hotdeals/img7.svg",vendorId: 1 },
  { id: 7, name: "LeafGreens", discount: 25, image: "Asset/hotdeals/img8.svg", vendorId: 3  },

];

const HotDealsGrid = () => {
  const handleVendorClick = (id) => {
    console.log(`Clicked on deal with id: ${id}`);
  };

  return (
    <>
     <div className="flex flex-col justify-center items-center text-[#364A15]">
        <div className="font-[600] max-tablet:text-[30px] tablet:text-[40px] laptop:text-[50px] Llaptop:text-[60px]">
          Hot Deals
        </div>
        <div className="max-tablet:text-[7px] tablet:text-[10px] laptop:text-[15px] Llaptop:text-[20px]">
          See what deals are going
        </div>
      </div>
    <div className="grid grid-cols-4 gap-3 my-10 w-[90%] tablet:w-[80%] mx-auto">
      {hotDeals.map((deal, index) => {
        // Determine column span dynamically
        let colSpan;
        if (index === 0) {
          colSpan = "col-span-4"; // First item spans full width
        }else if(index===3){
          colSpan="col-span-2 tablet:col-span-3"
          
        }
        else if(index===4){
          colSpan="col-span-2 tablet:col-span-1"
        } 
        else if ((index + 1) % 5 === 0) {
          colSpan = "col-span-1"; // Every 5th item spans 1 column
        } else {
          colSpan = "col-span-2"; // Default to 2 columns
        }

        return (
          <Link to={`/home/vendor/${deal.vendorId}`}
            key={deal.id}
            className={`${colSpan} h-[200px] laptop:h-[500px] rounded-xl bg-grey-600 relative`}
            onClick={() => handleVendorClick(deal.id)}
          >
            {/* Discount Badge */}
            <div className="absolute -top-5 -right-5 text-[4rem] flex items-center justify-center max-tablet:w-[3rem] max-tablet:h-[3rem] tablet:w-[5rem]  tablet:h-[5rem] laptop:w-[7rem] laptop:h-[7rem]">
              <BiSolidBadge className="text-[7rem] max-tablet:h-50 tablet:h-56 laptop:h-64 w-full text-gradient-to-r from-zinc-600 via-zinc/60 to-white-600 opacity-70" />
              <span className="absolute text-white text-[0.5rem] tablet:text-[1rem] laptop:text-[2rem] font-bold">{deal.discount}%</span>
            </div>

            {/* Image */}
            <img src={deal.image} alt={deal.name} className="w-full h-full object-cover rounded-xl" />

            {/* Overlay */}
            <div className="absolute bottom-0 w-full tablet:h-[3rem] laptop:h-[4rem] max-tablet:text-[0.5rem] tablet:text-[.7rem] laptop:text-[1rem] bg-white bg-opacity-50 flex items-center justify-start p-3">
              <span className="text-black font-bold">{deal.name}/{deal.discount} off</span>
            </div>
          </Link>
        );
      })}
    </div>
    </>
  );
};

export default HotDealsGrid;
