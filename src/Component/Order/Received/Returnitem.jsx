import React, { useEffect, useState } from "react";
import axios from "axios";
import ImageUploader from "../../../utils/ImageUploader";

const API_URL = process.env.REACT_APP_API_URL;

const Returnitem = ({ onClose, orderID }) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [reason, setReason] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleImageUpload = (file) => {
    setUploadedFile(file);
    console.log("Uploaded file:", file);
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("access");
    if (!reason.trim()) {
      alert("Please provide a reason for the return.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("orderID", orderID);
      formData.append("reason", reason);
      if (uploadedFile) {
        formData.append("image", uploadedFile);
      }

      const response = await axios.post(
        `${API_URL}/customers/refund-request/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Refund submitted:", response.data);
      setShowSuccessMessage(true);
    } catch (error) {
      console.error("Error submitting refund request:", error);
      alert("Failed to submit refund request. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 w-[100vw] h-[100vh]"
      onClick={onClose}
    >
      <div
        className="bg-[#FFFFFF] p-6 rounded-xl shadow-lg relative max-tablet:w-[13rem] tablet:w-[15rem] laptop:w-[20rem] text-[#364A15] space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-[500] max-tablet:text-[13px] tablet:text-[15px] laptop:text-[18px] text-center">
          Return Request
        </div>

        <textarea
          className="w-full px-1 bg-[#FFFFFFB2] border-2 border-opacity-[50%] rounded-lg resize-none text-[12px]"
          placeholder="Please describe the reason for your return request."
          rows="4"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <ImageUploader onUpload={handleImageUpload} />

        <div
          className="w-full bg-[#D2F4D6] flex justify-center items-center py-2 rounded-xl border-2 border-[#000] cursor-pointer"
          onClick={handleSubmit}
        >
          Submit
        </div>

        {showSuccessMessage && (
          <div className="text-green-600 text-sm text-center">
            Return request submitted successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default Returnitem;
