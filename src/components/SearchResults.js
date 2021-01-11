import React, { useEffect, useState} from 'react';
// import {Route, Link, HashRouter as Router} from 'react-router-dom';
import axios from 'axios';
import ListingDisplay from './ListingDisplay';
import MapContainer from './MapContainer';

const LISTING_DISPLAY_API = "http://localhost:3000/properties.json";

const SearchResults = (props) => {

  const [searchData,setSearchData] = useState([]);
  const [searchTerm,setSearchTerm] = useState("Sydney");
  useEffect(()=>{
    axios.get(LISTING_DISPLAY_API)
    .then(res => {
      console.log(res.data);
      setSearchData(res.data)
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
      <h1>Communist Accomodation in { searchTerm }</h1>
      <div className="row">
        <div className="col-6">
        <div className="container">
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
        <div className="col-4"></div>
      </div>
      <div className="row">
        <div className="col-8">
          {
            searchData.map((data,index) => <ListingDisplay key={index} propertyData={data} searchTerm={searchTerm}/>)
          }
        </div>
        <div className="col-4">
          <MapContainer />
        </div>
      </div>
      pages component goes here
    </div>
  ); //return
}; //function
export default SearchResults;
