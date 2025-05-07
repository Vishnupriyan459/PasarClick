import React, { useEffect, useState } from 'react';
import NewCheckout from './NewCheckout';
import OldCheckout from './OldCheckout';
import middleapi from '../../utils/middleapi';

const API_URL = process.env.REACT_APP_API_URL;

const Checkout = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const token = localStorage.getItem('access');
  
  // ✅ Get current geolocation and store in state
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
       
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  }, []);

  // ✅ Fetch addresses from API
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await middleapi.get(`/customers/address/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setAddresses(data);
        // console.log(data);
        
        
        
      } catch (error) {
        console.error("Error fetching addresses:", error);
        setAddresses([]); // fallback on error
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchAddresses();
    }
  }, [token]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {addresses.length ===0 ? (
        <NewCheckout latitude={location.latitude} longitude={location.longitude} />
      ) : (
        <OldCheckout
          addresses={addresses}
          latitude={location.latitude}
          longitude={location.longitude}
        />
      )}
      {/* <NewCheckout latitude={location.latitude} longitude={location.longitude} /> */}
    </div>
  );
};

export default Checkout;
