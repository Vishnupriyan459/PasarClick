import React from 'react'

const Productcatg = ({img,name,noofproduct}) => {
  return (
    <div className='max-Mmobile:w-[80px] max-Mmobile:h-[70px] max-tablet:w-[120px] max-tablet:h-[100px] tablet:w-[120px] tablet:h-[150px] laptop:w-[135px] laptop:h-[160px] Llaptop:w-[170px] Llaptop:h-[220px] bg-white  border-2  rounded-md tablet:rounded-xl text-center flex flex-col justify-center items-center p-1'>
        
        <img src={img} alt={name} className='w-[40px] h-[40px] tablet:w-[70px] tablet:h-[70px] laptop:w-[80px] laptop:h-[80px] Llaptop:w-[100px] Llaptop:h-[100px]'/>
        <div className='max-Lmobile:text-[8px] max-tablet:text-[10px] opacity-70'>{name}</div>
        {noofproduct!=0&&
        <div className='max-Lmobile:text-[4px] max-tablet:text-[6px] max-laptop:text-[8px] max-Llaptop:text-[10px] opacity-70'>{noofproduct===0?0:noofproduct} products</div>
        }
    </div>
  )
}

export default Productcatg;

Productcatg.defaultProps={
    img: "/Asset/products/Strawberry.svg",
    name:"Fruit"

}
// "/Asset/products/Strawberry.svg"