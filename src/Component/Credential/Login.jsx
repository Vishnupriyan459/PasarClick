
import React, { useState } from 'react';
import Loginwithnumber from './Loginwithnumber';
import Loginwithemail from './Loginwithemail';
import OtpVerification from './OtpVerification';
import Navbar from '../Navbar';
import './Login.css'
const Login = () => {
  const [isoptionClicked, setIsOptionClicked] = useState(true);
  const [verification,setverification]=useState(false);
  const [name,setname]=useState('')
  const handleClick = () => {
    setIsOptionClicked(!isoptionClicked);
    
  };
  const verify=(item)=>{
    setverification(!verification)
    setname(item);
  } 
  return (
    <div className='login-block'>
      {/* <Navbar /> */}
      <div className=' flex justify-center items-center h-screen '>
  <div className='tablet:overflow-visible gap-4 bg-[#ffffff] mx-8 relative h-[500px] w-[1204px] rounded-lg flex flex-row items-center justify-between shadow-2xl '>
    <div className=' hidden tablet:flex justify-center items-center w-[450px]'>
      <p className=' -rotate-90 ' style={{ fontFamily:'Lufga',fontWeight:400,fontSize:'50px',lineHeight:'104.41px',opacity:'0.5' }}>login</p>
      <div className=' w-[300px] h-[600px]  overflow-hidden -mt-[244px] -mb-[244px]'>
        <img src="Asset/vegetables-layout.svg" alt="vegetables" className="object-cover w-full h-full rounded-lg" />
      </div>
    </div>
    <div className='flex-grow justify-self-center ' style={
      {fontFamily:'Lufga',fontWeight:400}}>
       <div className='mx-5 text-center'>
        <h1 className="sm:text-center md:text-start sm:text-[26px] leading-[26.99px] md:text-[36px] leading-[46.99px]">Login</h1>
        <p className="sm:text-center md:text-start sm:text-[15px] leading-[19.1px] md:text-[20px] leading-[26.1px]">Welcome to Pasar Click. Please sign in to access your information.</p>
      </div>



      
      <div className='flex justify-items-stretch px-4'>
        <div className={`flex-grow border-b-2 ${isoptionClicked?'border-b-bordergreen':'border-gray-500 opacity-50'} border-transparent text-center py-5 h-[3rem]`} onClick={handleClick}>Mobile</div>
        <div className={`flex-grow border-b-2 ${isoptionClicked?'border-gray-500 opacity-50':'border-b-bordergreen'} border-transparent text-center py-5 h-[3rem]`} onClick={handleClick}>Email</div>
      </div>
      
      {/* {isoptionClicked ?<Loginwithnumber verify={verify}/>:<Loginwithemail verify={verify}/>} */}
      {verification ?
      <OtpVerification name={name}/>
  : (isoptionClicked ? <Loginwithnumber verify={verify}/> : <Loginwithemail verify={verify}/>)
}

    </div>
  </div>
</div>
    
    
    
    </div>
      
    
    
  );
};

export default Login;
