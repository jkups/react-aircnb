import React, { useEffect, useState} from 'react';
// import {Route, Link, HashRouter as Router} from 'react-router-dom';
import axios from 'axios';
import { DOMAIN_PROPERTIES_API_URL, DOMAIN_PROPERTIES_PARAMS} from "../api/ApiData.js";

const ListingDisplay = (props) => {
  const [listingData,setListingData] = useState([]);
  useEffect(()=>{

    axios.get(DOMAIN_PROPERTIES_API_URL + props.propertyId, {params: DOMAIN_PROPERTIES_PARAMS})
    .then((res) => {
      console.log("List results: ", res.data);
      setListingData(res.data);
    })
  },[])
  return (
    <div>
      <div>Address: {listingData.address}</div>
      <div>Bedrooms: {listingData.bedrooms}</div>
      <div>Bathrooms: {listingData.bathrooms}</div>
    </div>
  ); //return
}; //function
export default ListingDisplay;
