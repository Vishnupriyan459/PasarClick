import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import ImageUploader from '../../utils/ImageUploader';
import { PiStarFill,  PiStarThin } from "react-icons/pi";


const Feedback = ({ onClose, feedback, order }) => {
  const [feedbackType, setFeedbackType] = useState(feedback);
  const [starRating, setStarRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [vendorInput, setVendorInput] = useState('');
  const [filteredVendors, setFilteredVendors] = useState([]);
  

  const getEmoji = (position) => {
    switch (position) {
      case 5:
        return '😄'; // Very Good
      case 4:
        return '🙂'; // Good
      case 3:
        return '😐'; // Neutral
      case 2:
        return '😕'; // Bad
      case 1:
        return '😢'; // Very Bad
      default:
        return '';
    }
  };

  const getFeedbackText = (position) => {
    switch (position) {
      case 5:
        return 'Very Good';
      case 4:
        return 'Good';
      case 3:
        return 'Neutral';
      case 2:
        return 'Bad';
      case 1:
        return 'Very Bad';
      default:
        return 'Rate your experience';
    }
  };

  const handleImageUpload = (file) => {
    console.log('Uploaded file:', file);
  };

  const handleSelectVendor = (event) => {
    setVendorInput(event.target.value);
  };

  const handleSelectChange = (event) => {
    setFeedbackType(event.target.value);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50" onClick={onClose}>
      <div
        className="bg-[#FFFFFF] p-6 rounded-xl shadow-lg relative max-tablet:w-[13rem] tablet:w-[15rem] laptop:w-[20rem] text-[#364A15] space-y-3"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="font-[500] max-tablet:text-[13px] tablet:text-[15px] laptop:text-[18px] text-center">
          Write a review
        </div>
        <div className='space-y-2 w-full flex flex-col items-center'>
          <div className='flex justify-center items-center w-full gap-2'>
            <div className='max-tablet:text-[7px] tablet:text-[8px] laptop:text-[12px]'>Write a review</div>
            <select 
               
              onChange={handleSelectChange} 
              className='font-[300] bg-[#FFFFFFB2] border-2 bg-opacity-50 rounded-full max-tablet:py-[3px] max-tablet:px-[2px] tablet:py-[5px] tablet:px-[4px] laptop:py-[8px] laptop:px-[12px] max-tablet:text-[6px] tablet:text-[10px] laptop:text-[12px]'
            >
              <option value="seller Feedback">Seller Feedback</option>
              <option value="delivery Feedback">Delivery Feedback</option>
              <option value="product Feedback">Product Feedback</option>
            </select>
          </div>

          {feedbackType === 'seller Feedback' && (
            <div className="feedback-block text-[100] laptop:text-[12px] w-full">
              <select onChange={handleSelectVendor} className='border-2 bg-[#FFFFFFB2] border-opacity-[50%] rounded-xl max-tablet:py-[3px] max-tablet:px-[3px] tablet:py-[5px] tablet:px-[4px] laptop:py-[8px] laptop:px-[12px] text-[12px] w-full'>
                <option value="">Select the vendor</option>
                {order.order.Product_detail.map((product, index) => (
                  <option key={index} value={product.vendorId}>{product.vendor}</option>
                ))}
              </select>
            </div>
          )}

          {feedbackType === 'product Feedback' && (
            <div className="feedback-block w-full text-[12px] flex justify-center items-center">
              <select onChange={handleSelectVendor} className='border-2 bg-[#FFFFFFB2] border-opacity-[50%] rounded-xl max-tablet:py-[3px] max-tablet:px-[2px] tablet:py-[5px] tablet:px-[4px] laptop:py-[8px] laptop:px-[12px] text-[12px] w-full'>
                <option value="">Select the Product</option>
                {order.order.Product_detail.map((product, index) => (
                  <option key={index} value={product.productId}>{product.productName}</option>
                ))}
              </select>
            </div>
          )}

          <div className="flex flex-col items-center space-y-2">
            <p className="text-gray-600 text-[12px]">{getFeedbackText(hoverRating || starRating)}</p>
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
                        ? 'fill-[#FABF35] stroke-[#FABF35]'
                        : 'fill-[#E8E8E8] stroke-[#E8E8E8]'
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
            className='w-full px-1 bg-[#FFFFFFB2] mx-auto border-2 border-opacity-[50%] rounded-lg resize-none text-[12px]' 
            placeholder='Write a review' 
            rows="4"
          />
        </div>
        <ImageUploader onImageUpload={handleImageUpload} />
        <div className='w-full bg-[#D2F4D6] flex justify-center items-center py-2 rounded-xl border-2 border-[#000] cursor-pointer'>
          Next
        </div>
      </div>
    </div>
  );
};

export default Feedback;