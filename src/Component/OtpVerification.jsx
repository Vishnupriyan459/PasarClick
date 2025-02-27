import React, { useState, useEffect, useRef } from 'react';

const OtpVerification = (props) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(60);
  const [resendClickable, setResendClickable] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [timeLeft]);

  useEffect(() => {
    // Enable resend button when timeLeft becomes zero
    if (timeLeft === 0) {
      setResendClickable(true);
    }
  }, [timeLeft]);

  const handleChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move cursor to next input if current input is not empty
    if (value !== '' && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (index < 3) {
        inputRefs.current[index + 1].focus();
      }
    } else if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      // Move cursor to previous input if Backspace is pressed and current input is empty
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    console.log(otpString);
    if (otpString === '1234') {
      console.log('OTP Verified');
      alert('OTP Verified');
    } else {
      console.log('OTP is not verified');
      alert('OTP is not verified');
    }
    setOtp(['', '', '', '']);
  };

  const handleResend = () => {
    console.log('Resend OTP');
    setTimeLeft(60);
    setResendClickable(false);
  };

  return (
    <div className='flex flex-col items-center gap-5 py-2 '>
      <div>A One-Time Password has been sent to {props.name}</div>
      <div>Please Enter OTP</div>
      <div>Time left: {timeLeft} seconds</div>
      <div className="grid grid-cols-4 gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 border border-gray-300 rounded-md text-center"
              ref={(el) => (inputRefs.current[index] = el)}
            />
          ))}
        </div>
      
        
        <button onClick={handleSubmit} className='bg-[#DEF9EC] w-[60%] px-4 py-3 rounded-3xl text-black font-semibold'>Submit</button>
        <button onClick={handleResend} disabled={!resendClickable}>
          Resend
        </button>
        <button>Enter wrong number ?</button>
      
    </div>
  );
};

export default OtpVerification;
