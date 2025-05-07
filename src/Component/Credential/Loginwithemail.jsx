import axios from 'axios';
import React, { useState } from 'react';
import { Link,Outlet,useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { addToWishlist, deleteFromWishlist, fetchWishlist } from '../../utils/wishlist';
const Loginwithemail = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
    const navigate = useNavigate();
  

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Add your logic for handling form submission here
    // console.log('Email:', email);
    // console.log('Password:', password);
    const userdata={
      username:e.target.email.value,
      password
    }
    try {
      const response = await axios.post(`${API_URL}/auth/login`, userdata);
      // console.log(response);
      // After login, trigger your necessary actions like fetching the wishlist
      
      localStorage.setItem("refresh",response.data.refresh);
      localStorage.setItem("access", response.data.access);
      const wishlist = await fetchWishlist();
      console.log('Fetched wishlist:', wishlist);

      Swal.fire({
        title: "Welcome to PasarClicks!",
        icon: "success",
        confirmButtonText: "Go",
        customClass: {
          confirmButton: "Custom-Login-button",
        },
      }).then(() => {
        navigate("/");
      });
    }catch (err) {
      const errorData = err.response?.data;
      let errorMessage = "Something went wrong.";
    
      if (errorData && typeof errorData === "object") {
        const firstKey = Object.keys(errorData)[0];
        errorMessage=errorData[firstKey]        
      }
    
      Swal.fire({
        title: "Oops!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
    
    // Reset form fields
    
    // props.verify(email) ;// Reset password field
  };

  return (
    <div className="px-5">
      <form className="flex flex-col justify-center items-center p-4" onSubmit={handleSubmit}>
        <div className="mb-5 w-full max-w-[100%]">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type='text'
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-5 w-full max-w-[100%]">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder='*********'
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        
        <button type="submit" className="bg-[#DEF9EC] w-[60%] px-4 py-3 rounded-3xl text-black font-semibold">Submit</button>

        <div>
          Don’t have an account?
          <Link to="/SignUp" className='px-4 text-[#27AE60] font-semibold'>Sign up</Link>
        </div>
      </form>

    </div>
  );
};

export default Loginwithemail;
