const FormatPhoneNumber = (phoneNumber) => {
    // Remove any non-digit characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
  
    // Check if the number is 10 digits
    const match = cleaned.match(/(\d{3})(\d{3})(\d{4})/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return phoneNumber; // Return the original if not formatted
  };
  