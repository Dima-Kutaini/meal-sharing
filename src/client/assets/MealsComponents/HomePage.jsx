/** @format */

import React, { useContext } from 'react';
import { SocialIcon } from 'react-social-icons';
import MealsList from './MealsList';
import { Link } from 'react-router-dom';
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
    <div className="container">
      {/* <div className="logo">
        <img
          className="logo"
          src=" https://images.unsplash.com/photo-1514326640560-7d063ef2aed5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=60"width={1200} height={400}
        />
      </div> */}

      {/* <a className=""> */}
      <nav className="nav-container">
        <a href="/">
          <img
            className="logo"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRh6K6egOkU4HC5bRzabnCzyB18CpyftV9-ag&usqp=CAU"
            alt="logo"
          />
          {/* </a> */}
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
      <div className="intro">
        <h2> Featured meal</h2>
        <Link to="/meals">
          <button className="more-meals">See More</button>
        </Link>
      </div>
      <div className="section-container">
        <div className="content-container">
          <div className="content_1">
            <h2> Welcome to our food website</h2>
            <p>
              Discover delicious meals crafted with love..
              <br />
              Explore our diverse menu featuring a wide range of culinary
              delights from around the world. <br />
              Read reviews from our satisfied customers and discover their
              favorite dishes.
              <br />
              Book your table now and experience exceptional dining with us.
            </p>
          </div>
        </div>
        <div className="img-wrapper">
          <img
            className="img"
            src="https://images.unsplash.com/photo-1564671165093-20688ff1fffa?w=1400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1lYWx8ZW58MHx8MHx8fDA%3D"
          width="300px"
          hight="300px"
          />
        </div>
      </div>

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
          <p className="author">
            Created by <strong> Dima Kutaini</strong> &copy; 2023
          </p>
        </div>
      </footer>
    </div>
  );
};
export default HomePage;
