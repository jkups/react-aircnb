import React, { useEffect, useState} from 'react';
// import {Route, Link, HashRouter as Router} from 'react-router-dom';
import axios from 'axios';
import ListingDisplay from './ListingDisplay';
import { DOMAIN_SUGGEST_API_URL, DOMAIN_SUGGEST_PARAMS} from "../api/ApiData.js";


const SearchResults = (props) => {
  const [searchData,setSearchData] = useState([]);
  useEffect(()=>{
    const params = Object.assign(DOMAIN_SUGGEST_PARAMS,{terms: "100+Harris+St+Pyrmont"})
    axios.get(DOMAIN_SUGGEST_API_URL, {params: params})
    .then((res) => {
      console.log("results: ", res.data);
      setSearchData(res.data);
    })
  },[])
  return (
    <div className="container">
      {
        searchData.map((data,index) => <ListingDisplay key={index} propertyId={data.id}/>)
      }
    </div>
  ); //return
}; //function
export default SearchResults;
