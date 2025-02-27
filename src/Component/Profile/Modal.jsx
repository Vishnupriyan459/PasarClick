import React, { useState } from 'react';
import { X } from 'lucide-react';

// Dialog component for reuse
const Dialog = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg w-full max-w-md p-6 mx-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {title}
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Add Card Modal
export const AddCardModal = ({ isOpen, onClose, onAddCard }) => {
  const [cardData, setCardData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddCard(cardData);
    onClose();
  };

  const titleContent = (
    <div className="flex items-center gap-2">
      <div className="p-2 bg-green-100 rounded-full">
        <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      </div>
      <div>
        <h3 className="text-lg font-medium">Add card</h3>
        <p className="text-sm text-gray-500">Add your credit / debit card</p>
      </div>
    </div>
  );

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={titleContent}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Cardholder's Name</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500"
            placeholder="Enter cardholder's full name"
            value={cardData.cardholderName}
            onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Card Number</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500"
            placeholder="0000 0000 0000 0000"
            value={cardData.cardNumber}
            onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Expiry date</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500"
              placeholder="MM/YY"
              value={cardData.expiryDate}
              onChange={(e) => setCardData({ ...cardData, expiryDate: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">CVV</label>
            <input
              type="password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500"
              placeholder="•••"
              maxLength="3"
              value={cardData.cvv}
              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
              required
            />
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Your card information is secured with advanced encryption technology.
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add Card
          </button>
        </div>
      </form>
    </Dialog>
  );
};

// Add Address Modal
export const AddAddressModal = ({ isOpen, onClose, onAddAddress }) => {
  const [addressData, setAddressData] = useState({
    building: '',
    street: '',
    state: '',
    postcode: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddAddress(addressData);
    onClose();
  };

  const titleContent = (
    <div>
      <h3 className="text-lg font-medium">Address</h3>
      <p className="text-sm text-gray-500">Enter your delivery address for a completed shopping experience in Pasar Click</p>
    </div>
  );

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title={titleContent}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Room / building</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500"
            value={addressData.building}
            onChange={(e) => setAddressData({ ...addressData, building: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Street</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500"
            value={addressData.street}
            onChange={(e) => setAddressData({ ...addressData, street: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">States</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500"
            value={addressData.state}
            onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Post code</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-green-500 focus:outline-none focus:ring-green-500"
            value={addressData.postcode}
            onChange={(e) => setAddressData({ ...addressData, postcode: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Add Address
          </button>
        </div>
      </form>
    </Dialog>
  );
};