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

  componentDidMount(){
    this.setState({
      lat: this.props.lat,
      long: this.props.long
    });
  }

  displayMarkers = () => {
  return this.props.locations.map((location, index) => {
      return <Marker
                key={index}
                id={index}
                position={{
                  lat: location.latitude,
                  lng: location.longitude
                }}
                onClick={() => console.log("You clicked me!")}
                title={"$100"}
                icon={{
                  url: `https://chart.googleapis.com/chart?chst=d_bubble_icon_texts_big&chld=home|bb|FFFFFF|000000|${location.title}|${location.heading}|$${location.listing_price} p/n|Max Guests: ${location.max_guests}`,
                }}
                />
    })
  }

render(){
  const mapStyles = {
    width: '600px',
    height: '400px',
  };
  // console.log("Inside lat: ",this.props.lat);
  // console.log("Inside long: ",this.props.long);
  // console.log("Locations: ",this.props.locations);
    return (
      <div className="">
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          initialCenter={{ lat: this.props.lat, lng: this.props.long}}
        >
        {this.displayMarkers()}
        </Map>
      </div>
    ); //return
  }; //function
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAW5MNODxdAncbpnSGtOIl6Gyfjo-e6w3g'
})(MapContainerShow);
