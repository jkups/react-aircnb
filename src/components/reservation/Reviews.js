import React from 'react';
import axios from 'axios';

const REVIEW_API = "http://localhost:3000/properties/";

class Reviews extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        reviews: [],
      }
    }

    componentDidMount(){
      const url = REVIEW_API + this.props + ".json";
      axios.get(url)
      .then((response)=>{
        console.log(response);
        })
      .catch(console.warn)
      }


  render(){


    return(
      <div>

          <li> Review 1</li>


      </div>
    )
  }
}

export default Reviews
