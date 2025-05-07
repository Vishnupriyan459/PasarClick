import {React} from 'react';

import RatingStar from './RatingStar';
import LikeComponent from './LikeComponent';

const VendorCard = ({  vendorName, locationName, starCount, time, href,like,productImg }) => {
  return (
    
  <div className="shrink-0 relative flex flex-col justify-center items-center w-[280px] Lmobile:w-[363px] h-[250px] rounded-xl font-[Lufga]  font-[400]  " style={{backgroundImage: `url(${productImg})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
  <div className='absolute bottom-[-4rem] mx-auto w-[250px] Lmobile:w-[296px] h-[171px] bg-[#ffffff] rounded-xl shadow-3xl p-2 flex flex-col justify-evenly'>
  
    <div className='flex justify-between items-center '>
      <div>
        <h2 className='text-[14px] font-[400] leading-[18.27px] text-[#364A15]'>{vendorName}</h2>
        <p className='text-[10px] leading-[13.05px] opacity-[50%]'>{locationName}</p>
      </div>
      {/* <LikeComponent like={like} /> */}
      
      
    </div>
    
    
    
      <RatingStar starCounts={starCount}/>
    
    {/* <p className='flex gap-1'><img src="Asset/Vendor/VendorBanner/NearByShop.svg" alt='NearByShop'/>{time} </p> */}
    <a href={href} className='bg-lightgreen rounded-xl  w-[168px] h-[38px] mx-auto flex justify-center items-center'>View</a>
  </div>
</div>

  );
};

// Default props
// VendorCard.defaultProps = {
//   productImg:"Asset/Vendor/FreshChoice.svg",
//   vendorName: 'ABZ Vendor',
//   locationName: 'Texas',
//   starCount: 4,
//   time: '10 min',
//   href: '#',
//   like:false
// };

export default VendorCard;
