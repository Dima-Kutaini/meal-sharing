/** @format */

import React, { useEffect, useState } from 'react';
import ReservationItem from './ReservationItem';
import { useParams } from 'react-router-dom';

const ReservationByMealId = () => {
  const { id } = useParams();
  const [reservations, setReservations] = useState([]);
  const [newReservation, setNewReservation] = useState({
    title: '',
    number_of_guests: '',
    created_date: '',
    contact_phonenumber: '',
    contact_name: '',
  });

  const [isReservationAvailable, setIsReservationAvailable] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, [id]);

  async function fetchReservations() {
    try {
      const response = await fetch(
        `http://localhost:5001/api/meals/${id}/Reservation`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }
      const data = await response.json();
      setReservations(data);

      setIsReservationAvailable(data.length > 0);
    } catch (error) {
      console.log('Error fetching reservations:', error);
    }
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Send the new reservation data to the server
    fetch(`http://localhost:5001/api/Reservation${id}`, {
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
      {reservations.length > 0 ? (
        <div>
          <ul className="reservation-card">
            {reservations.map((reservation) => (
              <ReservationItem
                key={reservation.id}
                reservation={reservation}
              />
            ))}
          </ul>

          {isReservationAvailable && (
            <form
              onSubmit={handleFormSubmit}
              className="reservation-form">
              <h3>Add a New Reservation</h3>
              <div className="form-row">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newReservation.title}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-row">
                <label htmlFor="number_of_guests">Number of Guests:</label>
                <input
                  type="text"
                  id="number_og_guests"
                  name="number_of_guests"
                  min="1"
                  value={newReservation.number_of_guests}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="createdDate">Date:</label>
                <input
                  type="text"
                  id="createdDate"
                  name="created_date"
                  value={newReservation.created_date}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="contactPhoneNumber">Phone:</label>
                <input
                  type="tel"
                  id="contactPhoneNumber"
                  name="contact_phonenumber"
                  value={newReservation.contact_phonenumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-row">
                <label htmlFor="contactName">Name:</label>
                <input
                  type="text"
                  id="contact_name"
                  name="contact_name"
                  value={newReservation.contact_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button
                type="submit"
                onSubmit={handleFormSubmit}>
                {' '}
                Submit
              </button>
            </form>
          )}
        </div>
      ) : (
        <p>No reservations available for this meal</p>
      )}
      {/* <ul className="reservation-card">
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <ReservationItem
              key={reservation.id}
              reservation={reservation}
            />
          ))
        ) : (
          <p>Reservation is not available for this meal</p>
        )}
      </ul>
      <form
        onSubmit={handleFormSubmit}
        className="reservation-form">
        <h3>Add a New Reservation</h3>

        <div className="form-row">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newReservation.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-row">
          <label htmlFor="number_of_guests">Number of Guests:</label>
          <input
            type="text"
            id="number_og_guests"
            name="number_of_guests"
            min="1"
            value={newReservation.number_of_guests}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="createdDate">Date:</label>
          <input
            type="text"
            id="createdDate"
            name="created_date"
            value={newReservation.created_date}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="contactPhoneNumber">Phone:</label>
          <input
            type="tel"
            id="contactPhoneNumber"
            name="contact_phonenumber"
            value={newReservation.contact_phonenumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="contactName">Name:</label>
          <input
            type="text"
            id="contact_name"
            name="contact_name"
            value={newReservation.contact_name}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="submit"
          onSubmit={handleFormSubmit}>
          {' '}
          Submit
        </button>
      </form> */}
    </div>
  );
};

export default ReservationByMealId;
