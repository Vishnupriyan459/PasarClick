import React from 'react'

const AdditionalInfo = () => {
  return (
    
        
        <div className=' flex justify-center items-center h-screen 'style={
                {fontFamily:'Lufga',fontWeight:400}}>
           <div className='overflow-visible  bg-[#ffffff] mx-1 h-[100vh]  md:h-[600px] md:w-[1204px] rounded-lg flex flex-row items-center justify-center shadow-2xl px-8'>
                    <form className='flex flex-row md:flex-row gap-2'>
                        
                            <div className='mx-4 '>
                                <h1 className="sm:text-center md:text-start sm:text-[26px] leading-[26.99px] md:text-[36px] leading-[46.99px]" >Address</h1>
                                <p className="sm:text-center md:text-start sm:text-[15px] leading-[19.1px] md:text-[20px] leading-[26.1px]">Enter your delivery address for a completed shopping experience in Pasar Click</p>
                                <div className='flex flex-col gap-2 my-2'>
                                    <label htmlFor="building">Room / building</label>
                                    <input type="text" name='building' id='building' className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" placeholder='eg. 31,aplex building' />
                                    <label htmlFor="Street">Street</label>
                                    <input type="text" name='Street' id='Street' className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" placeholder='eg. bazzar street' />
                                    <label htmlFor="States" >States</label>
                                    <input type="text" name='States' id='States' className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" placeholder='eg. Pondicherry' />
                                    <label htmlFor="Post code">Post code</label>
                                    <input type="text" name='Post code' id='Post code' className="w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" placeholder='eg. 607 108' />

                                </div>
                            </div>
                        
                        
                            <div className='mx-4'>
                                <h1 className="sm:text-center md:text-start sm:text-[26px] leading-[26.99px] md:text-[36px] leading-[46.99px]" >Payment Information</h1>
                                <p className="sm:text-center md:text-start sm:text-[15px] leading-[19.1px] md:text-[20px] leading-[26.1px]">Add your credit card information to speed up the check out process.</p>
                                <div className='flex flex-col gap-2 my-2'>
                                    <label htmlFor="Card number">Card number</label>
                                    <input type="text" name='Card number' id='Card number' className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" placeholder='0000 0000 0000 0000' maxLength={16} minLength={16} />
                                    <div className='flex flex-row gap-4'>
                                            <div>
                                                <label htmlFor="States" >Expire date</label>
                                                <input type="text" name='States' id='States' className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" placeholder='MM/YYYY'/>

                                            </div>
                                            <div>
                                                <label htmlFor="States" >CVV</label>
                                                <input type="text" name='States' id='States' className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300" placeholder='xxx' />

                                            </div>
                                    </div>
                                    <p className='opacity-75'>
                                        By pressing ‘Continue,’ you acknowledge that you have read and understood our information collection policy
                                    </p>
                                    <div className='flex flex-row item-center justify-evenly my-4 gap-2 w-full'>
                                        
                                            <button  className=" px-4 py-3 text-black opacity-70 font-semibold underline">Skip</button>
                                        
                                        
                                            <button type="submit" className="bg-[#DEF9EC] w-1/2 px-4 py-3 rounded-3xl text-black font-semibold">Submit</button>

                                        
                                    </div>

                                </div>
                            </div>
                        
                        
                    </form>
                    
                        <div className='hidden rotate-90 md:block'>
                            <span  style={{ fontFamily:'Lufga',fontWeight:400,fontSize:'50px',lineHeight:'104.41px',opacity:'0.4', padding:'0px' }}>SignUp</span>

                        </div>
                    
           </div>
        </div>
        
    
  )
}

export default AdditionalInfo