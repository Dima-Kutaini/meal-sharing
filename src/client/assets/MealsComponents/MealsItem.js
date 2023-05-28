/** @format */

import React from 'react';
// import ReviewItem from './ReviewItem';
import { Link } from 'react-router-dom';
import Stars from './Stars';
import MealPage from './MealPage';
function MealsItem({ meal, selectedMealId, setSelectedMealId }) {
  const imageUrls = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrP75BiIrswS6qLeic-w_5GY-0CZnbBvt8NA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq2z9sBSZwQsXvuXZ4nqjQO37gHpgiqEG1hw&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe9k01H6gd5H2mBjeoV74apkDSrmRpgmU9RA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGL1psx68HwW2EnfQEdewKv60FtpgL9OOTeA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiN7DxuyvTFYSxazvbz1E5DLiWfbwfrK8SKg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCgdSrDnV0cjsF2ou1gcWEkxUkYFpY_SRXsQ&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrsbFvcR-xltUfHEggA0HxSLSC3cfZeV2jdg&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbnX-Mz5QVFSYNACvf-Yv56N6UDyhRHDeIvA&usqp=CAU',
    'https://img.taste.com.au/YnBXcH1I/w720-h480-cfill-q80/taste/2020/06/meatloaf-wellingtons-163215-2.jpg',
  ];

  const imageUrl = imageUrls[meal.id % imageUrls.length];
  // const handleAddReview = () => {
  //   setSelectedMealId(meal.id);
  // };

  return (
    <div className="item-container">
      <li key={meal.id}>
        <Link to={`/meals/${meal.id}`}>
          <img
            className="meal-img"
            src={imageUrl}
            alt="img"
            width="100"
            height="100"
          />
        </Link>
        {/* <Stars rating={rating} /> */}

        <div className="meal-info">
           <Link to={`/meals/${meal.id}`}>
          <h3>{meal.title}</h3>
            </Link>
          <p>{meal.description}</p>
          <p> Price: {meal.price} kr </p>
          <div className="butn">
            
              
              <button> Review</button>
            
            <button>reserve</button>
          </div>
        </div>
      </li>
    </div>
  );
}

export default MealsItem;
