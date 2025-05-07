import React from 'react';
import Swal from 'sweetalert2';

const AlertButton = () => {
  const showAlert = () => {
    Swal.fire({
      title: 'Awesome!',
      text: 'This is a modern alert in React.',
      icon: 'success',
      confirmButtonText: 'Cool 😎'
    });
  };

  return (
    <button onClick={showAlert} className="p-2 bg-blue-600 text-white rounded">
      Show Alert
    </button>
  );
};

export default AlertButton;
