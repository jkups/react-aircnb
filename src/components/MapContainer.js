import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class MapContainer extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          lat: this.props.lat, //-33.8688197,
          long: this.props.long, //151.2092955,
          bounds: null,
      };
  };

  componentDidUpdate(prevProps) {
    if(prevProps.locations !== this.props.locations){
      const bounds = new this.props.google.maps.LatLngBounds();
        // for (let i = 0; i < points.length; i++) {
        this.props.locations.forEach((item, i) => {
          bounds.extend({lat:item.latitude,lng:item.longitude});
        });
        this.setState({bounds});
    }
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
              name={"location.name"}
              icon={{
                url: `https://chart.googleapis.com/chart?chst=d_bubble_text_small&chld=bb|$ ${location.listing_price} / ${location.max_guests} Guests|FFFFFF|000000`,
              }}
              />
    })
  }



render(){
  const mapStyles = {
    width: '300px',
    height: '550px',
  };
  console.log("State lat map: ",this.state.lat);
  console.log("Prop lat map: ",this.props.lat);
  // console.log("Inside long: ",this.props.long);
  // console.log("Locations: ",this.props.locations);
  const points = this.props.locations;
  console.log("google: ", this.props.google);

  // const bounds = new this.props.goolge.maps.LatLngBounds();
  // for(let i = 0; i < points.length; i++){
  //   bounds.extend(points[i])
  // }

    return (
      <div className="position-fixed">
        <Map
          google={this.props.google}
          zoom={10}
          style={mapStyles}
          initialCenter={{ lat: this.props.locations[0].latitude, lng: this.props.locations[0].longitude}}
          bounds={this.state.bounds}
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
