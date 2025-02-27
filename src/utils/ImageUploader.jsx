// src/components/ImageUploader.jsx
import React, { useState } from 'react';
import { GoPlus } from "react-icons/go"; // Importing the Plus icon from React Icons

const ImageUploader = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImage(previewUrl); // Set image preview URL
      onImageUpload(file); // Pass the file to the parent component
    }
  };

  const handleRemoveImage = () => {
    setImage(null); // Clear the image preview
  };

  return (
    <div className="w-full flex flex-col justify-center items-center   rounded-xl overflow-hidden ">
      {/* Hidden file input */}
      {!image && (
        <div className='w-full h-[5rem] laptop:h-[8rem] border-[#9E9E9E40] border-2 rounded-lg border-dashed text-[12px]'>
        <label className="cursor-pointer flex flex-col justify-center items-center h-full  ">
          <GoPlus className="text-xl text-gray-500 hover:text-gray-700 " />
          <span>Add Image</span>
           {/* Plus icon */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden" // Hide the file input
          />
        </label>
        </div>
      )}

      {/* Display image preview and remove button */}
      {image && (
        <div className="flex flex-col items-center ">
          <img src={image} alt="Preview"  className='max-tablet:w-[150px] max-tablet:h-[100px] tablet:w-[200px] tablet:h-[120px] laptop:w-[250px] laptop:h-[150px] bg-cover rounded-xl' />
          <button
            onClick={handleRemoveImage}
            className="mt-2 px-2 py-1  text-[8px] hover:bg-red-400 hover:text-white rounded-full"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
