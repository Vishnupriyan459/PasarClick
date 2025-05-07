import React from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Optional but good

const CornerToastAlert = () => {
  const showToast = () => {
    Swal.fire({
      toast: true,
      position: 'top-end', // Can be 'bottom-end', 'top-start', etc.
      icon: 'success',
      title: 'File uploaded successfully!',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: '#1f2937', // Tailwind's gray-800
      color: '#fff',
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
  };

  return (
    <button
      onClick={showToast}
      className="p-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
    >
      Show Corner Toast
    </button>
  );
};

export default CornerToastAlert;
