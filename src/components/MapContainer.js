import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class MapContainer extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          lat: this.props.lat, //-33.8688197,
          long: this.props.long //151.2092955,
      };
  };

  // componentDidMount(){
  //   this.setState({
  //     lat: this.props.lat,
  //     long: this.props.long
  //   });
    // console.log("search lat:",this.props.lat);
  // }

  displayMarkers = () => {
  return this.props.locations.map((location, index) => {
      return <Marker key={index} id={index} position={{
        lat: location.latitude,
        lng: location.longitude
      }}
   onClick={() => console.log("You clicked me!")} title={"$100"}/>
    })
  }

render(){
  const mapStyles = {
    width: '300px',
    height: '550px',
  };
  console.log("State lat: ",this.state.lat);
  console.log("Prop lat: ",this.props.lat);
  // console.log("Inside long: ",this.props.long);
  // console.log("Locations: ",this.props.locations);
    return (
      <div className="position-fixed">
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
})(MapContainer);
