import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import ImageUploader from "../../../utils/ImageUploader";

const Returnitem = ({ onClose }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleSubmit = () => {
    setShowSuccessMessage(!showSuccessMessage);
  };

  const handleImageUpload = (file) => {
    console.log("Uploaded file:", file);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFFFF] p-6 rounded-xl shadow-lg relative max-tablet:w-[13rem] tablet:w-[15rem] laptop:w-[20rem] text-[#364A15] space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-[500] max-tablet:text-[13px] tablet:text-[15px] laptop:text-[18px] text-center">
          Return requests
        </div>
        <textarea
          className="w-full px-1 bg-[#FFFFFFB2] mx-auto border-2 border-opacity-[50%] rounded-lg resize-none text-[12px]"
          placeholder="Please describe the reasons for return requests."
          rows="4"
        />
        <ImageUploader onUpload={handleImageUpload} />
        <div
          className="w-full bg-[#D2F4D6] flex justify-center items-center py-2 rounded-xl border-2 border-[#000] cursor-pointer"
          onClick={handleSubmit} // Changed to onClick
        >
          Submit
        </div>
      </div>
    </div>
  );
};

export default Returnitem;
