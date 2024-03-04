/** @format */

// /** @format */

import React, { useState, useEffect, createContext } from 'react';
import MealsItem from './MealsItem';
// import ReviewList from './ReviewList';
export const MealsContext = createContext();


const MealsList = ({ limit }) => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    fetchMeals();
  }, [sortDirection]);

  async function fetchMeals() {
    try {
      const response = await fetch(
        `http://localhost:5001/api/meals?sortKey=price&sortDir=${sortDirection}`
      );
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
    const titleMatch = meal.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatch;
  });

  const handleInputChange = (e) => {
    const { value } = e.target;
    setSortDirection(value);
  };

  const handleToggleAddForm = () => {
    setShowAddForm(!showAddForm);
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
      <div className="sort-container">
        <label htmlFor="sortDirection">Sort Direction:</label>
        <div>
          <input
            type="radio"
            id="asc"
            name="sortDirection"
            value="asc"
            checked={sortDirection === 'asc'}
            onChange={handleInputChange}
          />
          <label htmlFor="asc">Ascending</label>
        </div>
        <div>
          <input
            type="radio"
            id="desc"
            name="sortDirection"
            value="desc"
            checked={sortDirection === 'desc'}
            onChange={handleInputChange}
          />
          <label htmlFor="desc">Descending</label>
        </div>
      </div>
      <h1 className="list-title">Meals List</h1>
      <div className="meals-container">
        {error && <p className="error-message">{error}</p>}
        <div className="meals-list">
          <MealsContext.Provider value={{ meals: filteredMeals }}>
            <ul className="list-container">
              {filteredMeals.map((meal) => (
                <MealsItem
                  key={meal.id}
                  meal={meal}
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