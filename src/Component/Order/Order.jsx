import React, { useState } from 'react';
import Breadcrumbs from '../Breadcrumbs';
import Options from './Options';
import MainComponent from './MainComponent';

const Order = () => {
  const [filter, setFilter] = useState(30); // Default filter to 30 days

  return (
    <>
      <Breadcrumbs />
      <div className='w-[100%] min-h-screen bg-Orderbg'>
        <div className='w-[95%] mx-auto flex max-tablet:flex-col  '>
          <Options setFilter={setFilter} />
          <MainComponent filter={filter} />
        </div>
        
      </div>
    </>
  );
};

export default Order;
