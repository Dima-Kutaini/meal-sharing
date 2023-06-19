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
          <img
            className="meal-img"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL7wo1Xz0tb5M-b9keMhsfsAj_D21HrUcC1Q&usqp=CAU"
            alt="img"
            width="100"
            height="100"
          />
        </Link>
        {/* <Stars rating={rating} /> */}

        <div className="meal-info">
    
            <h3>{meal.title}</h3>
            <p>{meal.description}</p>
            <p> Price: {meal.price} kr </p>
        
        <Link to={`/meals/${meal.id}`}>
            <button className='seeMoreButn'> See More</button>
   </Link>
        </div>
      </li>
    </div>
  );
}

export default MealsItem;
