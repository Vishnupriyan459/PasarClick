import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

const PhoneNumberInput = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("IN"); // Default to India

  // Function to validate length
  const handleNumberChange = (value) => {
    // Remove non-numeric characters
    const numericValue = value ? value.replace(/\D/g, "") : "";

    // Limit between 7 and 15 digits
    if (numericValue.length >= 7 && numericValue.length <= 15) {
      setPhoneNumber(value);
    }
  };

  return (
    <div className="w-full mx-auto p-4  rounded-md">

      {/* Phone Input with validation */}
      <PhoneInput
        international
        defaultCountry={selectedCountry} // Default: India (IN)
        value={phoneNumber}
        onChange={handleNumberChange}
        className="border p-2 rounded w-[100%]"
        placeholder="Enter phone number"
      />

      {/* Display selected phone number */}
      {phoneNumber && <p className="mt-2">Selected Number: {phoneNumber}</p>}
    </div>
  );
};

export default PhoneNumberInput;
