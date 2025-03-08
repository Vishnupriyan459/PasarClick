import React from "react";
import { Routes, Route } from 'react-router-dom';
import HomeNav from "./HomeNav";
import NearbyShop from "./NearbyShop";
import FeaturedProducts from "./FeaturedProducts";
import Banar from "./Banar";
import DailyBestSells from "./DailyBestSells";
import RankCatagories from "./RankCatagories";
import ThreeCatgories from "./ThreeCatgories";
import Shop from "../Shop/Shop";
import Vendor from "../Vendor/Vendor"
import ShopProduct from "../Shop/ShopProduct";
import VendorDetails from "../Vendor/VendorDetails"
import "./Home.css";
import Breadcrumbs from "../Breadcrumbs";
import Cart from '../Cart/Cart';
import  NewCheckout from "../Cart/NewCheckout";



import FAQ from '../Footer/FAQ';
import CookiePolicy from'../Footer/CookiePolicy';
import Partnerwithus from '../Footer/Partnerwithus';
import PrivacyPolicy from '../Footer/PrivacyPolicy';
import Ridewithus from '../Footer/Ridewithus';
import TermsCondition from '../Footer/Terms&Condition';
import Chatbox from '../Chatbox/Chatbox';
import HotDealsPage from "./HotDealsPage";
import OldCheckout from "../Cart/OldCheckout";

const Home = () => {
  return (
    <>
      <HomeNav />
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={
          <>
            <Banar />
            <ThreeCatgories />
            <NearbyShop />
            <FeaturedProducts />
            <DailyBestSells />
            <RankCatagories />
          </>
        } />
        <Route path="shop/*" element={<Shop />}/>
        <Route path="shop/:productId" element={<ShopProduct />} />
           
        <Route path="hotdeals" element={<HotDealsPage/>}/>
        <Route path="cart" element={<Cart />} />
        <Route path="vendor/*" element={<Vendor />}/>
        <Route path="vendor/:vendorId" element={<VendorDetails />} />
        <Route path="Terms&Condition" element={<TermsCondition/>}/>
        <Route path="CookiePolicy" element={<CookiePolicy/>}/>
        <Route path="Partnerwithus" element={<Partnerwithus/>}/>
        <Route path="PrivacyPolicy" element={<PrivacyPolicy/>}/>
        <Route path='Ridewithus' element={<Ridewithus/>}/>
        <Route path="FAQ" element={<FAQ/>}/>
        <Route path='Chatbot' element={<Chatbox/>}/>
        <Route path="Checkout" element={<OldCheckout/>}/>

      </Routes>
    </>
  );
};

export default Home;
