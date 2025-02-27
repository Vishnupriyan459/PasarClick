export function formatDate(canceledDate) {
    // console.log(canceledDate);
    
    const canceledDateObj = new Date(canceledDate);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - canceledDateObj);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  
    if (diffDays < 7) {
      // Show day of the week (e.g., "Wednesday")
      return canceledDateObj.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      // Show full date (e.g., "Wednesday, 27 November 2024")
      return canceledDateObj.toLocaleDateString('en-US', options);
    }
  }
  
  
  
  