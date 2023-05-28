
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MealsItem from './MealsItem';

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
      const response = await fetch('http://localhost:5001/api/meals/'+id);

      if (!response.ok) {
        throw new Error('Failed to fetch mealById');
      }
      const data = await response.json();

      setMeal(data);
      console.log(data);
    } catch (error) {
      setError(error.message);
      console.log('Error fetching mealById:', error);
    }
  }

  return (
    <div className="meal-page">
      <div className="image-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ34x9BCyDAV5INCm5xnC43wmlMl2h3nSSTmQ&usqp=CAU"
          alt="Meal Image"
          className="meal-image"
        />
      </div>
      <h2>{meal ? meal.title : ''}</h2>
      {meal && (
        <div>
          <p className="description">Description: {meal.description} </p>
          <p className="price">Price: {meal.price} kr</p>
          <p> location : {meal.location}</p>
          <p> max Reservation: {meal.max_reservations}</p>
          <p> Available:{meal.available}</p>
          <p> date: {meal.created_date}</p>
          <div className="button">
            <button className="but1">add review</button>
            <button className="but2"> add reservation</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPage;
