import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import RatingStar from '../home/RatingStar';
import VendorReview from './VendorReview';
import { ProductCard } from '../home/productcard';
import Filter from '../Search/Filter';
import Products from '../home/Products';
import OffCount from '../OffCount';
import VendorProductCard from './VendorProductCard';
import { MdVerified } from "react-icons/md";
import middleapi from '../../utils/middleapi';

const VendorDetails = () => {
  const [vendors, setVendors] = useState([]);
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [info, setInfo] = useState('Description');
  const [infoContent, setInfoContent] = useState('');
  const { vendorId } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;
  const [ratingFilter, setRatingFilter] = useState(0);
  // Fetch vendors using Axios
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await axios.get(`${API_URL}/vendors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setVendors(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch vendors');
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("access");
        const response = await middleapi.get(`${API_URL}/orders/vendor/${vendorId}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data); // Don't forget `.data`
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, [vendorId]);

  // Match vendor based on vendorId or name
  useEffect(() => {
    if (vendors.length > 0 && vendorId) {
      const selectedVendor = vendors.find((v) =>
        String(v.id) === String(vendorId) ||
        v.VendorName?.toLowerCase() === vendorId.toLowerCase()
      );
        
      setVendor(selectedVendor);

      if (selectedVendor) {
        setInfoContent(selectedVendor.description);
        setInfo('Description');
      }
    }
  }, [vendors, vendorId]);
  const filteredProducts = products.filter((product) => {
    const rating = product?.rating || 0;
    return rating >= ratingFilter;
  });
  

  const handleInfoChange = (type) => {
    setInfo(type);
    if (!vendor) return;

    switch (type) {
      case 'Description':
        setInfoContent(vendor.description);
        break;
      case 'AdditionalInfo':
        setInfoContent(
          <div className='flex justify-around max-tablet:flex-col'>
            <img src={"/Asset/Vendor/VendorBanner/GreenGarden.svg"} alt="" />
            <div className='mt-[2rem] space-y-4'>
              <div><span className='font-bold'>Phone Number</span>: {vendor?.contact_number || 'N/A'}</div>
              <div><span className='font-bold'>Address:</span> {vendor?.address}</div>
              <div><span className='font-bold'>Vendor store:</span> {vendor?.store_name || 'N/A'}</div>
            </div>
          </div>
        );
        break;
      case 'Review':
        setInfoContent(<VendorReview review={vendor.ratings}/>);
        break;
      default:
        setInfoContent(vendor.description);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!vendor) return <p>No vendor found</p>;

  return (
    <div className="w-full m-1 bg-cart_bg text-[#364A15] p-1">
      {/* Top Banner */}
      <div className='h-[23rem] tablet:h-[25rem]'>
        <div className='w-[90%] mx-auto h-64 relative'>
          <div
            className='bg-cover w-full h-full rounded-2xl'
            style={{ backgroundImage: `url(/Asset/Vendor/VendorBanner/GreenGarden.svg)`, backgroundPosition: 'center', backgroundSize: 'cover' }}
          >
            <div className='absolute -bottom-[25%] tablet:-bottom-[40%] left-[5%] flex items-end gap-[1rem]'>
              <div className='w-[100px] h-[100px] tablet:w-[215px] tablet:h-[215px] overflow-hidden rounded-3xl shadow-xl'>
                <img src={`${vendor.profile_picture}`} alt={vendor.store_name} className='w-full h-full' />
              </div>
              <div className="tablet:ml-4">
                <h1 className="text-[20px] tablet:text-[40px] leading-[52px] font-[600] flex gap-2 items-center">{vendor.store_name} <span>{vendor.is_verified?<MdVerified className='text-[#1AC84B]'/>:""}</span></h1>
                <div className='ml-2'><RatingStar starCounts={vendor.rating} /></div> 
                <div className='ml-2'>Total sales:{vendor.total_sales}</div> 

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Tabs */}
      <div className="max-tablet:px-7 tablet:w-[50%] laptop:w-[40%] flex gap-10 tablet:mx-[6rem] px-2 mt-20">
        <div onClick={() => handleInfoChange('Description')} className={`${info === 'Description' ? 'font-bold border-b-4 border-[#7CCA86]' : ''}`}>Description</div>
        <div onClick={() => handleInfoChange('AdditionalInfo')} className={`${info === 'AdditionalInfo' ? 'font-bold border-b-4 border-[#7CCA86]' : ''}`}><span className="hidden tablet:inline">Additional</span> Info</div>
        <div onClick={() => handleInfoChange('Review')} className={`${info === 'Review' ? 'font-bold border-b-4 border-[#7CCA86]' : ''}`}>Review</div>

      </div>

      <div className='mx-[1rem] my-[1rem]'>
        {infoContent}
      </div>

      {/* Products & Sidebar */}
      <div className='flex max-laptop:justify-center justify-start gap-2 mt-5  mx-auto'>
        <div className='max-laptop:hidden laptop:block bg-[#E9E9E9] w-[15rem] py-3 px-2 rounded-xl h-full'>
        <Filter setRatingFilter={setRatingFilter} />

        </div>
        <div>
        <div className="grid grid-cols-1 sm:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 Llaptop:grid-cols-3  gap-3 desktop:grid-cols-4 gap-4 p-2 my-2">
          {/* Conditionally render products only if data is available */}
          {filteredProducts && filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <>
              <VendorProductCard
                key={product.id}
                product={product}
                vendorId={vendorId}
                rating={product.index}
              />
              
              </>
            ))
            
          ) : (
            <p>No products available for this vendor.</p>
          )}
        </div>
        </div>
      </div>

      {/* <OffCount /> */}
    </div>
  );
};

export default VendorDetails;
