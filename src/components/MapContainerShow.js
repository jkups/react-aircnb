import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class MapContainerShow extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          lat: -33.8688197,
          long: 151.2092955,
      };
  };

  // componentDidMount(){
  //   this.setState({
  //     lat: this.props.lat,
  //     long: this.props.long
  //   });
  // }

  // componentDidUpdate(prevProps) {
  //   if(prevProps.locations !== this.props.locations){
  //     const bounds = new this.props.google.maps.LatLngBounds();
  //       // for (let i = 0; i < points.length; i++) {
  //       this.props.locations.forEach((item, i) => {
  //         bounds.extend({lat:item.latitude,lng:item.longitude});
  //       });
  //       this.setState({bounds});
  //   }
  // }

  // displayMarkers = () => {
  // return this.props.locations.map((location, index) => {
  //     return <Marker
  //               key={index}
  //               id={index}
  //               position={{
  //                 lat: location.latitude,
  //                 lng: location.longitude
  //               }}
  //               onClick={() => console.log("You clicked me!")}
  //               title={"$100"}
  //               icon={{
  //                 url: `https://chart.googleapis.com/chart?chst=d_bubble_icon_texts_big&chld=home|bb|FFFFFF|000000|${location.title}|${location.heading}|$${location.listing_price} p/n|Max Guests: ${location.max_guests}`,
  //               }}
  //               />
  //   })
  // }

render(){
  const mapStyles = {
    width: '600px',
    height: '400px',
  };
  console.log("Inside lat: ",this.state.lat);
  console.log("Inside long: ",this.state.long);
  console.log("location: ",this.props.locations);
  // console.log("Locations: ",this.props.locations);
    return (
      <div className="">
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          initialCenter={{ lat: this.props.lat, lng: this.props.long}}
        >
        <Marker
                  key="1"
                  id="1"
                  position={{
                    lat: this.props.lat,
                    lng: this.props.long
                  }}
                  onClick={() => console.log("You clicked me!")}
                  title={"$100"}
                  icon={{
                    url: `https://chart.googleapis.com/chart?chst=d_bubble_icon_texts_big&chld=home|bb|FFFFFF|000000|${this.props.locations.title}|${this.props.locations.heading}|$${this.props.locations.listing_price} p/n|Max Guests: ${this.props.locations.max_guests}`,
                  }}
                  />
        </Map>
      </div>
    ); //return
  }; //function
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAW5MNODxdAncbpnSGtOIl6Gyfjo-e6w3g'
})(MapContainerShow);
