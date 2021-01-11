import React, { useEffect, useState} from 'react';
// import {Route, Link, HashRouter as Router} from 'react-router-dom';
import axios from 'axios';
import ListingDisplay from './ListingDisplay';
import MapContainer from './MapContainer';

const LISTING_DISPLAY_API = "http://localhost:3000/properties.json";
const GOOGLE_GEOCODE_API = "https://maps.googleapis.com/maps/api/geocode/json?"
const GOOGLE_KEY = "AIzaSyAW5MNODxdAncbpnSGtOIl6Gyfjo-e6w3g"

const SearchResults = (props) => {

  const [searchData,setSearchData] = useState([]);
  const [searchTerm,setSearchTerm] = useState(props.match.params.searchText);
  const [startDate,setStartDate] = useState(props.match.params.startDate);
  const [endDate,setEndDate] = useState(props.match.params.endDate);
  const [searchLat,setSearchLat] = useState();
  const [searchLong,setSearchLong] = useState();
  const [locations,setLocations] = useState([]);

  const params = (searchTerm) => {
    let paramsObj = {
      key: "AIzaSyAW5MNODxdAncbpnSGtOIl6Gyfjo-e6w3g",
      address: searchTerm
    }
    return paramsObj;
  }

  useEffect(()=>{
    axios.get(LISTING_DISPLAY_API)
    .then(res => {
      console.log(res.data);
      setSearchData(res.data)
      res.data.forEach(res=>{
        setLocations(locations=>[...locations, {latitude: res.latitude,longitude: res.longitude }])
      })
    })
    .catch(console.warn())
  },[])

  useEffect(()=>{
    axios.get(GOOGLE_GEOCODE_API,{params: params(searchTerm)})
    .then(res => {
      console.log(res.data);
      setSearchLat(res.data.results[0].geometry.location.lat);
      setSearchLong(res.data.results[0].geometry.location.lng);

    })
    .catch(console.warn())
  },[])
  // console.log(searchData);

  const mapStyles={
    width: '100%',
    height: '100%'
  };

  return (
    <div className="container">
      <div className="spacer">
      </div>
      <div className="row">
        <div className="col-6">
          <div className="container text-nowrap">
          <h1>Communist Accomodation in { searchTerm }</h1>
            <div className="row">
              <div className="col-5">
                <button className="btn btn-outline-secondary text-nowrap">Cancellation flexability</button>
              </div>
              <div className="col-4 text-center">
                <button className="btn btn-outline-secondary text-nowrap">Type of place</button>
              </div>
              <div className="col-3">
                <button className="btn btn-outline-secondary text-nowrap">Price</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3">
        </div>
        <div className="col-3"><MapContainer lat={searchLat} long={searchLong} locations={locations}/></div>
      </div>
      <div className="row">
        <div className="col-8">
          {
            searchData.map((data,index) => <ListingDisplay key={index} propertyData={data} searchTerm={searchTerm}/>)
          }
        </div>
        <div className="col-4">
        </div>
      </div>
      pages component goes here
    </div>
  ); //return
}; //function
export default SearchResults;
