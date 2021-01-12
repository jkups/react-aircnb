import React from 'react';
import { Link } from 'react-router-dom';
// import axios from 'axios';
// import Terms from './Terms'
import '../App.css'



class Footer extends React.Component {
  render(){
    return(
      <footer className="Footer container-fluid">

          <div className="Fleft">
            &copy; 2021 AirCnB |

            <Link to="/About" > About us </Link> |
            <Link to="/Terms" > Terms &amp; Conditions</Link> |
            <Link to="/Contact" > Contact us</Link> | <a href='http://localhost:3000/' target="_blank" rel="noreferrer">Admin</a> |

          </div>





        <div className="Fright">
          English | $AUD
        </div>
      </footer>
    );
  }
}

export default Footer;
