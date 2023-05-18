/** @format */
import React, { useState, useEffect } from 'react';
import MealsItem from './MealsItem';

const MealsList = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetchMeals();
  }, []);

  async function fetchMeals() {
    try {
      const response = await fetch('http://localhost:5001/api/meals');
      const data = await response.json();
      setMeals(data);
      console.log(data);
    } catch (error) {
      console.log('Error fetching meals:', error);
    }
  }

  return (
    <div className='meals-list'>
      <h1 className="list-title">Meals List </h1>
      <ul className='list-container'>
        {meals.map((meal) => (
          <MealsItem
            key={meal.id}
            meal={meal}
          />
        ))}
      </ul>
    </div>
  );
};

export default MealsList;
