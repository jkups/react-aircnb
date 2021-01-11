import React from 'react'
import Billing from './Billing'
import './Reservation.css'
import '../authentication/Auth.css'

class Reservation extends React.Component {
  state = {
    ranges: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
    property: {
    	id: 9,
    	heading: 'Private en-suite in leafy Thornbury',
    	title: 'Private room in house',
    	address: 'Thornbury,Victoria,Australia',
    	description: 'Generous front room with queen bed, desk, walk-in wardrobe and private bathroom in a two-storey house. Open plan kitchen, dining and living space, unrestricted parking available in the street. My partner and I live on the first floor with our two cats (not allowed in your room). Our place is located right across a park, a 2-min walk from a bus stop straight into Brunswick East, Fitzroy and the city. The 86 tram and High Street are only a short 15 min walk away.',
    	photos: [
    		'1512918728675-ed5a9ecdebfd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    		'1595526114035-0d45ed16cfbf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    		'1522771739844-6a9f6d5f14af?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
    		'1584455333741-c8192566df82?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
    		'1574873215043-44119461cb3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    	],
    	max_guests: 4,
    	price_per_night: 113.40,
    	rooms: 3,
    	bed: 3,
    	amenities: [
        'Kitchen',
        'First aid kit',
        'Washing machine',
        'Free parking on premises',
        'Hangers',
        'Iron',
        'Hair dryer',
        'Smoke alarm'
      ],
    	cleaning_fee: 85.00,
    	service_fee: 50.00
    }
  }

  handleSelect = ranges => {
    console.log(ranges);
    this.setState({
      ranges: ranges.selection
    })
  }

  render(){
    const selectionRange = this.state
    const address = this.state.property.address
    const amenitiesOne = this.state.property.amenities.slice()
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
                  <span>{ this.state.property.maxguests } guests</span> &nbsp;&nbsp;&#183;&nbsp;&nbsp;
                  <span>{ this.state.property.rooms } bedroom</span> &nbsp;&nbsp;&#183;&nbsp;&nbsp;
                  <span>{ this.state.property.bed } bed</span>
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
              <div className="map">
                <h4>Location</h4>
                <iframe class="border rounded shadow-sm" allowfullscreen="" frameborder="0" src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCdUMO5lFn8XLThP8fHi1b_2mIxEdJsv0c&amp;q=${ address }&amp;zoom=11`} width="100%" height="400"></iframe>
              </div>
            </li>
            <li>
              <div className="right">
                <Billing
                  selectionRange={ this.state.ranges }
                  property={ this.state.property }
                  handleSelect={ this.handleSelect }
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
