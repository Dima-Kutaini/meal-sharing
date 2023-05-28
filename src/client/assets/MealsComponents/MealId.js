import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';



const MealId = ({ match }) => {
  const [meal, setMeal] = useState({});
  const [reservationData, setReservationData] = useState({
    phoneNumber: '',
    name: '',
    email: '',
  });

  useEffect(() => {
    // Fetch meal details from the database
    const fetchMealId = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/meals/${match.params.id}`);
        const data = await response.json();
        setMeal(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchMealId();
  }, [match.params.id]);

  const handleReservationSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create a new reservation
      const response = await fetch('http://localhost:5001/api/Reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        alert('Reservation successful!');
      } else {
        alert('Reservation failed. Please try again.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setReservationData({
      ...reservationData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <h1>{meal.name}</h1>
      <p>{meal.description}</p>

      {meal.availableReservations > 0 ? (
        <form onSubmit={handleReservationSubmit}>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={reservationData.phoneNumber}
            onChange={handleInputChange}
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={reservationData.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={reservationData.email}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Book Seat</button>
        </form>
      ) : (
        <p>No available reservations for this meal.</p>
      
      )}
  </div>
)}
export default MealId; 

