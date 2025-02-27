import React, { useState } from 'react';
import { Link,Outlet } from 'react-router-dom';
const Loginwithemail = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic for handling form submission here
    // console.log('Email:', email);
    // console.log('Password:', password);
    
    // Reset form fields
    setEmail('');
    setPassword('');
    props.verify(email) ;// Reset password field
  };

  return (
    <div className="px-5">
      <form className="flex flex-col justify-center items-center p-4" onSubmit={handleSubmit}>
        <div className="mb-5 w-full max-w-[100%]">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type='email'
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
