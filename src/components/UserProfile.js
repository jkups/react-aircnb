import React from 'react';
import axios from 'axios';
import '../App.css'

class UserProfile extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        comment: '',
        rating:''
      }
    }



  render(){

    return(
      <div>
        <h1> Hi Name goes here </h1>

        <div>
          <h2> About me  </h2>

        <p>
          About information goes here

        </p>

          <div>
            confirmation

          </div>


          <div>
            listings

          </div>


        </div>

      </div>


    )
  }
}

export default UserProfile
