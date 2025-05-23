import React from 'react';
import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar';
import Login from './Component/Credential/Login';
import Footer from './Component/Footer/Footer';
import SignUp from './Component/Credential/SignUp';

import Search from './Component/Search/Search';
import TrackOrder from './Component/TrackOrder/TrackOrder';

import Order from './Component/Order/Order';
import NotFound from './Component/error/NotFound';
import Home from './Component/home/Home';
import ScrollToTop from './utils/ScrollToTop';
import Profile from './Component/Profile/Profile';
import OrderDeliveryStatus from './Component/TrackOrder/OrderDeliveryStatus';
import HotDealsPage from './Component/home/HotDealsPage';
// import Feedback from './Component/feedback/Feedback';
import { useDispatch } from 'react-redux';
import { setLocationData } from '../src/Redux/locationSlice';

import * as currencyCodes from 'currency-codes';
import Account from './Component/Profile/Account';





function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();
      
      
      // console.log(data.address.city);
      
      const countryName = data.address.country?.toLowerCase().trim();
      const currencyForUser = currencyCodes.data.find(item =>
        item.countries.some(c => c.toLowerCase().trim() === countryName)
      );
      
      
      dispatch(setLocationData({
        country: data.address.country,
        currency: currencyForUser?.code || 'USD',
        city:data.address.city
      }));
    });
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home/*" element={<Home />} />
          <Route path="/Home/search" element={<Search />} />
          
          
          <Route path="/Home/track-orders" element={<OrderDeliveryStatus />} />
          <Route path="/Home/orders" element={<Order/>}/>
          <Route path="/Home/profile" element={<Account/>} />
          
        
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        
        
        <Route path="*" element={<NotFound />} />
        <Route />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
