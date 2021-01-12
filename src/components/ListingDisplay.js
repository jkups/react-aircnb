import React, { useState} from 'react';
// import {Route, Link, HashRouter as Router} from 'react-router-dom';
// import axios from 'axios';

const ListingDisplay = (props) => {
  const [listingData] = useState(props.propertyData);
  // console.log("listingData: ", listingData.id);


  return (
    <div className="container border-bottom py-3" onClick={props.handleClick} id={listingData.id}>
      <div className="row">
        <div className="col-6 my-2 ml-1">
          {
            <img src={listingData.images[0].image_url} loading="lazy" alt={listingData.images[0].name} className="rounded"/>
          }
        </div>
        <div className="col-6 my-2 pt-3 text-right">
          <div className="">entire {listingData.property_type} in {props.searchTerm}</div>
          <div><strong>{listingData.heading}</strong></div>
          <div className="container">
            <div className="row">
              <div className="col-2">
                <hr/>
              </div>
            </div>
          </div>
          <div>{ listingData.max_guests } guests | {listingData.bedrooms} beds | {listingData.bathrooms} bath</div>
          <div className="d-flex justify-content-end"><p className="font-weight-bold"><strong>$ {listingData.listing_price}</strong> / night</p></div>
        </div>
      </div>
    </div>
  ); //return
}; //function
export default ListingDisplay;
