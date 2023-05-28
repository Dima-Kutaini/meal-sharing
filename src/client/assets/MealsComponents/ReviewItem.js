/** @format */

import React from 'react';
 import Stars from './Stars';

function ReviewItem({ review  }) {
  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < review.stars; i++) {
      stars.push(
        <span
          key={i}
          style={{ color:' rgb(219, 234, 86) '}}>
          &#9733;
        </span>
      );
      
    }

    return stars;
    console.log(renderStars); 
  };
console.log(renderStars); 
  return (
    <div className='review-item'>
      {/* <ReviewContext.Provider value={ renderStars()}> */}
        <h3 className='review-title'>{review.title}</h3>
        <p className='review-description'>{review.description}</p>
        <p className='review-date'> created in:{review.created_date}</p>
        <div className='review-stars'> {renderStars()}</div>
        {/* <Stars rating={rating}/> */}
      {/* </ReviewContext.Provider> */}
    </div>
  );
}

export default ReviewItem;
