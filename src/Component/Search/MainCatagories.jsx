import {React,useState} from 'react'

const MainCatagories = () => {
  const [Activebtn,setActivebtn]=useState(null);
   const handlebtn=(btn)=>{
    setActivebtn(btn);
   }
  return (
    <div className='flex gap-5 items-center '>
        <div className={`flex gap-1 w-[75px] h-[30px] text-[7.5px]  tablet:w-[140px] tablet:h-[48px] tablet:text-[15px] tablet:leading-[26.6px] justify-center items-center  ${Activebtn==="All"?"bg-[#E5FAE6]":"bg-[#E6E6DD]"} rounded-full  hover:bg-[#E5FAE6] transition duration-300 active:border-2 border-[#000] active:duration-200 `} onClick={()=>handlebtn("All")}>All</div>
        <div className={`flex gap-1 w-[75px] h-[30px] text-[7.5px]  tablet:w-[140px] tablet:h-[48px] tablet:text-[15px] tablet:leading-[26.6px] justify-center items-center ${Activebtn==="Store"?"bg-[#E5FAE6]":"bg-[#E6E6DD]"} rounded-full hover:bg-[#E5FAE6] transition duration-300 active:border-2 border-[#000] active:duration-200 `} onClick={()=>handlebtn("Store")}><img src="/Asset/Search/Store.svg" alt="" className='w-[20px] h-[20px] tablet:w-[24px] tablet:h-[25px]'/>Store</div>
        <div className={`flex gap-1 w-[75px] h-[30px] text-[7.5px]  tablet:w-[140px] tablet:h-[48px] tablet:text-[15px] tablet:leading-[26.6px] justify-center items-center ${Activebtn==="Groceries"?"bg-[#E5FAE6]":"bg-[#E6E6DD]"} rounded-full  hover:bg-[#E5FAE6] transition duration-300 active:border-2 border-[#000] active:duration-200 `} onClick={()=>handlebtn("Groceries")}><img src="/Asset/Search/Store.svg" alt="" className='w-[20px] h-[20px] tablet:w-[24px] tablet:h-[25px]' />Groceries</div>
    </div>
  )
}

export default MainCatagories;