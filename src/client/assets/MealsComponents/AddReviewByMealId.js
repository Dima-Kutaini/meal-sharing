/** @format */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReviewItem from './ReviewItem';

const AddReviewByMealId = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    title: '',
    description: '',
    created_date: '',
    stars: 0,
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/meals/${id}/review`
        );
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReviews();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    // const { id } = useParams();
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5001/api/review/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      const data = await response.json();
      setReviews((prevReviews) => [...prevReviews, data]);
      setNewReview({
        title: '',
        description: '',
        created_date: '',
        stars: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };
  // const filteredReviews = reviews.filter((review) => review.meal_id === id);
  return (
    <div>
      <h2>Share your experience</h2>
      <div className="review-list_item">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewItem
              key={review.id}
              review={review}
            />
          ))
        ) : (
          <p>No reviews found for this meal.</p>
        )}
      </div>
      <div>
        <div className="add_form">
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
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={newReview.description}
                onChange={handleInputChange}
                required></textarea>
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
            <button
              className="submit"
              type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReviewByMealId;
