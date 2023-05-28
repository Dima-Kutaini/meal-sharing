 
 import React from "react";

 const ReservationItem=({reservation})=>{

    return(
        <div className=" reservation-card">
           <h3 className="title">{reservation.title }</h3> 
         <p className="persons-number">  number of persons: { reservation.number_of_guests}</p>
         <p className="date">date·{reservation.created_date}</p>
        </div>
    )
 }
 export default ReservationItem; 