import React from 'react'
import MapProperty from '../geomap/MapProperty';
import axios from 'axios'
import queryString from 'query-string';
import Billing from './Billing'
import './Reservation.css'
import '../authentication/Auth.css'
import Reviews from './Reviews'

const SERVER_BASE_URL = 'http://localhost:3000'

class Reservation extends React.Component {
  state = {
    ranges: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
    property: {
    	id: 0,
    	heading: '',
    	title: '',
    	address: '',
    	description: '',
    	images: [{}],
    	max_guests: 0,
    	listing_price: 0,
    	bedrooms: 0,
    	bathrooms: 0,
    	amenities: '',
    	cleaning_fee: 0,
    	service_fee: 0,
      longitude: -33.8688197,
      latitude: 151.2092955,
      reviews: [],
      reservations: [],
    },
    reservedDates: [],
    selectionReserved: false
  }

  handleSelect = ranges => {
    this.setState({
      ranges: ranges.selection,
      selectionReserved: false
    })
  }

  processReservation = reservation => {
    let startDate = new Date(reservation.from_date).toLocaleDateString()
    let endDate = new Date(reservation.to_date).toLocaleDateString()

    startDate = startDate.split('/').join('-')
    endDate = endDate.split('/').join('-')

    this.props.history.push({
      pathname: `/book/${reservation.id}`,
      search: '?' + new URLSearchParams({
        checkin: startDate,
        checkout: endDate,
      }).toString()
    })
  }

  componentDidMount = () => {
    const search = this.props.location.search
    const id = this.props.match.params.id
    let startDate = (queryString.parse(search).checkin).split('-')
    let endDate = (queryString.parse(search).checkout).split('-')

    startDate = new Date(startDate[2],startDate[1]-1,startDate[0])
    endDate = new Date(endDate[2],endDate[1]-1,endDate[0])

    const url = `${SERVER_BASE_URL}/properties/${id}.json`
    axios.get(url)
    .then(res => {
      this.setState({
        ranges: {
          startDate: startDate,
          endDate: endDate,
          key: "selection"
        },
        property: res.data[0]
      })

      this.getReservedDates()
    })
  }

  rating = () => {
    const reviews = this.state.property.reviews
    const reviewsCount = reviews.length
    const avgRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviewsCount

    const stars = [];
    for(let i = 0; i < Math.round(avgRating); i++){
      stars.push(<span className="star-rating"> &#9733; </span>)
    }

    return { stars, reviewsCount, avgRating }
  }

  isSelectionRangeReserved = reservedDates => {
    const startDate = this.state.ranges.startDate
    const endDate =  this.state.ranges.endDate
    const dateDiff = (endDate - startDate)/ 1000 / 60 / 60 / 24

    if(reservedDates){
      for(let i = 0; i <= dateDiff; i++){
        const date = startDate.toDateString()

        for(const reserved of reservedDates){
          if(reserved.toDateString() === date){
            return true
          }
        }
        startDate.setDate(startDate.getDate() + 1)
      }
    }
  }

  getReservedDates = () => {
    const reservations = this.state.property.reservations.slice()
    if(reservations.length === 0) return null

    const reservedDates = reservations.flatMap(date => {
      const dateRange = []
      const startDate = new Date(date.from_date)
      const endDate =  new Date(date.to_date)
      const dateDiff = (endDate - startDate)/ 1000 / 60 / 60 / 24

      for(let i = 0; i <= dateDiff; i++){
        dateRange.push(new Date(startDate.getTime()));
        startDate.setDate(startDate.getDate() + 1);
      }
      return dateRange

    }).filter((date, idx, arr) => idx === arr.indexOf(date))

    const selectionReserved = this.isSelectionRangeReserved(reservedDates)

    if(selectionReserved){
      this.setState({
        ranges: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection"
        }
      })
    }

    this.setState({
      reservedDates: reservedDates,
      selectionReserved: selectionReserved
    })
  }

  render(){

    //hard coded additional property images for simplicity :)
    const propertyImages = {
      first: [
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80'
      ],
      second: [
        'https://images.unsplash.com/photo-1584455333741-c8192566df82?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
        'https://images.unsplash.com/photo-1574873215043-44119461cb3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
      ]
    }

    const coordinates = [{
      lng:this.state.property.longitude,
      lat:this.state.property.latitude
    }]

    const amenitiesOne = this.state.property.amenities.split(',')
    const amenitiesTwo = amenitiesOne.splice(-amenitiesOne.length/2)

    return(
      <div className="container">
        <div className="reservation">
          <div className="primary-header">
            <h3>{ this.state.property.heading }</h3>
            <div>
              <span>{ this.state.property.address }</span>&nbsp;&nbsp;&#183;&nbsp;&nbsp;
              <span>
                <span className="star-rating">&#9733;</span>&nbsp;
                {this.rating().avgRating} ({this.rating().reviewsCount} Comments)
              </span>
            </div>
          </div>
          <div className="image-gallery">
            <ul>
              <li>
                <img src={`https://res.cloudinary.com/dhl1cdqch/image/upload/v1610626496/${this.state.property.images[0].image_url}`} alt=""/>
              </li>
              <li>
                <ul>
                  {
                    propertyImages.first.map((image, idx) => (
                      <li key={idx}>
                        <img src={image} alt=""/>
                      </li>
                    ))
                  }
                </ul>
                <ul>
                  {
                    propertyImages.second.map((image, idx) => (
                      <li key={idx}>
                        <img src={image} alt=""/>
                      </li>
                    ))
                  }
                </ul>
              </li>
            </ul>
          </div>
          <ul>
            <li className="left">
              <div className="secondary-header">
                <h4>{ this.state.property.title }</h4>
                <div>
                  <span>{ this.state.property.max_guests } guests</span> &nbsp;&nbsp;&#183;&nbsp;&nbsp;
                  <span>{ this.state.property.bedrooms } bedroom</span> &nbsp;&nbsp;&#183;&nbsp;&nbsp;
                  <span>{ this.state.property.bathrooms } bathroom</span>
                </div>
              </div>
              <div className="description">
                { this.state.property.description }
              </div>
              <div className="amenities">
                <h4>Amenities</h4>
                <ul>
                  <li>
                    {
                      amenitiesOne.map( (el, idx) => (
                        <div key={ idx }>
                          <span>{ el }</span>
                        </div>
                      ))
                    }
                  </li>
                  <li>
                    {
                      amenitiesTwo.map( (el, idx) => (
                        <div key={ idx }>
                          <span>{ el }</span>
                        </div>
                      ))
                    }
                  </li>
                </ul>
              </div>
              <div className="amenities">
                <h4>Reviews { this.rating().stars }</h4>
                  {
                       this.state.property.reviews.map((review,index) => <Reviews key={index} review={review} />)
                  }
              </div>
              <div className="map">
                <h4>Location</h4>
                <div className="map-wrapper">
                {
                    this.state.property.listing_price > 0 ?
                      <MapProperty coordinates={coordinates} locations={this.state.property} />
                        :
                      <p>Loading...</p>
                }
                </div>
              </div>
            </li>
            <li>
              <div className="right">
                <Billing
                  switchAuthForm={ this.props.switchAuthForm}
                  selectionRange={ this.state.ranges }
                  property={ this.state.property }
                  handleSelect={ this.handleSelect }
                  isLoggedIn={ this.props.isLoggedIn }
                  processReservation={ this.processReservation }
                  reservedDates={ this.state.reservedDates }
                  selectionReserved={ this.state.selectionReserved }
                />
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Reservation
