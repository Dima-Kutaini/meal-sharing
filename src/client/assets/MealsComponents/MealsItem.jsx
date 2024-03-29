/** @format */

import React from 'react';
// import ReviewItem from './ReviewItem';
import { Link } from 'react-router-dom';
import Stars from './Stars';
import MealPage from './MealPage';
function MealsItem({ meal, selectedMealId, setSelectedMealId }) {
  // const handleAddReview = () => {
  //   setSelectedMealId(meal.id);
  // };

  return (
    <div className="item-container">
      <li key={meal.id}>
        <Link to={`/meals/${meal.id}`}>
          <div className="mealimg-container">
            <img
              className="meal-img"
              src="https://icon2.cleanpng.com/20180331/ezq/kisspng-catering-food-computer-icons-logo-event-management-catering-5abf487c5eb658.714031151522485372388.jpg"
              alt="img"
              width="100"
              height="40"
            />
          </div>
        </Link>
        {/* <Stars rating={rating} /> */}

        <div className="meal-info">
          <h3>{meal.title}</h3>
          <p>{meal.description}</p>
          <p> Price: {meal.price} kr </p>

          <Link to={`/meals/${meal.id}`}>
            <button className="seeMoreButn"> See More</button>
          </Link>
        </div>
      </li>
    </div>
  );
}

export default MealsItem;
