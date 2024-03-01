/** @format */

import React from 'react';
import Stars from './Stars';

function ReviewItem({ review }) {
  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < review.stars; i++) {
      stars.push(
        <span
          key={i}
          style={{ color: '  #d55714  ' }}>
          &#9733;
        </span>
      );
    }

    return stars;
    console.log(renderStars);
  };
  console.log(renderStars);
  return (
    <div className="review-item">
      <h3 className="review-title">{review.title}</h3>
      <p className="review-description">{review.description}</p>
      <p className="review-date">
        {' '}
        Created on: {new Date(review.created_date).toLocaleDateString()}
      </p>
      <div className="review-stars"> {renderStars()}</div>
    </div>
  );
}

export default ReviewItem;
