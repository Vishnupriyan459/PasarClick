import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import ImageUploader from "../../utils/ImageUploader";
import { PiStarFill, PiStarThin } from "react-icons/pi";
import axios from "axios";

const Feedback = ({ onClose, feedback, order }) => {
  const [feedbackType, setFeedbackType] = useState(feedback);
  const [starRating, setStarRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [vendorInput, setVendorInput] = useState();
  const [filteredVendors, setFilteredVendors] = useState([]);
  const [userId, setUserId] = useState(null);
  const [reviewMessage, setReviewMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get(`${ API_URL }/customers/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserId(response.data.id); // adjust if needed
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserId();
  }, []);

  // const handleSubmitReview = async () => {
  //   try {
  //     const token = localStorage.getItem("access");
  
  //     if (!userId || !starRating) {
  //       alert("Please rate and try again.");
  //       return;
  //     }
  
  //     if (
  //       feedbackType === "seller Feedback" ||
  //       feedbackType === "product Feedback"
  //     ) {
  //       if (!vendorInput) {
  //         alert("Please select a vendor or product.");
  //         return;
  //       }
  //     }
  
  //     const payload = {
  //       user: userId,
  //       rating: starRating,
  //       rating_message: reviewMessage,
  //     };
  
  //     if (feedbackType === "seller Feedback") {
  //       payload.vendor = vendorInput;
  //     } else if (feedbackType === "product Feedback") {
  //       payload.product = vendorInput;
  //     } else if (feedbackType === "delivery Feedback") {
  //       payload.type = "delivery"; // add a type to distinguish it server-side
  //     }
  
  //     await axios.post(`${API_URL}/vendors/ratings`, payload, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  
  //     alert("Review submitted successfully!");
  //     onClose();
  //   } catch (error) {
  //     console.error("Error submitting review:", error);
  //     alert("Failed to submit review.");
  //   }
  // };
  const handleSubmitReview = async () => {
    try {
      const token = localStorage.getItem("access");
  
      if (!userId || !starRating) {
        alert("Please rate and try again.");
        return;
      }
  
      let vendorId = null;
  
      if (feedbackType === "seller Feedback" || feedbackType === "product Feedback") {
        if (!vendorInput) {
          alert("Please select a vendor or product.");
          return;
        }
        vendorId = vendorInput;
      } else if (feedbackType === "delivery Feedback") {
        vendorId = order.vendor_id; // Pass vendor directly for delivery feedback
      }
  
      const payload = {
        user: userId,
        vendor: vendorId,
        rating: starRating,
        rating_message: reviewMessage,
        // feedback_type: feedbackType.toLowerCase(), // optional: send feedback type too
      };
  
      await axios.post(`${API_URL}/vendors/ratings`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert("Review submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };
  

  const getEmoji = (position) => {
    switch (position) {
      case 5:
        return "😄"; // Very Good
      case 4:
        return "🙂"; // Good
      case 3:
        return "😐"; // Neutral
      case 2:
        return "😕"; // Bad
      case 1:
        return "😢"; // Very Bad
      default:
        return "";
    }
  };

  const getFeedbackText = (position) => {
    switch (position) {
      case 5:
        return "Very Good";
      case 4:
        return "Good";
      case 3:
        return "Neutral";
      case 2:
        return "Bad";
      case 1:
        return "Very Bad";
      default:
        return "Rate your experience";
    }
  };

  const handleImageUpload = (file) => {
    console.log("Uploaded file:", file);
  };

  const handleSelectVendor = (event) => {
    setVendorInput(event.target.value);
  };

  const handleSelectChange = (event) => {
    setFeedbackType(event.target.value);
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
          Write a review
        </div>
        <div className="space-y-2 w-full flex flex-col items-center">
          <div className="flex justify-center items-center w-full gap-2">
            <div className="max-tablet:text-[7px] tablet:text-[8px] laptop:text-[12px]">
              Write a review
            </div>
            <select
              onChange={handleSelectChange}
              className="font-[300] bg-[#FFFFFFB2] border-2 bg-opacity-50 rounded-full max-tablet:py-[3px] max-tablet:px-[2px] tablet:py-[5px] tablet:px-[4px] laptop:py-[8px] laptop:px-[12px] max-tablet:text-[6px] tablet:text-[10px] laptop:text-[12px]"
            >
              <option value="seller Feedback">Seller Feedback</option>
              <option value="delivery Feedback">Delivery Feedback</option>
              <option value="product Feedback">Product Feedback</option>
            </select>
          </div>

          {feedbackType === "seller Feedback" && (
            <div className="feedback-block text-[100] laptop:text-[12px] w-full">
              <select
                onChange={handleSelectVendor}
                className="border-2 bg-[#FFFFFFB2] border-opacity-[50%] rounded-xl max-tablet:py-[3px] max-tablet:px-[3px] tablet:py-[5px] tablet:px-[4px] laptop:py-[8px] laptop:px-[12px] text-[12px] w-full"
              >
                <option value="">Select the vendor</option>
                {/* {order.items.map((product, index) => ( */}
                {/* <option key={index} value={product.vendorId}>{product.vendor}</option> */}
                <option value={order.vendor_id}>{order.vendor_name}</option>
                {/* ))} */}
              </select>
            </div>
          )}

          {feedbackType === "product Feedback" && (
            <div className="feedback-block w-full text-[12px] flex justify-center items-center">
              <select
                onChange={handleSelectVendor}
                className="border-2 bg-[#FFFFFFB2] border-opacity-[50%] rounded-xl max-tablet:py-[3px] max-tablet:px-[2px] tablet:py-[5px] tablet:px-[4px] laptop:py-[8px] laptop:px-[12px] text-[12px] w-full"
              >
                <option value="">Select the Product</option>
                {order.items.map((product, index) => (
                  // <option key={index} value={product.productId}>{product.productName}</option>
                  <option key={index} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col items-center space-y-2">
            <p className="text-gray-600 text-[12px]">
              {getFeedbackText(hoverRating || starRating)}
            </p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className="relative cursor-pointer"
                  onMouseEnter={() => setHoverRating(index)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setStarRating(index)}
                >
                  <Star
                    className={`transition-colors text-[100px] ${
                      index <= (hoverRating || starRating)
                        ? "fill-[#FABF35] stroke-[#FABF35]"
                        : "fill-[#E8E8E8] stroke-[#E8E8E8]"
                    }`}
                  />
                  {index <= (hoverRating || starRating) && (
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">
                      {getEmoji(index)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <textarea
            className="w-full px-1 bg-[#FFFFFFB2] mx-auto border-2 border-opacity-[50%] rounded-lg resize-none text-[12px]"
            placeholder="Write a review"
            rows="4"
            value={reviewMessage}
            onChange={(e) => setReviewMessage(e.target.value)}
          />
        </div>
        {/* <ImageUploader onImageUpload={handleImageUpload} /> */}
        <div
          className="w-full bg-[#D2F4D6] flex justify-center items-center py-2 rounded-xl border-2 border-[#000] cursor-pointer"
          onClick={handleSubmitReview}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default Feedback;
