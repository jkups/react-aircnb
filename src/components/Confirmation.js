import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../App.css';
//add import for selected page

const SERVER_BASE_URL = 'http://localhost:3000';

class Confirmation extends React.Component {

  state = {
    //reservations.json (booking code through params)
    bookingCode: "",
    startDate: "",
    endDate: "",
    propertyAddress: ""
  }

  printConfirmation = () => {
    window.print()
  }

  componentDidMount = () => {
    const id = this.props.match.params.reservation_id
    axios.get(`${SERVER_BASE_URL}/reservations/${id}.json`, {
      withCredentials: true
    })
    .then(res => {
      console.log(res.data);
      this.setState({
        bookingCode: res.data.booking_code,
        startDate: res.data.from_date,
        endDate: res.data.to_date,
        propertyAddress: res.data.property.address
      })
    })
    .catch(console.warn)
  }

  render() {
    const startDate = new Date(this.state.startDate)
    const endDate = new Date(this.state.endDate)

    return(
      <div className="container">
        <div>
          <h2>Congratulations!</h2>
          <h3>Booking confirmation: {this.state.bookingCode.toUpperCase()}</h3>
          <p>You have successfully booked:</p>
          <ul>
            <li>Property address: {this.state.propertyAddress}</li>
            <li>Dates: from {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()} </li>
          </ul>
          <div onClick={this.printConfirmation}>Print confirmation</div>
          <br />
          <br />
          <Link to="/search" className="button">Make another booking</Link>
        </div>
      </div>
    ); //return
  } //render
} // Confirmation class

export default Confirmation;
