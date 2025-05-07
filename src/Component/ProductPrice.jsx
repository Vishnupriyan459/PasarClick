// ExampleComponent.js
import React from 'react';
import { formatPrice } from '../utils/currencyFormatter';
import { useDispatch, useSelector } from 'react-redux';

const ProductPrice = ({ price}) => {
  const { currency, country } = useSelector((state) => state.location);
  return( <p>{formatPrice(price, currency)}</p>)
 
};

export default ProductPrice;
