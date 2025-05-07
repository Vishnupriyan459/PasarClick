import React, { useEffect, useState } from "react";
// import OrderCard from "./OrderCard";

import { Link } from "react-router-dom";
import OrderCard from "./OrderCard";
import middleapi from "../../utils/middleapi";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("access");
      try {
        const response = await middleapi.get(`${API_URL}/customers/orders/ongoing`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setOrders(data);
          console.log(data);
          
        } else {
          console.error("Error fetching orders:", data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="mb-8">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-semibold">Your Orders</h3>
        <Link className="text-green-600 text-sm" to={"/Home/orders"}>
          See all
        </Link>
      </div>

      <div className="space-y-4">
        {orders
          .sort((a, b) => (a.status === "delivered" ? -1 : 1))
          .slice(0, 3)
          .map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
