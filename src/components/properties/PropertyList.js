import React, { useEffect, useState} from 'react';
import axios from 'axios';
import queryString from 'query-string';
import Property from './Property';
import MapPropertyList from '../geomap/MapPropertyList';
import Paginate from './Paginate';
import '../search/Search.css'

const BASE_URL = "http://localhost:3000";
const SEARCH_RESULTS_PER_PAGE = 3; //hard coded for simplicity :)

const PropertyList = (props) => {
  const search = props.location.search
  const [searchTerm] = useState(queryString.parse(search).location);
  const [startDate] = useState(queryString.parse(search).checkin);
  const [endDate] = useState(queryString.parse(search).checkout);

  const [properties,setProperties] = useState([]);
  const [filteredProperty,setFilteredProperty] = useState([]);
  const [showType, setShowType] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [priceFilter, setPriceFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  //hard coded for simplicity :)
  const priceRange = [
    {range:"-50"},
    {range:"50-70"},
    {range:"70-90"},
    {range:"90-110"},
    {range:"110-130"},
    {range:"130+"}
  ];

  useEffect( () => fetchProperties(),[searchTerm] )

  const fetchProperties = () => {
    axios.get(BASE_URL + "/properties/search/" + searchTerm)
    .then(res => {
      setProperties(res.data)
      setPageCount(Math.ceil(res.data.length / SEARCH_RESULTS_PER_PAGE ))
    })
    .catch(console.warn())
  }

  const fetchFilteredProperties = (offset) => {
    const url = BASE_URL + "/properties/search/" + searchTerm + "/"+ SEARCH_RESULTS_PER_PAGE + "/" + offset;
    axios.get(url)
    .then((res)=> {
        setFilteredProperty(res.data)
    })
    .catch(console.warn())
  }

  const toggleFilter = (filter, action) => {
    filter ? action(false) : action(true)
  }

  const filterByType = (ev) => {
    const type = ev.target.innerHTML;
     const url = BASE_URL + "/properties/searchtype/" + searchTerm + "/" + type + "/100/0";
     axios.get(url)
     .then((res)=> {
         setFilteredProperty(res.data)
         setTypeFilter(`(${type})`)
         setShowType(false)
     })
     .catch(console.warn())
  }

  const filterByPrice = (ev) => {
    const range = ev.target.innerText;
    const [lower, higher] = range.startsWith('-') ?
      [0, range.split('-')[1]] : range.includes('-') ?
      range.split('-') : [range.split('+')[0], 1000000];

    const url = BASE_URL + "/properties/searchprice/" + searchTerm + "/" + lower + "/" + higher + "/100/0";
    axios.get(url)
    .then((res)=> {
        setFilteredProperty(res.data)
        setPriceFilter(`(${lower} - ${higher})`)
        setShowPrice(false)
    })
    .catch(console.warn())
  }

  const showProperty = (ev) => {
    const id = ev.currentTarget.id
    props.history.push({
      pathname: `/property/${id}`,
      search: '?' + new URLSearchParams({
        checkin: startDate,
        checkout: endDate,
      }).toString()
    })
  }

  const fetchPropertyType = (properties) => {
    const type =
      properties.map(prop => prop.property_type)
      .filter( (el, idx, arr) => idx === arr.indexOf(el))

    return type.sort( (a, b) => {
      a = a.toUpperCase();
      b = b.toUpperCase()

      if(a > b) return -1
      if(a < b) return 1
      return 0
    })
  }

  return (
    <div className="search-result">
      <div>
        <h3>
          <strong>Accomodation in { searchTerm }</strong>
        </h3>
        <div className="search-filter">
          <div className="type-filter">
            <div className="filter-button" onClick={() => toggleFilter(showType, setShowType)}>
              Type of place {typeFilter}
              {
                typeFilter ?
                <span className="clear" onClick={() => window.location.reload(true)}>x</span> : null
              }
            </div>
            {
              showType === true ?
              <div className="filter-options">
                {
                  fetchPropertyType(properties).map((type, index)=><div key={index} onClick={filterByType}>{type}</div>)
                }
              </div> : null
            }
          </div>
          <div className="price-filter">
            <div className="filter-button" onClick={() => toggleFilter(showPrice, setShowPrice)}>
            Price {priceFilter}
            {
              priceFilter ?
              <span className="clear" onClick={() => window.location.reload(true)}>x</span> : null
            }
            </div>
            {
              showPrice === true ?
              <div className="filter-options">
                {
                  priceRange.map((data,index)=><div onClick={filterByPrice}>{data.range}</div>)
                }
              </div> : null
            }
          </div>
        </div>
        <div className="search-list">
          {
            filteredProperty.map((data, index) => <Property key={data.id} propertyData={data} searchTerm={searchTerm} showProperty={showProperty}/>)
          }
          <div className="pagination">
            {
              properties.length > 0 ?
              <Paginate length={properties.length} pageCount={pageCount} fetchFilteredProperties={fetchFilteredProperties} perPage={SEARCH_RESULTS_PER_PAGE} searchTerm={searchTerm} />
              :
              <div className="loading">
                Loading...
              </div>
            }
          </div>
        </div>
      </div>
      <div className="map-wrapper">
        <div className="search-map">
          {
            properties.length > 0 ?
            <MapPropertyList locations={properties}/>
              :
            <div className="loading">
              Loading...
            </div>
          }
        </div>
      </div>
    </div>
  ); //return
}; //function

export default PropertyList;
