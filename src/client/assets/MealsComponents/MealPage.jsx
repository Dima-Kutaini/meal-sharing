/** @format */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MealsItem from './MealsItem';
import { Link } from 'react-router-dom';
import './MealPage.css';

const MealPage = () => {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMealById();
  }, []);


  async function fetchMealById() {
    try {
      const response = await axios.get(`http://localhost:5001/api/meals/${id}`);

      if (!response.data) {
        throw new Error('Failed to fetch meal by ID');
      }

      setMeal(response.data);
    } catch (error) {
      setError(error.message);
      console.log('Error fetching meal by ID:', error);
    }
  }

  return (
    <div className="meal-page">
      <div className="image-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ34x9BCyDAV5INCm5xnC43wmlMl2h3nSSTmQ&usqp=CAU"
          alt="Meal Image"
          width={450}
          className="meal-image"
        />
      </div>
      <h2>{meal ? meal.title : ''}</h2>
      {meal && (
        <div>
          <p className="description">Description: {meal.description} </p>
          <p className="price">Price: {meal.price} kr</p>
          <p> location:  {meal.location}</p>
          <p> Max Reservation:  {meal.max_reservations}</p>
          <p> Available: {meal.available}</p>
          <p> Date: {new Date(meal.created_date).toLocaleDateString()}</p>
          <div className="button">
            <Link to={`/meals/${id}/review`}>
              <button className="butn">Add review</button>
            </Link>
            <Link to={`/meals/${id}/Reservation`}>
              <button className="butn"> Add reservation</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPage;
