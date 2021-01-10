import React from 'react';
// import {Route, Link, HashRouter as Router} from 'react-router-dom';
// import axios from 'axios';

import '../App.css'


// class Terms extends React.Component {
  const Contact = (props) => {
  // render(){
  // console.log(props.history);
    return(
      <div className="Terms">
        <h2> Contact Us </h2>
        <br />
        <p>
          G'day!
        <br />
        <br />
        </p>

        <p>
          If you have any queries about a property please send us an email to:
        </p>
        <p>
          <strong>properties@AirCnB.com </strong>

        </p>
        <br />
        <p>
          If you have any queries about a booking please send us an email to:

        </p>

        <p>
          <strong>bookings@AirCnB.com </strong>

        </p>
        <br />
        <p>
          If you would like to give us any feedback please send us an email to:

        </p>

        <p>
          <strong>feedback@AirCnB.com </strong>

        </p>

        <br />
        <p>

          Or if you would like to contact us by phone:

        </p>

        <p>
          <strong>1800 000 999 </strong>

        </p>





      </div>
    );

}

export default Contact;
