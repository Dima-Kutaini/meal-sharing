/** @format */

import React from 'react';

const ReservationItem = ({ reservation }) => {
  return (
    <div className=" reservation-card">
      <h3 className="title">{reservation.title}</h3>
      <p className="persons-number">
        Number of persons: {reservation.number_of_guests}
      </p>
      <p className="date">
        <strong>Date:  </strong>
        {new Date(reservation.created_date).toLocaleString()}
      </p>
    </div>
  );
};
export default ReservationItem;
