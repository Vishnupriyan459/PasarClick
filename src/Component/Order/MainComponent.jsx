import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchOrders,
  filterOrdersByTime,
  filterOrdersByState,
} from "../../Redux/OrderSlice";
import Ongoing from "./Ongoing";
import Received from "./Received/Received";
import Canceled from "./Canceled/Canceled";
import axios from "axios";
import middleapi from "../../utils/middleapi";

const API_URL = process.env.REACT_APP_API_URL;

const MainComponent = ({ filter }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stateFilter, setStateFilter] = useState("All");

  // Fetch orders from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("access");
        const response = await middleapi.get(
          `${API_URL}/customers/orders/ongoing`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOrders(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply state filter with case insensitivity and conditional time filter
  const filteredOrders = orders.filter((order) => {
    const status = order.status?.toLowerCase() || "";

    // Apply time filter only when a specific time filter is selected
    const isTimeFilterApplied = filter && filter !== 30; // Assuming 30 is the default filter
    if (isTimeFilterApplied) {
      const orderDate = new Date(order.created_at);
      const today = new Date();
      const diffTime = Math.abs(today - orderDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > filter) return false;
    }

    switch (stateFilter) {
      case "Ongoing":
        return ["packed", "dispatched"].includes(status);
      case "Received":
        return status === "delivered";
      case "Cancelled":
        return status === "cancelled";
      case "All":
      default:
        return true;
    }
  });

  // Case-insensitive component picker
  const componentpicker = (order) => {
    const status = order.status.toLowerCase();
   

    switch (status) {
      case "packed":
      case "dispatched":
        return <Ongoing order={order} />;
      case "delivered":
        return <Received order={order} />;
      case "cancelled":
        return <Canceled order={order} />;
      default:
        return <p>Unknown Status: {order.status}</p>;
    }
  };

  return (
    <div className="tablet:w-3/4 text-[#364A15]">
      {/* State Filters */}
      <div className="flex w-1/2 justify-between">
        {["All", "Ongoing", "Received", "Cancelled"].map((filter) => (
          <button
            key={filter}
            onClick={() => setStateFilter(filter)}
            className={`px-4 py-2 font-[400] font-Lufga text-[12px] leading-[20px] tablet:text-[15px] tablet:leading-[23px] laptop:text-[24px] laptop:leading-[31px] ${
              stateFilter === filter
                ? "font-bold border-b-2 border-b-zinc-700 border-opacity-50"
                : "font-light"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        <div className="my-3 space-y-3">
          

          {filteredOrders.map((order) => (
            <div key={order.id}>{componentpicker(order)}</div>
          ))}

          {!loading && !error && filteredOrders.length === 0 && (
            <p>No orders found for filter "{stateFilter}"</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainComponent;
