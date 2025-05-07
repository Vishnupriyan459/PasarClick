import React, { useEffect, useState } from "react";
import ImageUploader from "../../utils/ImageUploader";

const Report = ({ onClose, order }) => {
  const [ReportType, setReportType] = useState('');
  const [checkedItems, setCheckedItems] = useState({});
  const [vendorInput, setVendorInput] = useState("");
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (order.order?.items) {
      const initialState = order.order.items.reduce((acc, product) => {
        acc[product.id] = false;
        return acc;
      }, {});
      setCheckedItems(initialState);
    }
  }, [order]);

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const handleImageUpload = (file) => {
    console.log("Uploaded file:", file);
  };

  const handleSelectVendor = (event) => {
    setVendorInput(event.target.value);
  };

  const handleSelectChange = (event) => {
    setReportType(event.target.value);
  };

  const handleSubmit = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 2000);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

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
          Report
        </div>

        {!showSuccessMessage ? (
          <>
            <div className="space-y-3 w-full flex flex-col items-center">
              <div className="flex justify-center items-center w-full gap-2">
                <div className="max-tablet:text-[7px] tablet:text-[8px] laptop:text-[12px]">
                  Reason for report
                </div>
                <select
                  onChange={handleSelectChange}
                  className="font-[300] bg-[#FFFFFFB2] border-2 bg-opacity-50 rounded-full tablet:py-[5px] tablet:px-[4px] laptop:py-[8px] laptop:px-[12px] max-tablet:text-[6px] tablet:text-[10px] laptop:text-[12px]"
                >
                  <option value="">Select reason</option>
                  <option value="Missed delivery">Missed delivery</option>
                  <option value="delivery Feedback">Missed items</option>
                </select>
              </div>

              <div className="w-full flex flex-col gap-1 text-[12px]">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-2 py-1 bg-[#FFFFFFB2] border-2 border-opacity-[50%] rounded-lg text-[12px]"
                  placeholder="Enter your email"
                />
              </div>

              {ReportType === "delivery Feedback" && (
  <div className="feedback-block w-full text-[12px]">
    <div className="mb-1">Select missed items</div>
    <div className="flex flex-col gap-1 max-h-[100px] overflow-y-auto pr-1 border border-gray-200 rounded-md">
      {order.order.items.map((product, index) => (
        <label key={index} htmlFor={product.id} className="flex items-center gap-2 px-1">
          <input
            type="checkbox"
            id={product.id}
            value={product.id}
            checked={checkedItems[product.id] || false}
            onChange={handleCheckboxChange}
          />
          {product.productName}
        </label>
      ))}
    </div>
  </div>
)}


              <div className="w-full flex flex-col gap-1 text-[12px]">
                <label htmlFor="note">Add Note</label>
                <textarea
                  id="note"
                  className="w-full px-2 py-1 bg-[#FFFFFFB2] border-2 border-opacity-[50%] rounded-lg resize-none text-[12px]"
                  placeholder="Write a review"
                  rows="4"
                />
              </div>

              <ImageUploader onImageUpload={handleImageUpload} />

              <div
                className="w-full bg-[#D2F4D6] flex justify-center items-center py-2 rounded-xl border-2 border-[#000] cursor-pointer"
                onClick={handleSubmit}
              >
                Submit
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-center text-green-600 text-[12px]">
              Thank you for submitting your request. We will promptly process it and communicate the outcome via email.
            </div>
            <div
              className="w-full bg-[#D2F4D6] flex justify-center items-center py-2 rounded-xl border-2 border-[#000] cursor-pointer"
              onClick={onClose}
            >
              Close
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Report;
