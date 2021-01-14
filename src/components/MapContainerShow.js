import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class MapContainerShow extends React.Component {
  constructor(props) {
      super(props);
      // this.state = {
      //     lat: -33.8688197,
      //     long: 151.2092955,
      // };
  };


render(){
  const mapStyles = {
    width: '100%',
    height: '100%',
  };
  // console.log("Inside lat: ",this.state.lat);
  // console.log("Inside long: ",this.state.long);
  // console.log("**location: **",this.props.locations.title,this.props.locations.heading,this.props.locations.listing_price,this.props.locations.max_guests);
  // console.log("Locations: ",this.props.locations);
    return (
      <div className="Top">
        <Map
          google={this.props.google}
          zoom={11}
          style={mapStyles}
          initialCenter={this.props.coOrds[0]}
        >
        <Marker
          key="1"
          id="1"
          position={this.props.coOrds[0]}
          onClick={() => console.log("You clicked me!")}
          title={"$100"}
          icon={{
            url: `https://chart.googleapis.com/chart?chst=d_bubble_icon_texts_big&chld=home|bb|FFFFFF|000000|${this.props.locations.title}|${this.props.locations.heading}|$${this.props.locations.listing_price} p/n|Max Guests: ${this.props.locations.max_guests}`
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
