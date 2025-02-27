import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaAngleRight } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { fetchVendors } from '../Redux/VendorsSlice';

const Breadcrumbs = () => {
  const dispatch = useDispatch();
  const { items: vendors, loading, error } = useSelector((state) => state.vendors);

  useEffect(() => {
    dispatch(fetchVendors());
  }, [dispatch]);

  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x && !['login', 'signup', 'additionalinfo'].includes(x));

  if (location.pathname === '/home' || location.pathname === '/'|| location.pathname === '/Home') {
    return null;
  }
  const capitalize=(str)=>str.charAt(0).toUpperCase()+str.slice(1).toLowerCase();

  return (
    <div className='mx-auto max-tablet:text-[12px] tablet:text-[15px] laptop:text-[20px] w-[95%]  '>
      <ul style={{ listStyle: 'none', display: 'flex', fontWeight: '300' }}>
        {pathnames.length > 0 && (
          <>
            {pathnames.map((value, index) => {
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;
              const isLast = index === pathnames.length - 1;
              
              // Check if the last part is an integer (vendor or product ID)
              const isId = !isNaN(value);
              const previousPath = pathnames[index - 1];

              // Determine display value based on URL structure
              let displayValue = capitalize(value);

              
              
              // If it's a vendor page, use the vendor name
              if (isId && previousPath === 'Vendor') {
                const vendor = vendors.find(v => v.vendorId === parseInt(value));
                if (vendor) {
                  displayValue = vendor.VendorName;
                }
              }

              // If it's a product page under "shop," find the product name
              if (isId && previousPath === 'Shop') {
                let product;
                vendors.forEach(vendor => {
                  const foundProduct = vendor.products.find(p => p.productId === parseInt(value));
                  if (foundProduct) product = foundProduct;
                });
                if (product) {
                  displayValue = product.productName;
                }
              }
              
              return (
                <li key={to} className='flex items-center my-3 text-[7px] leading-[12px] tablet:text-[12px] laptop:text-[16px]'>
                  {!isLast ? (
                    <Link to={to} className='flex items-center opacity-[50%]'>
                      {displayValue} <FaAngleRight />
                    </Link>
                  ) : (
                    <span className='font-[500]'>{displayValue}</span>
                  )}
                </li>
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
