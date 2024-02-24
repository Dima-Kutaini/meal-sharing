/** @format */
import React from 'react';
import './Stars.css';

const Stars = ({rating }) => {
     
  const numberOfColoredStars = Math.round(rating);
  const numberOfGrayStars = 5 - numberOfColoredStars;
  return (
    <div className="stars">
      <span className="colored">
        {Array(numberOfColoredStars).fill('★').join('')}
      </span>
      <span className="gray">
        {Array(numberOfGrayStars).fill('★').join('')}
      </span>
    </div>
  );



 };




export default Stars;
