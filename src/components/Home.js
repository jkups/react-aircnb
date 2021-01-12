import React from 'react';
// import {Route, Link, HashRouter as Router} from 'react-router-dom';
// import axios from 'axios';

const Home = (props) => {
  console.log("history: ",props.history);
  return (
    <div>
      <div className="spacer">
      Home
      </div>
      <div className="home-back">
      </div>
    </div>
  ); //return
}; //function
export default Home;
