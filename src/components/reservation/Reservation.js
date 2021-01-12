import React from 'react'
import Billing from './Billing'
import axios from 'axios';
import './Reservation.css'
import '../authentication/Auth.css'
import MapContainerShow from '../MapContainerShow';
import Reviews from './Reviews'

const LISTING_DISPLAY_API = "http://localhost:3000/properties/";

class Reservation extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        propertyData: [],
        ranges: {
          startDate: new Date(),
          endDate: new Date(),
          key: "selection",
        },
        id: '',
        heading: '',
        title: '',
        address: '',
        description: '',
        photos: [], //end properties
        max_guests: 0,
        price_per_night: 0,
        rooms: '',
        bed: '',
        amenities: [], //End Amenities
        cleaning_fee: 0,
        service_fee: 0,
        longitude: -33.8688197,
        latitude: 151.2092955,
        locations: [],
      };
  };

  componentDidMount(){
    const url = LISTING_DISPLAY_API + this.props.match.params.listing_id + ".json";
    axios.get(url)
    .then(res => {
      // console.log(res.data[0]);
      this.setState({
        propertyData: res.data,
        ranges: {
          startDate: this.props.match.params.startDate,
          endDate: this.props.match.params.endDate,
          key: "selection"
        }, //End ranges
        id: res.data[0].id,
        heading: res.data[0].heading,
        title: res.data[0].title,
        address: res.data[0].address,
        description: res.data[0].description,
        photos: [
           res.data[0].images[0].image_url,
           res.data[0].images[1].image_url,
           res.data[0].images[2].image_url,
           res.data[0].images[3].image_url,
           res.data[0].images[4].image_url,
         ], //end properties
        max_guests: res.data[0].max_guests,
        price_per_night: res.data[0].listing_price,
        rooms: res.data[0].bathrooms,
        bed: res.data[0].bedrooms,
        amenities: res.data[0].amenities.split(","), //End Amenities
        cleaning_fee: res.data[0].cleaning_fee,
        service_fee: res.data[0].service_fee,
        longitude: res.data[0].longitude,
        latitude: res.data[0].latitude,
        locations: [{longitude:res.data[0].longitude, latitude:res.data[0].latitude}]
      }) // Ene State
    }) // End Then
    .catch(console.warn())
  } //end componentDidMount

  handleSelect = ranges => {
    // console.log(ranges);
    this.setState({
      ranges: ranges.selection
    })
  }

  render(){
    const selectionRange = this.state
    const address = this.state.address
    const amenitiesOne = this.state.amenities.slice()
    const amenitiesTwo = amenitiesOne.splice(-amenitiesOne.length/2)

      // console.log("selectionRange:",this.state.ranges );
      // console.log("costPerDay:",this.state.price_per_night );
      // console.log("cleaningFee:",this.state.cleaning_fee );
      // console.log("serviceFee:",this.state.service_fee );
      // console.log(  "maxGuests:",this.state.max_guests );
      // console.log("handleSelect:",this.handleSelect  );

    return(
      <div className="container">
        <div className="spacer">
        </div>
        <div className="reservation">
          <div className="primary-header">
            <h3>{ this.state.heading }</h3>
            <div>
              <span>{ this.state.address }</span>&nbsp;&nbsp;&#183;&nbsp;&nbsp;
              <span>5.0 (8)</span>
            </div>
          </div>
          <div className="image-gallery">
            <ul>
              <li>
                <img src={ this.state.photos[0] } />
              </li>
              <li>
                <ul>
                  <li>
                    <img src={ this.state.photos[1] } />
                  </li>
                  <li>
                    <img src={ this.state.photos[2] } />
                  </li>
                </ul>
                <ul>
                  <li>
                    <img src={ this.state.photos[3] } />
                  </li>
                  <li>
                    <img src={ this.state.photos[4] } />
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <ul>
            <li className="left">
              <div className="secondary-header">
                <h4>{ this.state.title }</h4>
                <div>
                  <span>{ this.state.max_guests } guests</span> &nbsp;&nbsp;&#183;&nbsp;&nbsp;
                  <span>{ this.state.bed } bedroom</span> &nbsp;&nbsp;&#183;&nbsp;&nbsp;
                  <span>{ this.state.rooms } bathrooms</span>
                </div>
              </div>
              <div className="description">
                { this.state.description }
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

                     <Reviews />

              </div>
              <div className="map">
                <h4>Location</h4>
                  {
                    this.state.locations.length > 0 ?
                    <MapContainerShow lat={this.state.latitude} long={this.state.longitude} locations={this.state.propertyData} />
                      :
                    <p>Loading...</p>
                  }
              </div>
            </li>
            <li>
              <div className="right">
                <Billing
                  selectionRange={ this.state.ranges }
                  costPerDay={this.state.price_per_night}
                  cleaningFee={this.state.cleaning_fee}
                  serviceFee={this.state.service_fee}
                  maxGuests={this.state.max_guests}
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

// <Billing
//   selectionRange={ this.state.ranges }
//   costPerDay={this.state.price_per_night}
//   cleaningFee={this.state.cleaning_fee}
//   serviceFee={this.state.service_fee}
//   maxGuests={this.state.max_guests}
//   handleSelect={ this.handleSelect }
// />


// ranges: {
//   startDate: new Date(),
//   endDate: new Date(),
//   key: 'selection',
// },
// property: {
//   id: 9,
//   heading: 'Private en-suite in leafy Thornbury',
//   title: 'Private room in house',
//   address: 'Thornbury,Victoria,Australia',
//   description: 'Generous front room with queen bed, desk, walk-in wardrobe and private bathroom in a two-storey house. Open plan kitchen, dining and living space, unrestricted parking available in the street. My partner and I live on the first floor with our two cats (not allowed in your room). Our place is located right across a park, a 2-min walk from a bus stop straight into Brunswick East, Fitzroy and the city. The 86 tram and High Street are only a short 15 min walk away.',
//   photos: [
//     '1512918728675-ed5a9ecdebfd?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
//     '1595526114035-0d45ed16cfbf?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
//     '1522771739844-6a9f6d5f14af?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
//     '1584455333741-c8192566df82?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
//     '1574873215043-44119461cb3b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
//   ],
//   max_guests: 4,
//   price_per_night: 113.40,
//   rooms: 3,
//   bed: 3,
//   amenities: [
//     'Kitchen',
//     'First aid kit',
//     'Washing machine',
//     'Free parking on premises',
//     'Hangers',
//     'Iron',
//     'Hair dryer',
//     'Smoke alarm'
//   ],
//   cleaning_fee: 85.00,
//   service_fee: 50.00
// }
// }


// <Billing
//   selectionRange={ this.state.ranges }
//   property={ this.state.propertyData }
//   handleSelect={ this.handleSelect }
// />


// {
// //   amenitiesOne.map( (el, idx) => (
// //     <div key={ idx }>
// //       <span>{ el }</span>
// //     </div>
// //   ))
//  }

// {
//   // amenitiesTwo.map( (el, idx) => (
//   //   <div key={ idx }>
//   //     <span>{ el }</span>
//   //   </div>
//   // ))
// }
