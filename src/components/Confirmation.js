import React from 'react';
import axios from 'axios';
import '../App.css';
//add import for selected page


class Confirmation extends React.Component {

  state = {
    //reservations.json (booking code through params)
    propsBookingConfirmation: "er345rs",
    propsDateFrom: "18-01-2021",
    propsDateTo: "20-1-2021",
    propsPropertyAddress: "123 ABC Street",
  }

  render() {


    return(
      <div>
      <h2>Congratulations!</h2>
      <h3>Booking confirmation: {this.state.propsBookingConfirmation}</h3>
      <p>You have successfully booked:</p>
      <ul>
        <li>Property address: {this.state.propsPropertyAddress}</li>
        <li>Dates: from {this.state.propsDateFrom} to {this.state.propsDateTo} </li>
      </ul>
      <a href="javascript:window.print()">Print confirmation</a>
      <br />
      <br />
      <button>Make another booking</button>


      </div>

    ); //return
  } //render
} // Confirmation class

export default Confirmation;
