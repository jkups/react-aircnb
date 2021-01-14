import React from 'react';
// import axios from 'axios';
import '../App.css'


const ReservationsProfile = (props)=>{
  return(
    <div>
      <h1> {props.reservation.booking_code}   </h1>
      <p>
        <ul>
          <li>From Date: {props.reservation.from_date}</li>
          <li>To Date: {props.reservation.to_date}</li>
          <li>To Date: {props.reservation.to_date}</li>
          <li>Guests: {props.reservation.guests_count}</li>
          <li>Total Paid: {props.reservation.total_paid}</li>

        </ul>
      </p>

    </div>
  )
}



export default ReservationsProfile
