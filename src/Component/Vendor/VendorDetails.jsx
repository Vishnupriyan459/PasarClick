import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors } from '../../Redux/VendorsSlice';
import { useParams } from 'react-router-dom';
import RatingStar from '../home/RatingStar';
import VendorReview from './VendorReview';
import Filter from '../Search/Filter';
import Products from '../home/Products';
import OffCount from '../OffCount';


const VendorDetails = () => {
  const [vendor, setVendor] = useState(null);
  const [info, setInfo] = useState('Description');
  const [infoContent, setInfoContent] = useState('');
  const { vendorId } = useParams();
  const dispatch = useDispatch();
  const { items: vendors, loading, error } = useSelector((state) => state.vendors);

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  useEffect(() => {
    if (vendors.length > 0) {
      let selectedVendor;
      if (!isNaN(vendorId)) {
        selectedVendor = vendors.find((v) => v.vendorId === Number(vendorId));
      } else {
        selectedVendor = vendors.find((v) => v.VendorName.toLowerCase() === vendorId.toLowerCase());
      }
      setVendor(selectedVendor);

      if (selectedVendor) {
        setInfoContent(selectedVendor.description);
        setInfo('Description'); // Set default tab to Description
      }
    }
  }, [vendors, vendorId]);

  const handleInfoChange = (type) => {
    setInfo(type);
    if (vendor) {
      switch (type) {
        case 'Description':
          setInfoContent(vendor.description);
          break;
        case 'AdditionalInfo':
          setInfoContent(
            <div className='flex justify-around'>
              <img src={vendor.VendorBanner} alt="" />
              <div className='mt-[2rem] space-y-4'>
                <div><span className='font-bold'>Phone Number</span>: {vendor.additionalInfo?.phoneNumber || 'N/A'}</div>
                <div><span className='font-bold'>Address:</span> {vendor.additionalInfo?.address}</div>
                <div><span className='font-bold'>Vendor Owner Name:</span> {vendor.additionalInfo?.vendorOwnerName || 'N/A'}</div>
              </div>
            </div>
          );
          break;
        case 'Review':
          setInfoContent(<VendorReview review={vendor.reviews} />);
          break;
        default:
          setInfoContent(vendor.description);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!vendor) return <p>No vendor found</p>;

  return (
    <div className="w-full m-1 bg-cart_bg text-[#364A15] ">
      <div className='h-[25rem]'>
        <div className='w-[90%] mx-auto h-64 relative'>
          <div className='bg-cover w-full h-full rounded-2xl' style={{ backgroundImage: `url(${vendor.VendorBanner})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
            <div className='absolute -bottom-[40%] left-[5%] flex items-end gap-[1rem]'>
              <div className='w-[215px] h-[215px] overflow-hidden rounded-3xl shadow-xl'>
                <img src={`${vendor.Vendoricon}`} alt={vendor.VendorName} className='w-full h-full ' />
              </div>
              <div className="ml-4">
                <h1 className="text-[40px] leading-[52px] font-[600]">{vendor.VendorName}</h1>
                <div className='ml-2'><RatingStar starCounts={vendor.starCount} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
      <div className="w-[40%] flex justify-between mx-[1rem] px-2">
        <div onClick={() => handleInfoChange('Description')} className={`${info === 'Description' ? 'font-bold border-b-4 border-[#7CCA86]' : ''}`}>Description</div>
        <div onClick={() => handleInfoChange('AdditionalInfo')} className={`${info === 'AdditionalInfo' ? 'font-bold border-b-4 border-[#7CCA86]' : ''}`}>Additional Info</div>
        <div onClick={() => handleInfoChange('Review')} className={`${info === 'Review' ? 'font-bold border-b-4 border-[#7CCA86]' : ''}`}>Review ({(vendor.reviews).length})</div>
      </div>
      <div className='mx-[1rem] my-[1rem]'>
        {infoContent}
      </div>
      </div>
      <div className='flex justify-around gap-2 mt-5 w-[95%] mx-auto'>
        <div className='bg-[#E9E9E9] w-[15rem] py-3 px-2 rounded-xl h-full'>
          <Filter />
        </div>
        <div className="grid w-3/4 justify-around items-center grid-cols-1 tablet:grid-cols-3 gap-12 p-2 my-2">
          {vendor.products.map((product, index) => (
            <Products
              key={product.productId || index}
              productId={product.productId}
              productImg={product.productImg}
              categories={product.categories}
              productName={product.productName}
              vendorName={vendor.VendorName}
              starCount={product.starCount}
              off={product.off}
              href={product.href}
              like={product.like}
              Total_items={product.Total_items}
              Sold_items={product.Sold_items}
              OriginalPrice={product.OriginalPrice}
              className={"w-[237px] h-[416px] bg-[#ffff]"}
              currency={product.Currency}
            />
          ))}
        </div>
        
      </div>
      <OffCount />
    </div>
  );
};

export default VendorDetails;
