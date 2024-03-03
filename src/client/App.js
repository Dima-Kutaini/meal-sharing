/** @format */

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import './assets/MealsComponents/review.css';
import './assets/MealsComponents/reservation.css';
import "./assets/MealsComponents/About.css"; 
import HomePage from './assets/MealsComponents/HomePage';
import MealsList from './assets/MealsComponents/MealsList';
import ReviewList from './assets/MealsComponents/ReviewList';
import About from './assets/MealsComponents/About';
import ReservationList from './assets/MealsComponents/ReservationList';
import MealPage from './assets/MealsComponents/MealPage';
import AddReviewByMealId from './assets/MealsComponents/AddReviewByMealId';
import './index.css';
import './assets/MealsComponents/HomePage.css';
import AddReservationByMealId from './assets/MealsComponents/AddReservationByMealId';

function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact
          path="/">
          <HomePage />
        </Route>
        <Route
          exact
          path="/meals">
          <MealsList />
        </Route>
        <Route
          exact
          path="/review">
          <ReviewList />
        </Route>
        <Route
          exact
          path="/Reservations">
          <ReservationList />
        </Route>
        <Route
          exact
          path="/About">
          <About />
        </Route>
        <Route
          exact
          path="/meals/:id">
          <MealPage />
        </Route>

        <Route
          exact
          path="/meals/:id/review">
          <AddReviewByMealId />
        </Route>
        <Route
          exact
          path="/meals/:id/Reservation">
          <AddReservationByMealId />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
