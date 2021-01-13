import React from 'react'
import Billing from './Billing'
import './Reservation.css'
import '../authentication/Auth.css'
import MapContainerShow from '../MapContainerShow';
import axios from 'axios'
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
    	images: [],
    	max_guests: 0,
    	listing_price: 0,
    	bedrooms: 0,
    	bathrooms: 0,
    	amenities: '',
    	cleaning_fee: 0,
    	service_fee: 0,
      longitude: -33.8688197,
      latitude: 151.2092955
    }
  }

  handleSelect = ranges => {
    this.setState({
      ranges: ranges.selection
    })
  }

  processReservation = reservation => {
    const url = `/book/${reservation.id}/${reservation.from_date}/${reservation.to_date}`

    this.props.history.push(url)
  }

  componentDidMount = () => {
    const url = `${SERVER_BASE_URL}/properties/${this.props.match.params.listing_id}.json`
    const startDate = `'${this.props.match.params.startDate}'`
    const endDate = `'${this.props.match.params.endDate}'`
    console.log("listing:", this.props.match.params.listing_id, url);
    axios.get(url)
    .then(res => {
      this.setState({
        ranges: {
          startDate: new Date(startDate),
          endDate: new Date(endDate),
          key: "selection"
        },
        property: res.data[0]
      })
      console.log("Data object: ", res.data[0]);
    })

  }

  render(){
    const address = this.state.property.address
    const locations = [{
      longitude:this.state.property.longitude,
      latitude:this.state.property.latitude
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
              <span>5.0 (8)</span>
            </div>
          </div>
          <div className="image-gallery">
            <ul>
              <li>
                <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
              </li>
              <li>
                <ul>
                  <li>
                    <img src="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
                  </li>
                  <li>
                    <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80" />
                  </li>
                </ul>
                <ul>
                  <li>
                    <img src="https://images.unsplash.com/photo-1584455333741-c8192566df82?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80" />
                  </li>
                  <li>
                    <img src="https://images.unsplash.com/photo-1574873215043-44119461cb3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" />
                  </li>
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
                <h4>Reviews</h4>

                     <Reviews propertydata={this.state.property}/>

              </div>
              <div className="map">
                <h4>Location</h4>
                {
                  locations.length > 0 ?
                  <MapContainerShow lat={this.state.latitude} long={this.state.londitude} locations={this.state.property} />
                    :
                  <p>Loading...</p>
                }
              </div>
            </li>
            <li>
              <div className="right">
                <Billing
                  toggleAuthModal={ this.props.toggleAuthModal}
                  selectionRange={ this.state.ranges }
                  property={ this.state.property }
                  handleSelect={ this.handleSelect }
                  isLoggedIn={ this.props.isLoggedIn }
                  processReservation={ this.processReservation }
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
