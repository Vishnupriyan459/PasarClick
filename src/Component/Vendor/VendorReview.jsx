import React, { useState, useMemo } from 'react';
import RatingStar from '../home/RatingStar';

const VendorReview = ({ review }) => {
  const [visibleReviews, setVisibleReviews] = useState(2);

  // Function to load more reviews
  const loadMoreReviews = () => {
    setVisibleReviews((prevVisible) => prevVisible + 2);
  };

  // Calculate review statistics
  const reviewStats = useMemo(() => {
    const stats = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    review.forEach((item) => {
      stats[item.rating] = (stats[item.rating] || 0) + 1;
    });
    return stats;
  }, [review]);

  return (
    <div className="flex gap-8">
      {/* Review Analysis Section */}
      <div className="w-1/4 bg-white p-4 rounded border border-opacity-20">
        <h2 className="font-semibold mb-4">Review Analysis</h2>
        {Object.keys(reviewStats)
          .sort((a, b) => b - a)
          .map((star) => (
            <div key={star} className="flex items-center mb-2">
              <span className="w-10 text-sm font-semibold">{star} star</span>
              <div className="flex-1 h-4 bg-gray-200 rounded ml-2 overflow-hidden">
                <div
                  style={{
                    width: `${(reviewStats[star] / review.length) * 100}%`,
                    backgroundColor:
                      star === '5' ? 'darkgreen' :
                      star === '4' ? 'green' :
                      star === '3' ? 'yellow' :
                      star === '2' ? 'orange' : 'red',
                  }}
                  className="h-full"
                ></div>
              </div>
              <span className="ml-2 text-sm">{reviewStats[star]}</span>
            </div>
          ))}
      </div>

      {/* Reviews List Section */}
      <div className="flex-1">
        {review.slice(0, visibleReviews).map((item, index) => (
          <div key={index} className="w-full bg-white my-2 rounded px-3 py-5 space-y-5 border-2 border-gray-200">
            <div className="flex gap-3 items-center">
              <div className="rounded-full w-[3rem] h-[3rem] overflow-hidden">
                <img src={item.userImg} alt="User" className="w-full h-full object-cover" />
              </div>
              <div>
                <div>{item.reviewerName}</div>
                <RatingStar starCounts={item.rating} />
              </div>
            </div>
            <div>{item.comment}</div>
          </div>
        ))}

        {/* Load More button */}
        {visibleReviews < review.length && (
          <button
            onClick={loadMoreReviews}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default VendorReview;
