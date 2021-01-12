import React from 'react'
import Braintree from './Braintree'
import axios from 'axios'
import './Payment.css'
import '../authentication/Auth.css'

const SERVER_BASE_URL = 'http://localhost:3000';


class Payment extends React.Component {

  state = {
    data: {}
  }

  processPayment = nonce => {
    const id = this.props.match.params.reservation_id
    axios.post(`${SERVER_BASE_URL}/pay/${id}`, {
      nonce: nonce
    })
    .then( res => {
      console.log(res);
    })
    .catch(console.warn)
  }

  formatCurrency = value => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)
  }

  componentWillMount = () => {
    const query = new URLSearchParams(this.props.location.search);
    console.log(query);
    if(query){
      const data = {
        startDate: query.get("startDate"),
        endDate: query.get("endDate"),
        guests_count: query.get("guests_count"),
        listing_price: query.get("listing_price"),
        cleaning_fee: query.get("cleaning_fee"),
        service_fee: query.get("service_fee"),
        total_due: query.get("total_due"),
        heading: query.get("heading"),
        title: query.get("title"),
        bed: query.get("bed"),
        bath: query.get("bath")
      }

      this.setState({ data })
    } else {
      this.props.history.push('/search')
    }
  }


  render(){
    const query = new URLSearchParams(this.props.location.search);

    const startDate =  this.state.data.startDate.split('-')
    const endDate =  this.state.data.endDate.split('-')
    const guests_count =  this.state.data.guests_count
    const listing_price =  this.state.data.listing_price
    const cleaning_fee =  this.state.data.cleaning_fee
    const service_fee =  this.state.data.service_fee
    const total_due =  this.state.data.total_due
    const heading =  this.state.data.heading
    const title =  this.state.data.title
    const bed =  this.state.data.bed
    const bath =  this.state.data.bath

    const dateDiff = parseInt(endDate[2]) - parseInt(startDate[2])
    const total = parseInt(listing_price) * dateDiff

    const dateFormat = { year: 'numeric', month: 'numeric', day: 'numeric' };

    return(
      <div className="container">
        <div className="payment">
          <div>
            <span></span>
            <h3>Confirm and pay</h3>
          </div>
          <ul>
            <li>
              <div className="right">
                <ul>
                  <li className="property-image">
                    <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" width="100%" />
                  </li>
                  <li className="property-details">
                    <div>{title}</div>
                    <div>{heading}</div>
                    <div>{bed} bed&nbsp;&#183;&nbsp;{bath} bath</div>
                    <div>5.0 (8)</div>
                  </li>
                </ul>
                <div className="trip">
                  <h5>Your trip</h5>
                  <ul>
                    <li className="dates">
                      <div>Dates</div>
                      <div>{startDate[2]}/{startDate[1]}/{startDate[0]} - {endDate[2]}/{endDate[1]}/{endDate[0]}</div>
                    </li>
                    <li className="guests-count">
                      <div>Guests</div>
                      <div>{guests_count} guest</div>
                    </li>
                  </ul>
                </div>
                <div className="price">
                  <h5>Price details</h5>
                    <div className="bill-table">
                      <div>
                        <span>
                          {this.formatCurrency(listing_price)} x {dateDiff} nights
                        </span>
                        <span>
                          {this.formatCurrency(total)}
                        </span>
                      </div>
                      <div>
                        <span>Cleaning fee</span>
                        <span>{this.formatCurrency(cleaning_fee)}</span>
                      </div>
                      <div>
                        <span>Service fee</span>
                        <span>{this.formatCurrency(service_fee)}</span>
                      </div>
                    </div>
                    <div className="bill-total">
                      <span>Total</span>
                      <span>
                        {this.formatCurrency(total_due)}
                      </span>
                    </div>
                </div>
              </div>
            </li>
            <li>
              <Braintree processPayment={ this.processPayment }/>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Payment
