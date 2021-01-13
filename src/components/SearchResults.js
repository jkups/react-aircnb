import React, { useEffect, useState} from 'react';
import axios from 'axios';
import ListingDisplay from './ListingDisplay';
import MapContainer from './MapContainer';
import Paginate from './Paginate';
import SearchBar from './SearchBar';


// const GOOGLE_GEOCODE_API = "https://maps.googleapis.com/maps/api/geocode/json?";
const SEARCH_RESULTS_RAILS = "http://localhost:3000/properties/search/";

const SearchResults = (props) => {

  const searchTerm = props.match.params.searchText;
  const [startDate] = useState(props.match.params.startDate);
  const [endDate] = useState(props.match.params.endDate);
  const [locations,setLocations] = useState([]);
  const [listData,setListData] = useState([]);

  // const params = (searchTerm) => {
  //   let paramsObj = {
  //     key: "AIzaSyAW5MNODxdAncbpnSGtOIl6Gyfjo-e6w3g",
  //     address: searchTerm
  //   }
  //   return paramsObj;
  // }

  useEffect(()=>{
    axios.get(SEARCH_RESULTS_RAILS + "/" + searchTerm)
    .then(res => {
      setLocations(res.data)
    })
    .catch(console.warn())

  },[searchTerm])

  const handleClick = (ev) => {
    // console.log("card clicked!",ev.currentTarget.id);
    props.history.push(`/property/${ev.currentTarget.id}/${startDate}/${endDate}`)
  }
   // console.log("search lat res:", searchLat);

  const listDataRet = (data) => {
    setListData(data);
  }
  console.log("res data:", listData);
  return (
    <div className="container">

          <SearchBar {...props}/>

      <div className="row">
        <div className="col-6">
          <div className="container text-nowrap">
          <h1>Accomodation in { searchTerm }</h1>
            <div className="row">
              <div className="col-5">
                <button className="btn btn-outline-secondary text-nowrap btn-sm">Cancellation flexability</button>
              </div>
              <div className="col-4 text-center">
                <button className="btn btn-outline-secondary text-nowrap btn-sm">Type of place</button>
              </div>
              <div className="col-3">
                <button className="btn btn-outline-secondary text-nowrap btn-sm">Price</button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-3" id="">
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
      <div className="container mt-2">
        <div className="row">
          <div className="col-6">
            {
              searchTerm !== '' ?
              <Paginate searchTerm={searchTerm} perPage={3} author={'AirBnC'} listData={listDataRet}/>
                :
              <p>Loading....</p>
            }
          </div>
          <div className="col-6">
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-8 click">
          {
            locations.length > 0 ?
            listData.map((data, index) => <ListingDisplay key={index} propertyData={data} searchTerm={searchTerm} handleClick={handleClick}/>)
              :
            <p>Loading...</p>
          }
        </div>
        <div className="col-4">
        </div>
      </div>
    </div>
  ); //return
}; //function
export default SearchResults;

          // <Pagination resultCount={["insert","state","here","d","e","f","g"]} currentPageNumber={"currentPage"}/>
