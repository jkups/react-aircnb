import React from 'react';
import SearchBar from './SearchBar'
import './Search.css'
// import {Route, Link, HashRouter as Router} from 'react-router-dom';
// import axios from 'axios';

const Home = (props) => {
  console.log("history: ",props.history);
  return (
    <div className="hero">
      <div className="hero-search">
        <SearchBar {...props}/>
      </div>
      <div className="container hero-heading">
        <h1>Go</h1>
        <h1>Near</h1>
        <span>Explore nearby stays</span>
      </div>
    </div>
  ); //return
}; //function
export default Home;


// <div className="spacer">
//   Home
// </div>
// <div className="home-back">
// </div>
