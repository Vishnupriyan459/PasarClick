// ExampleComponent.js
import React from 'react';
import { formatPrice } from '../utils/currencyFormatter';

const ProductPrice = ({ price, currency }) => (
  <p>{formatPrice(price, currency)}</p>
);

export default ProductPrice;
