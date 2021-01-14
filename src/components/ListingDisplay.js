import React, { useState} from 'react';
// import {Route, Link, HashRouter as Router} from 'react-router-dom';
// import axios from 'axios';

const ListingDisplay = (props) => {

  return (
    <div className="container border-bottom py-3" onClick={props.handleClick} id={props.propertyData.id}>
      <div className="row">
        <div className="col-6 my-2 ml-1">
          {
            <img src={props.propertyData.images[0].image_url} loading="lazy" alt={props.propertyData.images[0].name} className="rounded"/>
          }
        </div>
        <div className="col-6 my-2 pt-3 text-right">
          <div className="">entire {props.propertyData.property_type} in {props.searchTerm}</div>
          <div><strong>{props.propertyData.heading}</strong></div>
          <div className="container">
            <div className="row">
              <div className="col-2">
                <hr/>
              </div>
            </div>
          </div>
          <div>{ props.propertyData.max_guests } guests | {props.propertyData.bedrooms} beds | {props.propertyData.bathrooms} bath</div>
          <div className="d-flex justify-content-end"><p className="font-weight-bold"><strong>$ {props.propertyData.listing_price}</strong> / night</p></div>
        </div>
      </div>
    </div>
  ); //return
}; //function
export default ListingDisplay;
