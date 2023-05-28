/** @format */

import React, { useEffect, useState } from 'react';
import ReservationItem from './ReservationItem';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [nerReservation, setNewReservation] = useState({
    contact_ame: '',
    title: '',
    number_og_guests: 0,
    contact_phonenumber: '',
    created_date: ''
  });
  useEffect(() => {
    fetchReservations();
  }, []);

  async function fetchReservations() {
    try {
      const response = await fetch('http://localhost:5001/api/Reservation');
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.log('Error fetching reservations:', error);
    }
  }
const handleFormSubmit = (e) => {
  e.preventDefault();
  // Send the new reservation data to the server
  fetch('http://localhost:5001/api/Reservation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newReservation),
  })
    .then((response) => response.json())
    .then((data) => {
      // Update the reservations list with the new reservation
      setReservations([...reservations, data]);
      // Reset the new reservation form
      setNewReservation({
        contact_ame: '',
        title: '',
        number_og_guests: 0,
        contact_phonenumber: '',
        created_date: ''
      });
    })
    .catch((error) => console.log(error));
};
  
return (
  <div className="reservation-container">
    <ul>
      {reservations.map((reservation) => (
        <ReservationItem
          key={reservation.id}
          reservation={reservation}
        />
      ))}
    </ul>
    {/* <form onSubmit={handleFormSubmit}>
      <h3>Add a New Reservation</h3>
    </form>
    <div>
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        name="contact_name"
        value={newReservation.contact_name}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <label htmlFor="date">Date:</label>
      <input
        type="text"
        id="date"
        name="created_date"
        value={newReservation.created_date}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <label htmlFor="numberOfGuests">Number of Guests:</label>
      <input
        type="number"
        id="numberOfGuests"
        name="numberOfGuests"
        min="1"
        value={newReservation.numberOfGuests}
        onChange={handleInputChange}
        required
      />
    </div>
    <div>
      <label htmlFor="phone">Phone:</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={newReservation.phone}
        onChange={handleInputChange}
        required
      />
    </div>

    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={newReservation.email}
        onChange={handleInputChange}
        required
      />
    </div>
  </div> */}
  </div>
);
      }

      export default ReservationList; 