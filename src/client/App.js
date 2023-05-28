import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import './App.css'; 
import './assets/MealsComponents/review.css';
import './assets/MealsComponents/reservation.css';
import HomePage from "./assets/MealsComponents/HomePage";
import MealsList from "./assets/MealsComponents/MealsList";
import ReviewList from "./assets/MealsComponents/ReviewList";
import About from "./assets/MealsComponents/About";
import ReservationList from "./assets/MealsComponents/ReservationList";
import MealPage from "./assets/MealsComponents/MealPage";



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
          path="/meals/:id"
          >
          <MealPage />
        </Route>
        <Route
          exact
          path="/test-component" >
          <TestComponent></TestComponent>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
