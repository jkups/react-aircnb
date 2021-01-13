import React, { useEffect, useState} from 'react';
// import {Route, Link, HashRouter as Router} from 'react-router-dom';
import axios from 'axios';
import ListingDisplay from './ListingDisplay';
import MapContainer from './MapContainer';
import Pagination from './Pagination';


const GOOGLE_GEOCODE_API = "https://maps.googleapis.com/maps/api/geocode/json?";
const SEARCH_RESULTS_RAILS = "http://localhost:3000/properties/search/";

const SearchResults = (props) => {

  const searchTerm = props.match.params.searchText;

  // const [searchData,setSearchData] = useState([]);
  // const [searchTerm, setSearchTerm] = useState(props.match.params.searchText);
  const [startDate] = useState(props.match.params.startDate);
  const [endDate] = useState(props.match.params.endDate);
  // const [searchLat,setSearchLat] = useState();
  // const [searchLong,setSearchLong] = useState();
  const [locations,setLocations] = useState([]);
  // console.log({locations});

  // console.log("---------------");
  // console.log("SearchText: ", searchTerm, props.match.params.searchText);


  const params = (searchTerm) => {
    let paramsObj = {
      key: "AIzaSyAW5MNODxdAncbpnSGtOIl6Gyfjo-e6w3g",
      address: searchTerm
    }
    return paramsObj;
  }



  useEffect(()=>{

    // axios.get(GOOGLE_GEOCODE_API,{params: params(searchTerm)})
    // .then(res => {
    //   // console.log(res.data);
    //   setSearchLat(res.data.results[0].geometry.location.lat);
    //   setSearchLong(res.data.results[0].geometry.location.lng);
    //   // console.log("search lat:", res.data.results[0].geometry.location.lat);
    // })
    // .catch(console.warn())

    axios.get(SEARCH_RESULTS_RAILS + "/" + searchTerm)
    .then(res => {
      // console.log("**Search Results:**", res.data);
      // setSearchData(res.data)
      setLocations(res.data)
    })
    .catch(console.warn())

  },[searchTerm])

  // useEffect(()=>{
  //
  //   // setSearchTerm(props.match.params.searchText);
  // },[props.match.params.searchText])


  const handleClick = (ev) => {
    // console.log("card clicked!",ev.currentTarget.id);
    props.history.push(`/property/${ev.currentTarget.id}/${startDate}/${endDate}`)
  }
   // console.log("search lat res:", searchLat);
  return (
    <div className="container">
      <div className="spacer">
      </div>
      <div className="row">
        <div className="col-6">
          <div className="container text-nowrap">
          <h1>Communist Accomodation in { searchTerm }</h1>
          <Pagination resultCount={["insert","state","here","d","e","f","g"]} currentPageNumber={"currentPage"}/>
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
        <div className="col-3">
        {
          locations.length > 0 ?
          <MapContainer locations={locations}/>
            :
          <p>Loading...</p>
        }
      </div>
      </div>
      <div className="row">
        <div className="col-8">
          {
            locations.map((data,index) => <ListingDisplay key={index} propertyData={data} searchTerm={searchTerm} handleClick={handleClick}/>)
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
