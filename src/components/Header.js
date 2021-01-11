import React from 'react';
// import {Route, Link, HashRouter as Router} from 'react-router-dom';
// import axios from 'axios';

import '../App.css'


class Header extends React.Component {
  render(){
    return(
      <div className="Header">
        <a href="https://www.google.com/search?q=covid+safe" target="_blank">Learn more about COVID-19 safe measurements</a>

      </div>
    );
  }
}

export default Header;
