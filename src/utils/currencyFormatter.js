// utils/currencyFormatter.js

/**
 * Formats a number as a price with a currency symbol.
 * 
 * @param {number} price - The price to format
 * @param {string} currency - The currency code (e.g., 'USD', 'EUR')
 * @param {string} [locale='en-US'] - Optional: the locale to format the currency in
 * @returns {string} - The formatted price with currency symbol
 */
export const formatPrice = (price, currency, locale = 'en-US') => {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(price);
  };
  