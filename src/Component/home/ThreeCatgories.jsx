import React from "react";

const ThreeCatgories = () => {
  return (
    <div className=" flex flex-col items-center tablet:flex-row justify-around gap-9 w-[90%] mx-auto my-[3rem]">
      {/* first div */}
      <div className="bg-[#D8EBE5] rounded-xl relative px-4 py-6 w-[300px] Mmobile:w-[350px] tablet:w-[420px] h-[250px] ">
      <img
          src="Asset/home/veg.svg"
          className="z-10 absolute bottom-0 right-0"
        />
        <div className="z-20">
          <h1 className="text-[#364A15] text-[24px] font-[600] leading-[31px] w-full tablet:w-[15vw] ">
            Make your Breakfast Healthy and Easy
          </h1>
          <button className="mt-6 border-[0.72px] border-black rounded-full w-[6.93rem] h-[2.06rem] relative z-30">
            Shop now
          </button>
        </div>
        
      </div>
      {/* second div */}
      <div className="bg-[#F2EBD9] rounded-xl relative px-4 py-6 w-[300px] Mmobile:w-[350px] tablet:w-[420px] h-[250px] ">
        <div className="z-20">
          <h1 className="text-[#364A15] text-[24px] font-[600] leading-[31px] w-full tablet:w-[15vw]">
            Everyday Fresh & Clean with Our Product
          </h1>
          <button className="mt-6 border-[0.72px] border-black rounded-full w-[6.93rem] h-[2.06rem] relative z-[2]">
            Shop now
          </button>
        </div>
        <img
          src="Asset/home/meat.svg"
          className="z-[1] absolute bottom-[0] -right-[10vh] w-[20rem]"
          // right-[-10vh]
        />
      </div>
      <div className="bg-[#D8EBE5] rounded-xl relative px-4 py-6 w-[300px] Mmobile:w-[350px] tablet:w-[420px] h-[250px] ">
        <img
          src="Asset/home/organic.svg"
          className="z-10 absolute bottom-[0] -right-[10vh]"
        />
        <div className="z-20 relative">
          <h1 className="text-[#364A15] text-[24px] font-[600] leading-[31px] w-full tablet:w-[15vw]">
            The best Organic Product Online
          </h1>
          <button className="mt-6 border-[0.72px] border-black rounded-full w-[6.93rem] h-[2.06rem] z-30 relative">
            Shop now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThreeCatgories;
