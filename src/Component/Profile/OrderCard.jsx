import React, { useState } from "react";
import { TruckIcon, PhoneIcon, MapPinIcon, CalendarIcon, PackageIcon, ClockIcon, ShoppingCartIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";


const OrderCard = ({ order }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const isDelivered = order.status === "delivered";
  const isPending = ["pending", "packed"].includes(order.status);
  const isCancelled = order.status === "cancelled";
  const isDispatched = order.status === "dispatched";

  const borderColor = isDelivered
    ? "border-l-green-500"
    : isPending
    ? "border-l-yellow-400"
    : isCancelled
    ? "border-l-red-500"
    : isDispatched
    ? "border-l-blue-500"
    : "border-l-gray-200";

  const iconBgColor = isDelivered
    ? "bg-green-100"
    : isPending
    ? "bg-yellow-200"
    : isCancelled
    ? "bg-red-100"
    : isDispatched
    ? "bg-blue-100"
    : "bg-gray-100";

  const iconColor = isDelivered
    ? "text-green-600"
    : isPending
    ? "text-yellow-700"
    : isCancelled
    ? "text-red-600"
    : isDispatched
    ? "text-blue-600"
    : "text-gray-500";

  const badgeBg = isDelivered
    ? "bg-green-100"
    : isPending
    ? "bg-yellow-200"
    : isCancelled
    ? "bg-red-100"
    : isDispatched
    ? "bg-blue-100"
    : "bg-gray-200";

  const badgeText = isDelivered
    ? "text-green-700"
    : isPending
    ? "text-yellow-800"
    : isCancelled
    ? "text-red-700"
    : isDispatched
    ? "text-blue-700"
    : "text-gray-700";

  // Format date string from ISO date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  // Get the latest tracking history item
  const latestTracking = order.Tracking_history ? 
    order.Tracking_history[order.Tracking_history.length - 1] : null;

  // Calculate total price
  const totalPrice = order.items ? 
    order.items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2) : 
    "0.00";

  return (
    <div className={`bg-white rounded-lg shadow-md border-l-4 ${borderColor} w-full max-w-2xl transition-all duration-300`}>
      {/* Header Section - Always Visible */}
      <div 
        className="flex justify-between items-center p-5 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${iconBgColor}`}>
            <TruckIcon className={`w-5 h-5 ${iconColor}`} />
          </div>
          <div className="flex flex-col">
            <p className="text-xs uppercase font-medium text-gray-500">Order ID</p>
            <p className="font-bold text-gray-800">#{order.id}</p>
          </div>
          <div className="hidden sm:flex flex-col ml-4 border-l border-gray-200 pl-4">
            <p className="text-xs uppercase font-medium text-gray-500">Vendor</p>
            <p className="font-medium text-gray-800 truncate max-w-xs">{order.vendor_name}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide ${badgeBg} ${badgeText}`}>
              {order.status}
            </span>
            <p className="text-xs text-gray-500 mt-1">
              {order.created_at && `${formatDate(order.created_at)}`}
            </p>
          </div>
          {isExpanded ? 
            <ChevronUpIcon className="w-5 h-5 text-gray-400" /> : 
            <ChevronDownIcon className="w-5 h-5 text-gray-400" />
          }
        </div>
      </div>

      {/* Collapsible Content */}
      {isExpanded && (
        <>
          <div className="px-5 pb-4 border-t border-gray-100 pt-2">
            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Vendor Info - Full Details */}
                <div className="flex items-start gap-3">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-medium">Vendor</p>
                    <p className="font-medium text-gray-800">{order.vendor_name}</p>
                    {order.billing_info && (
                      <p className="text-sm text-gray-600 mt-1">{order.billing_info.billing_address}</p>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                {order.billing_info && order.billing_info.phone && (
                  <div className="flex items-start gap-3">
                    <PhoneIcon className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Contact</p>
                      <p className="text-sm text-gray-800">{order.billing_info.phone}</p>
                      {order.billing_info.contact_email && (
                        <p className="text-sm text-gray-600">{order.billing_info.contact_email}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Latest Tracking Status */}
                {latestTracking && (
                  <div className="flex items-start gap-3">
                    <ClockIcon className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Latest Status</p>
                      <p className="font-medium text-gray-800">{latestTracking.status}</p>
                      <p className="text-sm text-gray-600">
                        {latestTracking.date} at {latestTracking.time}
                      </p>
                      {latestTracking.description && (
                        <p className="text-sm text-gray-500 mt-1">{latestTracking.description}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                {/* Items Summary */}
                {order.items && order.items.length > 0 && (
                  <div className="flex items-start gap-3">
                    <ShoppingCartIcon className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Order Items</p>
                      <div className="mt-2 space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="font-medium">{item.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-gray-600">x{item.quantity}</span>
                              <span className="font-medium">${item.price.toFixed(2)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between">
                        <span className="font-medium">Total</span>
                        <span className="font-bold">${totalPrice}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tracking History Preview */}
                {order.Tracking_history && order.Tracking_history.length > 1 && (
                  <div className="flex items-start gap-3">
                    <PackageIcon className="w-5 h-5 text-gray-400 mt-1" />
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-medium">Tracking History</p>
                      <div className="mt-2 space-y-1">
                        {order.Tracking_history.slice(0, 2).map((track, index) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span className="text-gray-800">{track.status}</span>
                            <span className="text-gray-500 text-xs">{track.date}</span>
                          </div>
                        ))}
                        {order.Tracking_history.length > 2 && (
                          <p className="text-xs text-gray-500">
                            + {order.Tracking_history.length - 2} more status updates
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
              {isDelivered ? (
                <p className="text-sm text-green-600 font-medium">Delivered Successfully</p>
              ) : isCancelled ? (
                <p className="text-sm text-red-600 font-medium">Order Cancelled</p>
              ) : (
                <p className="text-sm text-gray-500">
                  {isDispatched ? "Out for delivery" : "Processing"}
                </p>
              )}
              <button className="text-sm font-medium text-blue-600 hover:text-blue-800 px-3 py-1 rounded hover:bg-blue-50">
                View Details
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderCard;