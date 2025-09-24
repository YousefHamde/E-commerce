import React from "react";

export default function ReviewList({ reviews }) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet.</p>;
  }

  return (
    <div className="reviews mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border rounded-md p-4 shadow-sm bg-white flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{review.reviewerName}</span>
              <span className="text-yellow-500">⭐ {review.rating}</span>
            </div>
            <p className="text-gray-700 flex-1">{review.comment}</p>
            <small className="text-gray-400 mt-2 block">
              {new Date(review.date).toLocaleDateString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
