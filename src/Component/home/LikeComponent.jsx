import {React,useEffect,useState} from 'react'
import { CiHeart } from "react-icons/ci";
import { FaHeart} from "react-icons/fa";
const LikeComponent = ({like}) => {
    const [filled, setFilled] = useState(like);
    
    
    const toggleHeart = () => {
        setFilled(!filled);
    };
  return (
    <div onClick={toggleHeart} style={{ cursor: 'pointer' }}>
      {filled ? (
        <FaHeart className='w-[17.94 px] h-[15.37px]' style={{ color: 'red'}} />
      ) : (
        <CiHeart className='w-[17.94 px] h-[15.37px]' style={{ color: 'black' }} />
      )}
      </div>
  )
}

export default LikeComponent