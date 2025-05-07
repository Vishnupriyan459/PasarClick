import React from 'react'
import Profile from './Profile'
import AddressManager from './Address'
import Cart from './Cart'
import Dashboard from './Dashboard'

const Account = () => {
  return (
    <div className='bg-profile_bg'>
    <Profile />

    <div className="flex gap-9 max-laptop:flex-col w-[90vw] mx-auto justify-between flex-wrap">
       <div>
        <AddressManager />
        <Cart/>
        </div>
        <Dashboard />

    </div>

    
    </div>
  )
}

export default Account