/** @format */

import React, {useContext} from 'react';
import { SocialIcon } from 'react-social-icons';
import MealsList from './MealsList';
import {Link} from 'react-router-dom'; 
import { MealsContext } from './MealsList';




const HomePage = () => {
//    const {meals}=useContext(MealsContext);

// const [meals, setMeals]=useState([]); 

// useEffect(() => {
//   // Fetch meals from the database
//   const fetchMeals = async () => {
//     try {
//       const response = await fetch('http://localhost:5001/api/meals');
//       const data = await response.json();
//       setMeals(data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   fetchMeals();
// }, []);

      
  return (
    <div>
      {/* <div className="logo">
        <img
          className="logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSddU1KTCzNYwT2yZTpAMMkPXQRp3Duy1PxMiHaOr67Fonmtm7n9Co52UqBbaRuOnF_ZT8&usqp=CAU"
        />
      </div> */}
      <nav className="nav-container">
        <a
          href="/"
          className="site-title">
          Meal Sharing
        </a>
        <ul>
          <li>
            <a href="/meals"> Meals</a>
          </li>
          <li>
            <a href="/review"> Review</a>
          </li>
          <li>
            <a href="/reservations"> Reservations</a>
          </li>
          <li>
            <a href="/about">About </a>
          </li>
        </ul>
      </nav>
      {/* <div>
        <h2> Featured meal</h2>
        <Link to="/meals">
          <button className='more-meals'>See More</button>
        </Link>
        <MealsList limit={3} />
      </div> */}

      <section className="section-container">
        <div className="content-container">
          <h1> Welcome to our food website</h1>
          <p>Discover delicious meals crafted with love.</p>
        </div>
        {/* <img
          className=" home-img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR64g20QsUO96N-aizxizhfhNca_6Co7HRIUg&usqp=CAU"
          width={500}
        /> */}
      </section>

      <footer>
        <div className="footer">
          <div className="socialIcon">
            <SocialIcon
              network="twitter"
              fgColor="black"
            />
            <SocialIcon
              network="facebook"
              fgColor="black"
            />
            <SocialIcon
              network="instagram"
              fgColor="black"
            />
            <SocialIcon
              network="snapchat"
              fgColor="black"
            />
          </div>
          <p>Created by Dima Kutaini@ 2023</p>
        </div>
      </footer>
    </div>
  );
};
export default HomePage;
