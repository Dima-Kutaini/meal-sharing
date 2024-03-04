/** @format */

import React, { useEffect, useState } from 'react';
import ReservationItem from './ReservationItem';

const ReservationList = () => {
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({
    title: '',
    number_of_guests: '',
    created_date: '',
    contact_phonenumber: '',
    contact_name: '',
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
          contact_name: '',
          title: '',
          number_of_guests: '',
          created_date: '',
          contact_phonenumber: '',
          contact_name: '',
        });
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReservation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="reservation-container">
      <ul className="reservation-cards">
        {reservations.map((reservation) => (
          <ReservationItem
            key={reservation.id}
            reservation={reservation}
          />
        ))}
      </ul>
    </div>
  );
};

export default ReservationList;
