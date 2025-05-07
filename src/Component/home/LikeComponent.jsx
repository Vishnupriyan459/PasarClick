import React, { useState } from 'react';
import axios from 'axios';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';

const API_URL = process.env.REACT_APP_API_URL;

const LikeComponent = ({ productId, liked: initialLiked }) => {
  const [liked, setLiked] = useState(initialLiked);

  const handleClick = async () => {
    const token = localStorage.getItem('acess');
    if (!token) {
      console.warn('No token found in localStorage');
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (liked) {
        await axios.delete(`${API_URL}/users/wishlist/${productId}/`, config);
        setLiked(false);
      } else {
        await axios.post(`${API_URL}/users/wishlist/`, { product: productId }, config);
        setLiked(true);
      }
    } catch (error) {
      console.error("Wishlist update failed:", error);
    }
  };

  return (
    <button onClick={handleClick}>
      {liked ? (
        <FaHeart size={18} className="text-[#1AC84B]" />
      ) : (
        <CiHeart color="gray" size={20} />
      )}
    </button>
  );
};

export default LikeComponent;
