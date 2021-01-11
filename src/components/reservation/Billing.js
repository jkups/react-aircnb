import React from 'react'
import Calendar from './Calendar'
import axios from 'axios'

const SERVER_BASE_URL = 'http://localhost:3000'
class Billing extends React.Component {
  state = {
    costPerDay: 110, //from reservation compo
    cleaningFee: 50, //from reservation compo
    serviceFee: 0, //from reservation compo
    total: 0,
    showCalendar: false,
    maxGuests: 3, //from reservation compo
    guestsCount: 1
  }

  toggleCalendar = () => {
    this.setState({
      showCalendar: !this.state.showCalendar
    })
  }

  clearCalendar = () => {
    console.log('here');
    const ranges = {}
    ranges['selection'] = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
    this.props.handleSelect(ranges)
  }

  updateGuestsCount = value => {
    const maxGuests = this.props.property.max_guests
    console.log(maxGuests);
    let guestsCount = this.state.guestsCount

    if(value && guestsCount < maxGuests ) guestsCount++
    if(!value && guestsCount > 1 ) guestsCount--

    this.setState({
      guestsCount: guestsCount
    })
  }

  makeReservation = () => {
    const user = {}
    axios.post(`${SERVER_BASE_URL}/reservations`,
      { user },
      { withCredentials: true }
    )
  }

  render(){
    const pricePerNight = this.props.property.price_per_night
    const maxGuests = this.props.property.max_guests
    const cleaningFee = this.props.property.cleaning_fee
    const serviceFee = this.props.property.service_fee

    const dateFormat = { year: 'numeric', month: 'short', day: 'numeric' };
    let dateDiff = (this.props.selectionRange.endDate - this.props.selectionRange.startDate) / 1000 / 60 / 60 / 24

    let nights = dateDiff <= 0 ? 'Select a date range' : `${dateDiff} nights`

    return(
      <div className="billing">
        <div>$765.00 <span>total</span></div>
        <div className="reserve">
          <div className="date-range" onClick={ this.toggleCalendar }>
            <div className="date left">
              <div>CHECK-IN</div>
              <div>
                {
                  this.props.selectionRange.startDate.toLocaleDateString()
                }
              </div>
            </div>
            <div className="date">
              <div>CHECKOUT</div>
              <div>
                {
                  this.props.selectionRange.endDate.toLocaleDateString()
                }
              </div>
            </div>
          </div>
          <div className="guests">
            <div>GUESTS</div>
            <div className="counter">
              <span onClick={ () => this.updateGuestsCount(false) }>-</span>
              <span onClick={ () => this.updateGuestsCount(true) }>+</span>
            </div>
            <div>
              { this.state.guestsCount }
              { this.state.guestsCount > 1 ? ' guests' : ' guest' }
            </div>
          </div>
          {
            this.state.showCalendar ?
              <div className="calendar floating">
                <div className="date-range floating">
                  <div className="date left">
                    <div>CHECK-IN</div>
                    <div>
                      {
                        this.props.selectionRange.startDate.toLocaleDateString()
                      }
                    </div>
                  </div>
                  <div className="date">
                    <div>CHECKOUT</div>
                    <div>
                      {
                        this.props.selectionRange.endDate.toLocaleDateString()
                      }
                    </div>
                  </div>
                </div>
                <div className="floating header">
                  <div>
                    { nights }
                  </div>
                  <div>
                    {
                      dateDiff <= 0 ?
                        <span>
                          Add your travel dates for exact pricing
                        </span> :
                        <span>
                          {
                            new Intl.DateTimeFormat('en-US', dateFormat).format(this.props.selectionRange.startDate)
                          }
                          &nbsp;-&nbsp;
                          {
                            new Intl.DateTimeFormat('en-US', dateFormat).format(this.props.selectionRange.endDate)
                          }
                        </span>
                    }
                  </div>
                </div>
                <Calendar
                  handleSelect={ this.props.handleSelect }
                  selectionRange={ this.props.selectionRange }
                />
                <div className="calendar action">
                  <span onClick={ this.clearCalendar }>
                    Clear dates
                  </span>
                  <span className="button" onClick={ this.toggleCalendar }>
                    Close
                  </span>
                </div>
              </div> : null
          }
          <span>
            You can have maixmum of { maxGuests } guests
          </span>
        </div>
        <div>
          {
            dateDiff <= 0 ?
              <button
                className="button"
                onClick={ this.toggleCalendar }
                >
                Check Availability
              </button> :
              <button
                className="button"
                onClick={ this.makeReservation }
                >
                Make Reservation
              </button>
          }
        </div>
        <div className="bill">
          {
            dateDiff <= 0 ?
              <div>
                <span>
                  Enter a date range and number of guests to check total lodging price, including any additional fees.
                </span>
              </div> :
              <div>
                <span>You wont be charged yet.</span>
                <span>Price shown is the total lodging price, including any additional fees.</span>
                <div className="bill-table">
                  <div>
                    <span>${ pricePerNight.toFixed(2) } x { dateDiff } nights</span>
                    <span>${ (pricePerNight * dateDiff).toFixed(2) }</span>
                  </div>
                  <div>
                    <span>Cleaning fee</span>
                    <span>${ cleaningFee.toFixed(2) }</span>
                  </div>
                  <div>
                    <span>Service fee</span>
                    <span>${ serviceFee.toFixed(2) }</span>
                  </div>
                </div>
                <div className="bill-total">
                  <span>Total</span>
                  <span>$385.00</span>
                </div>
              </div>
          }
        </div>
      </div>
    )
  }
}

export default Billing
