/** @format */

import React, { useEffect, useState } from 'react';
import ReviewItem from './ReviewItem';
import { useParams } from 'react-router-dom';


const ReviewList = () => {
   const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    title: '',
    description: '',
    created_date: '',
    stars: 0,
  });
 
  useEffect(() => {
    // Fetch reviews from the API
    fetch(`http://localhost:5001/api/review`)
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.log(error));
  }, []);

  const handleInputChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Send the new review data to the server
    fetch(`http://localhost:5001/api/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newReview),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the reviews list with the new review
        setReviews([...reviews, data]);
        // Reset the new review form
        setNewReview({
          title: '',
          description: '',
          created_date: '',
          stars: 0,
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="">
      <h2>Share your experience</h2>
      <div className="review-list">
        {reviews.map((review) => (
          <ReviewItem
            key={review.id}
            review={review}
          />
        ))}
      </div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <h3>Add a New Review</h3>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newReview.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="add-review">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={newReview.description}
              onChange={handleInputChange}
              required></textarea>
          </div>
          <div>
            <label htmlFor="stars">Stars:</label>
            <input
              type="number"
              id="stars"
              name="stars"
              min="0"
              max="5"
              value={newReview.stars}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="created_date">Date:</label>
            <input
              type="text"
              id="created_date"
              name="created_date"
              value={newReview.created_date}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewList;

