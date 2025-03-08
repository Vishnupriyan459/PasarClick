import React from 'react'
import LikeComponent from '../home/LikeComponent'
import RatingStar from '../home/RatingStar'
import { Link, Outlet } from 'react-router-dom';

const VendorCard = ({vendorId,Vendoricon,VendorName,like,starCount,category}) => {
  return (
    <>
    <div className='w-[237px]  rounded-xl bg-[ #D4D4D430] px-3 py-2 border-solid border-2 border-[#D4D4D480] h-[300px] space-y-3 w-[250px] Mmobile:w-[160px] tablet:w-[227px]  tablet:h-[380px] laptop:h-[350px] flex flex-col justify-evenly'>
        <img src={Vendoricon} className='w-[208px] h-[167px] rounded-md' alt={Vendoricon}/>
        <div className='flex justify-between '>
        <Link to={`/home/Vendor/${vendorId}`}><p>{VendorName}</p> </Link>
            <p><LikeComponent like={like} /></p>
        </div>
        <RatingStar starCounts={starCount}/>
        <div className='flex justify-between'>
            <p className='py-1 px-2 rounded-xl bg-[#D9D9D933]'>{category}</p>
            <Link to={`/home/Vendor/${vendorId}`}>
            <div
            className={`w-[76px] h-[38px] flex justify-center items-center rounded-xl bg-[#DEF9EC] cursor-pointer hover:bg-[#1AC84B] hover:text-[#fff]`}
            
            
          >
            
            vist
            
          </div>
          </Link>
        </div>




    </div>
    </>
  )
}

export default VendorCard