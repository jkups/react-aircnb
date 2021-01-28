import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class MapProperty extends React.Component {

render(){
  const mapStyles = {
    width: '100%',
    height: '100%',
  };

    return (
      <div className="Top">
        <Map
          google={this.props.google}
          zoom={11}
          style={mapStyles}
          initialCenter={this.props.coordinates[0]}
        >
        <Marker
          key="1"
          id="1"
          position={this.props.coordinates[0]}
          icon={{
            url: `https://chart.googleapis.com/chart?chst=d_fnote_title&chld=balloon|1|000000|h|$${this.props.locations.listing_price}|Max Guests: ${this.props.locations.max_guests}|Book Now!`
          }}
          />
        </Map>
      </div>
    ); //return
  }; //function
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyAW5MNODxdAncbpnSGtOIl6Gyfjo-e6w3g'
})(MapProperty);
