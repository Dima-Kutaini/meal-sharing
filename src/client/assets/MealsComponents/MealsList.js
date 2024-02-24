// /** @format */


import React, { useState, useEffect, createContext } from 'react';
import MealsItem from './MealsItem';
import ReviewList from './ReviewList';
export const MealsContext = createContext();

const MealsList = ({ limit }) => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [newMeal, setNewMeal] = useState({
      imageUrls: '',
      title: '',
      description: '',
      price: 0,
    });

  useEffect(() => {
    fetchMeals();
  }, []);

  async function fetchMeals() {
    try {
      const response = await fetch('http://localhost:5001/api/meals');
      // let url = 'http://localhost:5001/api/meals';

      // // Add sort option and sort direction to the URL
      // if (sortOption === 'highToLow') {
      //   url += '?sort=highToLow';
      // } else if (sortOption === 'lowToHigh') {
      //   url += '?sort=lowToHigh';
      // }

      // // Append sort direction to the URL
      // url += `&sortDir=${sortDir}`;

      // const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch meals');
      }
      const data = await response.json();
      if (limit) {
        setMeals(data.slice(0, limit));
      } else {
        setMeals(data);
      }
    } catch (error) {
      setError(error.message);
      console.log('Error fetching meals:', error);
    }
  }

  const filteredMeals = meals.filter((meal) => {
    // return meal.title.toLowerCase().includes(searchQuery.toLowerCase());
    const titleMatch = meal.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
   
    return titleMatch;
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'sortDirection') {
      setSortDirection(value);
    }
    else{
    setNewMeal((prevMeal) => ({
      ...prevMeal,
      [name]: value,
    }));
  }
  };

  const handleToggleAddForm = () => {
    setShowAddForm(!showAddForm);
  };

  const handleAddMeal = () => {
    const newMealItem = {
      imageUrl: newMeal.imageUrls,
      title: newMeal.title,
      description: newMeal.description,
      price: parseFloat(newMeal.price),
    };
    setMeals([...meals, newMealItem]);
    setNewMeal({
      imageUrls: '',
      title: '',
      description: '',
      price: 0,
    });
    setShowAddForm(false);
  };

  return (
    <div>
      <div className="search-container">
        <label>Search for meal </label>
        <input
          className="search-input"
          type="text"
          placeholder="Search for a meal"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* <div className="sort-container">
        <label htmlFor="sortDirection">Sort Direction:</label>
        <select
          id="sortDirection"
          name="sortDirection"
          value={sortDir}
          onChange={handleInputChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div> */}

      <div className="meals-container">
        <h1 className="list-title">Meals List</h1>
        {error && <p className="error-message">{error}</p>}
        <div className="meals-list">
          <MealsContext.Provider value={{ meals: filteredMeals }}>
            <ul className="list-container">
              {filteredMeals.map((meal) => (
                <MealsItem
                  key={meal.id}
                  meal={meal}
                  // onSelectMeal={handleSelectMeal}
                />
              ))}
            </ul>
          </MealsContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default MealsList;

    






