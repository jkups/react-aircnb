import React, { useEffect, useState} from 'react';
import axios from 'axios';
import ListingDisplay from './ListingDisplay';
import MapContainer from './MapContainer';
import Paginate from './Paginate';
import SearchBar from './SearchBar';
import PropertyTypes from './PropertyTypes';



// const GOOGLE_GEOCODE_API = "https://maps.googleapis.com/maps/api/geocode/json?";
const BASE_URL = "http://localhost:3000";
const SEARCH_RESULTS_PER_PAGE = 3;

const SearchResults = (props) => {

  const searchTerm = props.match.params.searchText;
  const [startDate] = useState(props.match.params.startDate);
  const [endDate] = useState(props.match.params.endDate);
  const [locations,setLocations] = useState([]);
  const [listData,setListData] = useState([]);
  const [showType, setShowType] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  // const params = (searchTerm) => {
  //   let paramsObj = {
  //     key: "AIzaSyAW5MNODxdAncbpnSGtOIl6Gyfjo-e6w3g",
  //     address: searchTerm
  //   }
  //   return paramsObj;
  // }

  useEffect(()=>{
    axios.get(BASE_URL + "/properties/search/" + searchTerm)
    .then(res => {
      setLocations(res.data)
      setPageCount(Math.ceil(res.data.length / SEARCH_RESULTS_PER_PAGE ))
    })
    .catch(console.warn())

     // loadPageData(3,0);
  },[searchTerm])

  const loadPageData = (offset) => {
    // console.log({itemsPerPage,offset});
    const url = BASE_URL + "/properties/search/" + searchTerm + "/"+ SEARCH_RESULTS_PER_PAGE + "/" + offset;
    axios.get(url)
    .then((res)=> {
        setListData(res.data)
    })
    .catch(console.warn())
  }

  const handleClick = (ev) => {
    // console.log("card clicked!",ev.currentTarget.id);
    props.history.push(`/property/${ev.currentTarget.id}/${startDate}/${endDate}`)
  }
   // console.log("search lat res:", searchLat);

  const listDataRet = (data) => {
    setListData(data);
  }

  const toggleType = () => {
    if(showType === false){
      setShowType(true)
    }else if(showType === true){
      setShowType(false)
    }
  }
  const togglePrice = () => {
    if(showPrice === false){
      setShowPrice(true)
    }else if(showPrice === true){
      setShowPrice(false)
    }
  }
  const getPropertyType = (propertyType) => {
    console.log("hello", propertyType);
     const url = BASE_URL + "/properties/searchtype/" + searchTerm + "/" + propertyType + "/100/0";
     axios.get(url)
     .then((res)=> {
         setListData(res.data)
         setShowType(false)
     })
     .catch(console.warn())
  }

  return (
    <div className="container">

          <SearchBar {...props}/>

      <div className="row">
        <div className="col-9">
          <div className="container text-nowrap">
          <h1>Accomodation in { searchTerm }</h1>
          <div className="row">
            <div className="col-3">
              <div className="dropdown">
                <button className="btn btn-outline-secondary dropdown-toggle" type="button" onClick={toggleType}>
                  Type of place
                </button>
                <div className="list-group">
                {
                  showType === true ? locations.map((data,index)=><PropertyTypes key={index} data={data} sendPropertyType={getPropertyType}/>) : null
                }
              </div>
              </div>
            </div>
            <div className="col-3">
              <button className="btn btn-outline-secondary dropdown-toggle"  onClick={togglePrice}>Price</button>
              {
                showPrice === true ? <div>Hello</div> : null
              }
            </div>
            <div className="col-6">
              {
                locations.length > 0 ?
                <Paginate length={locations.length} pageCount={pageCount} loadPageData={loadPageData} perPage={SEARCH_RESULTS_PER_PAGE} searchTerm={searchTerm} />
                 :
                <p>Loading....</p>
              }
            </div>
          </div>
          </div>
        </div>
        <div className="col-3" id="">
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
        <div className="col-8 click">
          {
            listData.map((data, index) => <ListingDisplay key={data.id} propertyData={data} searchTerm={searchTerm} handleClick={handleClick}/>)
          }
        <div className="spacer">
        </div>
        </div>
        <div className="col-4">
        </div>
      </div>
    </div>

  </div>
  ); //return
}; //function
export default SearchResults;
