import React, { useState, useRef, useEffect } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import { CiSearch,CiUser } from "react-icons/ci";
import Feedback from './feedback/Feedback'; // Import Feedback component

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  // const [isFeedbackVisible, setIsFeedbackVisible] = useState(false); // Add state for Feedback modal
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
        setIsSearchActive(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchValue !== '') {
      navigate(`/Home/search?query=${searchValue.toLowerCase()}`);
      setSearchValue('');
    }
  };

  // const toggleFeedback = () => setIsFeedbackVisible(!isFeedbackVisible);

  return (
    <header className='font-[Lufga] font-[400] w-full'>
      <nav className='flex flex-row justify-between laptop:px-10 w-full'>
        <Link to="/" className='self-center'>
          <img src="Asset/nav/Icon.svg" alt="Pasar Click" className='desktop:w-[12rem] desktop:h-[12rem]' />
        </Link>
        <div className='Smobile:block Mmobile:block Lmobile:block tablet:hidden self-center'>
          <RxHamburgerMenu
            className='text-[2rem] opacity-60'
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
        <div className='hidden tablet:flex items-center content-center gap-5 laptop:gap-8'>
          {isSearchActive ? (
            <form onSubmit={handleSearchSubmit} className='flex items-center justify-center'>
              <input
                ref={searchInputRef}
                type="text"
                placeholder={`Search... `}
                className='rounded-full bg-[#E5FAE6] p-2 desktop:w-[30rem] desktop:h-[5rem] desktop:text-[2rem]'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
          ) : (
            <div
              className='rounded-full w-14 bg-[#E5FAE6] p-5 cursor-pointer'
              onClick={() => setIsSearchActive(true)}
            >
              <CiSearch />
            </div>
          )}
          <Link to="/Home/cart" className='rounded-full w-14 bg-[#E5FAE6] p-5 relative'>
            <img src="Asset/nav/shopping-basket.svg" alt="Cart" />
            <div className='bg-[#364A15] text-center rounded-full absolute px-2 top-0 right-0 text-[#f8fafc]'>1</div>
          </Link>
          {/* <Link to="/Home/track-orders" className='rounded-full w-14 bg-[#E5FAE6] p-5'>
            <img src="Asset/nav/delivery-tracking.svg" alt="Track Orders" />
          </Link> */}
          <Link to="/Home/orders" className='rounded-full w-14 bg-[#E5FAE6] p-5'>
            <img src="Asset/nav/pack.svg" alt="Your Orders" />
          </Link>
          {/* <div className='rounded-full w-14 bg-[#E5FAE6] p-5 cursor-pointer' >
            <img src="Asset/nav/chat-bot.svg" alt="Chatbot" />
          </div> */}
          <Link to="/login" className='rounded-full w-14 bg-[#E5FAE6] p-5'>
            <img src="Asset/nav/login.svg" alt="Login" />
          </Link>
          <Link to="/Home/Profile" className='rounded-full w-14 bg-[#E5FAE6] p-5'>
            <CiUser />
          </Link>
        </div>
      </nav>
      {showMenu && (
        <div className='flex flex-col justify-center gap-5 bg-[#ffffff] w-full h-1/2 p-2 tablet:hidden'>
          {isSearchActive ? (
            <form onSubmit={handleSearchSubmit} className='flex items-center w-full'>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search..."
                className='rounded-full bg-[#E5FAE6] p-2 w-full'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
          ) : (
            <div
              className='flex justify-between p-1 hover:bg-[#E5FAE6] rounded-xl'
              onClick={() => setIsSearchActive(true)}
            >
              <p>Search</p>
              <img src="Asset/nav/search.svg" alt="Search" />
            </div>
          )}
          <Link to="/Home/cart" className='flex justify-between relative p-1 hover:bg-[#E5FAE6] rounded-xl'>
            <p>Cart</p>
            <img src="Asset/nav/shopping-basket.svg" alt="Cart" />
            <div className='bg-[#364A15] text-center text-xs rounded-full absolute px-1 top-0 right-0 text-[#f8fafc]'>1</div>
          </Link>
          {/* <Link to="/Home/track-orders" className='flex justify-between p-1 hover:bg-[#E5FAE6] rounded-xl'>
            <p>Track orders</p>
            <img src="Asset/nav/delivery-tracking.svg" alt="Track Orders" />
          </Link> */}
          <Link to="/Home/orders" className='flex justify-between p-1 hover:bg-[#E5FAE6] rounded-xl'>
            <p>Your Orders</p>
            <img src="Asset/nav/pack.svg" alt="Your Orders" />
          </Link>
          {/* <div className='flex justify-between p-1 hover:bg-[#E5FAE6] rounded-xl cursor-pointer' >
            <p>Chatbot</p>
            <img src="Asset/nav/chat-bot.svg" alt="Chatbot" />
          </div> */}
          <Link to="/Home/Profile" className='flex justify-between p-1 hover:bg-[#E5FAE6] rounded-xl cursor-pointer'>
          <p>Profile</p>
            <CiUser />
            
          </Link>
          <Link to="/login" className='flex justify-start p-1 hover:bg-[#E5FAE6] rounded-xl'>
            <p>Sign out</p>
            <img src="Asset/nav/login.svg" alt="Login" />
          </Link>
        </div>
      )}
      
    </header>
  );
};

export default Navbar;
