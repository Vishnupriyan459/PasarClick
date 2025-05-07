import React from 'react';
import { Link } from 'react-router-dom';

const Banar = () => {
  return (
    <div className="flex justify-center py-10 w-[90%] mx-auto">
      <div className="overflow-hidden flex flex-row justify-center gap-4 mx-2 relative">
        <div className="bg-[#D8EBE5]  Smobile:w-full Lmobile:w-[500px] tablet:w-[450px] laptop:w-[800px] Llaptop:w-[853px] Llaptop:h-[480px] desktop:w-[95rem] desktop:h-[50rem] rounded-lg relative">
          <div className="absolute top-0 right-0 h-full w-full z-0">
            <img
              src="Asset/home/pngwing.svg"
              className="object-cover opacity-[0.5] tablet:opacity-[0.8] h-full w-full"
            />
          </div>
          <div className="m-9 relative z-10 h-full flex flex-col gap-1 flex-shrink-0">
            <div className=''>
              <h1 className="text-[#364A15] font-[700] text-[2rem] tablet:text-[40px] tablet:leading-[56.31px] laptop:text-[60px] laptop:leading-[78.31px] desktop:text-[120px] desktop:leading-[110px] desktop:mb-2">
                Fresh Vegetables <br />
                Big discount
              </h1>
              <p className="text-[#364A15] text-[1rem] desktop:text-[2.5rem] font-[500] font-[Lufga] leading-[26.1px]">
                Search for your product
              </p>
            </div>
            <div>
              <form className="  flex p-2 bg-[#FFFFFF] justify-between gap-1 content-center text-[0.5rem] tablet:text-[0.6rem] laptop:text-[1rem] w-[15rem] h-[3rem] laptop:w-[569px] tablet:w-[400px]  tablet:h-[60px] laptop: rounded-full mt-8">
                <input
                  type="text"
                  placeholder="What are you looking for today?"
                  className="ps-5 border-none rounded-full w-full"
                />
                <button className="rounded-full  laptop:h-[2.5rem] tablet:w-[138.26px]  p-2 bg-[#3BB77E] text-white hover:bg-[#079755]">
                  Order Now!
                </button>
              </form>
              {/* <div className="font-poppins text-[16px]">
                <p className="text-[15px] tablet:text-[18px] font-semibold">
                  Popular states in Malaysia
                </p>
                <div className="flex justify-evenly w-1/2 mt-5 gap-2 text-[12px] tablet:text-[16px]">
                  <p>Selangor</p>
                  <p>Johor</p>
                  <p>Penang</p>
                  <p>Sarawak</p>
                  <p>Sabah</p>
                </div> 
              </div>*/}
            </div>
          </div>
          {/* <div className="absolute bottom-5 flex gap-2 justify-center opacity-50 mx-auto w-full z-20">
            <div className="w-3 border-2 border-zinc-950 rounded-full h-2 bg-[#000000]"></div>
            <div className="w-3 border-2 border-gray-800 rounded-full h-2 bg-[#ffffff]"></div>
            <div className="w-3 border-2 border-gray-800 rounded-full h-2 bg-[#ffffff]"></div>
          </div> */}
        </div>
        <div className="overflow-hidden  Smobile:hidden tablet:block tablet:w-[300px] Llaptop:w-[423px] Llaptop:h-[480px] desktop:w-[55rem] desktop:h-[50rem] bg-[#F2EBD9] relative rounded-lg font-[Lufga] h-full px-4 py-6">
          <div className="absolute bottom-[-5.5rem] right-[-1] w-full h-full z-0">
            <img
              src="Asset/home/pngwing-3.svg"
              className="object-contain h-full w-full"
            />
          </div>
          <div className="relative z-10">
            <div className="text-[#364A15] text-[40px] font-[600] leading-[52px]">
              Delivery to your{" "}
              <span className="text-[#364A1580] opacity-80">HOME</span>
            </div>
            <Link to='/home/shop' className="mt-8 border-[0.72px] border-black rounded-full w-[7.93rem] h-[3.06rem] py-1 px-2 ">
              shop now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banar;
