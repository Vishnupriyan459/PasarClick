import React, { useState, useEffect } from "react";
import { AddAddressModal } from "./Modal";
import middleapi from "../../utils/middleapi";
import axios from "axios";

const AddressManager = () => {
  const API_URL = process.env.REACT_APP_API_URL;
  const [addresses, setAddresses] = useState([]);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [editAddressData, setEditAddressData] = useState(null);
  const token = localStorage.getItem("access");
  // console.log(token);
  const openEditModal = (address) => {
    setEditAddressData(address);
    setIsAddAddressModalOpen(true);
  };

  // Fetch addresses when component mounts
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await middleapi.get(`${API_URL}/customers/address/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setAddresses(data);
        
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    if (token) {
      fetchAddresses();
    }
  }, [token]);
  // Adding token to the dependency array to refetch if token changes

  // const handleAddAddress = async (addressData) => {
  //   try {
  //     const res = await fetch(`${API_URL}/customers/address/`, {
  //       method: 'POST',
  //       headers: {

  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(addressData),
  //     });
  //     const newAddress = await res.json();
  //     setAddresses([...addresses, newAddress]);
  //   } catch (error) {
  //     console.error('Error adding address:', error);
  //   }
  // };

  const handleRemoveAddress = async (id) => {
    try {
      await middleapi(`${API_URL}/customers/address/${id}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddresses(addresses.filter((address) => address.id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  // const handleEditAddress = async (id, updatedData) => {
  //   try {
  //     const res = await fetch(`${API_URL}/customers/address/${id}/`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(updatedData),
  //     });
  //     const updatedAddress = await res.json();
  //     setAddresses(
  //       addresses.map((address) =>
  //         address.id === id ? updatedAddress : address
  //       )
  //     );
  //   } catch (error) {
  //     console.error('Error editing address:', error);
  //   }
  // };
  const handleSaveAddress = async (addressData) => {
    try {
      if (editAddressData) {
        // Edit mode - PUT
        const res = await middleapi(
          `${API_URL}/customers/address/${editAddressData.id}/`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(addressData),
          }
        );
        const updatedAddress = await res.json();
        setAddresses(
          addresses.map((addr) =>
            addr.id === updatedAddress.id ? updatedAddress : addr
          )
        );
      } else {
        // Add mode - POST
        const res = await middleapi(`${API_URL}/customers/address/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(addressData),
        });
        const newAddress = await res.json();
        setAddresses([...addresses, newAddress]);
      }

      // Close modal and clear state
      setIsAddAddressModalOpen(false);
      setEditAddressData(null);
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };
  return (
    <div className="flex gap-9 max-laptop:flex-col   ">
      <div className="mb-8 ">
        <h3 className="text-lg font-semibold mb-4">Your address</h3>
        <div className="grid max-tablet:grid-cols-1 tablet:grid-cols-2 gap-4 p-4 rounded-lg drop-shadow-xl border-[1px] bg-white laptop:w-[515px]">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="border-[1px] border-[#364A15] rounded-lg p-4 bg-[#D2F4D6]"
            >
              <div className="flex items-start gap-2">
                <div>
                  <h4 className="font-semibold">{addr.address_line_1}</h4>
                  <p className="text-sm text-gray-600">
                    {addr.city}, {addr.state} {addr.postal_code}
                  </p>
                  <div className="mt-2 flex gap-2">
                    {/* <button
                        className="text-sm text-gray-600"
                        onClick={() => handleEditAddress(addr.id, { 
                        })}
                      >
                        Edit

                      </button> */}
                    <button
                      className="text-sm text-gray-600"
                      onClick={() => openEditModal(addr)}
                    >
                      Edit
                    </button>
                    <span className="text-gray-400">|</span>
                    <button
                      className="text-sm text-gray-600"
                      onClick={() => handleRemoveAddress(addr.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 flex items-center justify-center">
            {/* <button
              onClick={() => setIsAddAddressModalOpen(true)}
              className="flex items-center gap-2 text-gray-600"
            >
              <span>Add address</span>
            </button> */}
            <button
  onClick={() => {
    setEditAddressData(null); // ensures it's an ADD
    setIsAddAddressModalOpen(true);
  }}
  className="flex items-center gap-2 text-gray-600"
>
  <span>Add address</span>
</button>

          </div>
        </div>
      </div>
      {/* <AddAddressModal
        isOpen={isAddAddressModalOpen}
        onClose={() => setIsAddAddressModalOpen(false)}
        onAddAddress={handleAddAddress}
      /> */}
      <AddAddressModal
        isOpen={isAddAddressModalOpen}
        onClose={() => {
          setIsAddAddressModalOpen(false);
          setEditAddressData(null);
        }}
        onAddAddress={handleSaveAddress}
        initialData={editAddressData}
      />
    </div>
  );
};

export default AddressManager;
