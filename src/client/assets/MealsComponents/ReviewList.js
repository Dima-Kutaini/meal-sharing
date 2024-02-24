/** @format */

import React, { useEffect, useState } from 'react';
import ReviewItem from './ReviewItem';
import { useParams } from 'react-router-dom';

const ReviewList = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from the API
    fetch(`http://localhost:5001/api/review`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.log(error));
  }, []);

  // 

  return (
    <div>
      <h1>Our meals reviews</h1>
      <div className="review-container">
        <div className="review-list">
          {reviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
