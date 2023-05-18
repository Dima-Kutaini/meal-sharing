import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TestComponent from "./components/TestComponent/TestComponent";
import MealsList from "./MealsComponent/MealsList";
import './App.css'; 


function App() {
  return (

    
   <div>
    <MealsList/>
   </div>
  );
}

export default App;
