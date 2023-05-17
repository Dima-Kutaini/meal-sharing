import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import MealsList from "./mealsComponents/MealsList";
import Navbar from "./mealsComponents/Navbar";
import './App.css'; 

 function App() {
  return (
    <Router>
      <Route
      exact path="Navbar"></Route>
      <Navbar/>
      <Route
        exact
        path="/meals" >
        <MealsList />
      </Route>
      <Route
        exact
        path="/lol">
        <p>lol</p>
      </Route>
      <Route
        exact
        path="/test-component">
        <TestComponent></TestComponent>
      </Route>
    </Router>
  );
}

export default App;
