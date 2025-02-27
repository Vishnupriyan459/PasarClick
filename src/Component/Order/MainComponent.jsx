import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, filterOrdersByTime, filterOrdersByState } from '../../Redux/OrderSlice';
import Ongoing from './Ongoing';
import Received from './Received/Received';
import Canceled from './Canceled/Canceled';

const MainComponent = ({ filter }) => {
  const dispatch = useDispatch();
  const { filteredItems, status, error } = useSelector((state) => state.order);

  const [stateFilter, setStateFilter] = useState('All');

  // Fetch orders on component mount
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Apply time filter
  useEffect(() => {
    if (filter) {
      dispatch(filterOrdersByTime({ days: filter }));
    }
  }, [filter, dispatch]);

  // Apply state filter
  useEffect(() => {
    dispatch(filterOrdersByState(stateFilter));
  }, [stateFilter, dispatch]);

  // // Debugging: Log filtered items
  // useEffect(() => {
  //   console.log('Filtered Orders:', filteredItems);
  // }, [filteredItems]);

  // Updated component picker function
  const componentpicker = (order) => {
    switch (order.Status) {
      case 'Delivery':
      case 'Preparing':
        return <Ongoing order={order}/>;
      case 'Received':
        return <Received order={order}/>;
      case 'Canceled':
        return <Canceled order={order}/>;
      default:
        return <p>Unknown Status: {order.Status}</p>;
    }
  };

  return (
    <div className="tablet:w-3/4 text-[#364A15]">
      {/* State Filters */}
      <div className="flex w-1/2 justify-between">
        {['All', 'Ongoing', 'Received', 'Canceled'].map((filter) => (
          <button
            key={filter}
            onClick={() => setStateFilter(filter)}
            className={`px-4 py-2 font-[400] font-Lufga text-[12px] leading-[20px] tablet:text-[15px] tablet:leading-[23px] laptop:text-[24px] laptop:leading-[31px] ${
              stateFilter === filter ? 'font-bold border-b-2 border-b-zinc-700 border-opacity-50 ' : 'font-light'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div>
        
        {status === 'loading' && <p>Loading...</p>}
        {status === 'failed' && <p>Error: {error}</p>}
        {status === 'succeeded' && (
          <div className='my-3 space-y-3'>
            {filteredItems.map((order, index) => (
              <div key={index}>
                {componentpicker(order)}
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainComponent;
