import React, { useEffect, useState} from 'react';
// import {Route, Link, HashRouter as Router} from 'react-router-dom';
// import axios from 'axios';

const Func = (props) => {
  // console.log("The data:", props.data);
  const handleClick = (ev) => {
    props.sendPropertyType(ev.target.innerHTML)
    // consoev.target.innerHTMLle.log("Target:", ev.target.innerHTML);
  }

  return (
    <div className="list-group-item" onClick={handleClick}>
        {
          props.data.property_type
        }
    </div>
  ); //return
}; //function
export default Func;
