/** @format */

// /** @format */

// import React, { useState, useEffect, createContext } from 'react';
// import MealsItem from './MealsItem';
// import ReviewList from './ReviewList';
// export const MealsContext = createContext();

// const MealsList = ({ limit }) => {
//   const [meals, setMeals] = useState([]);
//   const [error, setError] = useState(null);
//   const [showAddForm, setShowAddForm] = useState(false);

//   const [newMeal, setNewMeal] = useState({
//     imageUrls: '',
//     title: '',
//     description: '',
//     price: 0,
//   });
//   const [state, setState] = useState({
//     query: '',
//     list: meals,
//   });

//   useEffect(() => {
//     fetchMeals();
//   }, []);

//   async function fetchMeals() {
//     try {
//       const response = await fetch('http://localhost:5001/api/meals');

//       if (!response.ok) {
//         throw new Error('Failed to fetch meals');
//       }
//       const data = await response.json();
//       if (limit) {
//         setMeals(data.slice(0, limit));
//       } else {
//         setMeals(data);

//       }
//     } catch (error) {
//       setError(error.message);
//       console.log('Error fetching meals:', error);
//     }
//   }

//   const mealsWithIndex = meals.map((meal, index) => ({ ...meal, index }));

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewMeal((prevMeal) => ({
//       ...prevMeal,
//       [name]: value,
//     }));
//   };
//   const handleToggleAddForm = () => {
//     setShowAddForm(!showAddForm);
//   };
//   const handleAddMeal = () => {
//     const newMealItem = {
//       imageUrl: newMeal.imageUrls,
//       title: newMeal.title,
//       description: newMeal.description,
//       price: parseFloat(newMeal.price),
//     };
//     setMeals([...meals, newMealItem]);
//     setNewMeal({
//       imageUrls: '',
//       title: '',
//       description: '',
//       price: 0,
//     });
//     setShowAddForm(false);
//   };

//   return (
//     <div>

//       <div>
//         {showAddForm ? (
//           <div className="add-meal-form">
//             <h2>Add New Meal</h2>

//             <input
//               type="text"
//               placeholder="Image URL"
//               name="imageUrl"
//               value={newMeal.imageUrls}
//               onChange={handleInputChange}
//             />

//             <input
//               type="text"
//               placeholder="Title"
//               name="title"
//               value={newMeal.title}
//               onChange={handleInputChange}
//             />
//             <input
//               type="text"
//               placeholder="Description"
//               name="description"
//               value={newMeal.description}
//               onChange={handleInputChange}
//             />
//             <input
//               type="number"
//               placeholder="Price"
//               name="price"
//               value={newMeal.price}
//               onChange={handleInputChange}
//             />

//             <button onClick={handleAddMeal}>Add Meal</button>
//             <button onClick={handleToggleAddForm}>Cancel</button>
//           </div>
//         ) : (
//           <button onClick={handleToggleAddForm}>Add Meal</button>
//         )}
//       </div>

//       <div className="meals-container">
//         <h1 className="list-title">Meals List</h1>
//         {error && <p className="error-message">{error}</p>}
//         <div className="meals-list">
//           <MealsContext.Provider value={{ meals }}>
//             <ul className="list-container">
//               {mealsWithIndex.map((meal) => (
//                 <MealsItem
//                   key={meal.index}
//                   meal={meal}
//                   // onSelectMeal={handleSelectMeal}
//                 />
//               ))}
//             </ul>
//           </MealsContext.Provider>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MealsList;

import React, { useState, useEffect, createContext } from 'react';
import MealsItem from './MealsItem';
import ReviewList from './ReviewList';
export const MealsContext = createContext();

const MealsList = ({ limit }) => {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMeal, setNewMeal] = useState({
    imageUrls: '',
    title: '',
    description: '',
    price: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');
const [selectedMealId, setSelectedMealId] = useState(null);

  useEffect(() => {
    fetchMeals();
  }, []);

  async function fetchMeals() {
    try {
      const response = await fetch('http://localhost:5001/api/meals');

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
    const priceMatch = meal.price <= parseFloat(searchQuery);
    return titleMatch || priceMatch;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMeal((prevMeal) => ({
      ...prevMeal,
      [name]: value,
    }));
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
      <div>
        {showAddForm ? (
          <div className="add-meal-form">
            <h2>Add New Meal</h2>
            <input
              type="text"
              placeholder="Image URL"
              name="imageUrl"
              value={newMeal.imageUrls}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Title"
              name="title"
              value={newMeal.title}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={newMeal.description}
              onChange={handleInputChange}
            />
            <input
              type="number"
              placeholder="Price"
              name="price"
              value={newMeal.price}
              onChange={handleInputChange}
            />
            <button onClick={handleAddMeal}>Add Meal</button>
            <button onClick={handleToggleAddForm}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleToggleAddForm}>Add Meal</button>
        )}
      </div>

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
                  selectedMealId={selectedMealId}
                  setSelectedMealId={setSelectedMealId}
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
