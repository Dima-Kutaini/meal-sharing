/** @format */

import React from 'react';

function MealsItem({ meal }) {
  return (
    <div item-container>
      <li>
        <h2>{meal.title} </h2>
        <p>{meal.description}</p>
        <p> Price: {meal.price} </p>
        <p>max_reservations : {meal.max_reservations}</p>
        <p>Date: {meal.when}</p>
        <p>location: {meal.location}</p>
      </li>
    </div>
  );
}

export default MealsItem;
