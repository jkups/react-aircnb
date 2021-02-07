import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import '../../App.css';

const SERVER_BASE_URL = 'http://localhost:3000';

class Confirmation extends React.Component {

  state = {
    reservation: {
      from_date: '2021-01-01',
      to_date: '2021-01-01',
      total_due: 0,
      guests_count: 0,
      booking_code: '',
      property: {
        heading: '',
        title: '',
        address: '',
        bedrooms: 0,
        bathrooms: 0,
        cleaning_fee: 0,
        service_fee: 0,
        listing_price: 0
      }
    }
  }

  formatCurrency = value => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
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
      this.setState({
        reservation: res.data
      })
    })
    .catch(console.warn)
  }

  render() {
    const startDate = new Date(this.state.reservation.from_date)
    const endDate = new Date(this.state.reservation.to_date)

    const {
      booking_code: bookingCode,
      guests_count: guestsCount,
      total_due: totalDue
    } = this.state.reservation

    const {
      address,
      listing_price: pricePerNight,
      cleaning_fee: cleaningFee,
      service_fee: serviceFee,
      heading,
      title,
      bedrooms,
      bathrooms
    } = this.state.reservation.property

    const dateDiff = (endDate - startDate) / 1000 / 60 / 60 / 24
    const total = pricePerNight * dateDiff

    return(
      <div className="container">
        <div className="payment">
          <div>
            <span></span>
            <h3>Booking confirmation</h3>
          </div>
          <ul>
            <li>
              <div className="right">
                <ul>
                  <li className="property-image">
                    <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" width="100%" />
                  </li>
                  <li className="property-details">
                    <div>{title}</div>
                    <div>{heading}</div>
                    <div>{bedrooms} bed&nbsp;&#183;&nbsp;{bathrooms} bath</div>
                    <div>5.0 (8)</div>
                  </li>
                </ul>
                <div className="trip">
                  <h5>Your trip</h5>
                  <ul>
                    <li className="dates">
                      <div>Dates</div>
                      <div>{startDate.toLocaleDateString('en-GB')} - {endDate.toLocaleDateString('en-GB')}</div>
                    </li>
                    <li className="guests-count">
                      <div>Guests</div>
                      <div>{guestsCount} guest</div>
                    </li>
                  </ul>
                </div>
                <div className="price">
                  <h5>Price details</h5>
                    <div className="bill-table">
                      <div>
                        <span>
                          {this.formatCurrency(pricePerNight)} x {dateDiff} nights
                        </span>
                        <span>
                          {this.formatCurrency(total)}
                        </span>
                      </div>
                      <div>
                        <span>Cleaning fee</span>
                        <span>{this.formatCurrency(cleaningFee)}</span>
                      </div>
                      <div>
                        <span>Service fee</span>
                        <span>{this.formatCurrency(serviceFee)}</span>
                      </div>
                    </div>
                    <div className="bill-total">
                      <span>Total Paid</span>
                      <span>
                        {this.formatCurrency(totalDue)}
                      </span>
                    </div>
                </div>
              </div>
            </li>
            <li>
              <div className="confirmation">
                <div>
                  <p>
                    <strong>
                      Congratulations. Your booking went through!
                    </strong>
                  </p>
                  <p>You should have received a confirmation email from our team with all the details of your booking. But in the meantime, here is your booking code.</p>

                  <h4><strong>{bookingCode.toUpperCase()}</strong></h4>

                  <p>You will need to keep this code handy if and when you need to speak with any of our support staff.</p>
                </div>
                <div>
                  <p>The property is located at <strong>{address}</strong>, and we wish you a splendid trip.</p>
                </div>
                <div className="confirmation-action">
                  <div className="button" onClick={this.printConfirmation}>Print confirmation</div>
                  <Link to="/" className="button">Make another booking</Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    ); //return
  } //render
} // Confirmation class

export default Confirmation;
