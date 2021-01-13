import React from 'react';
import axios from 'axios';

const REVIEW_API = "http://localhost:3000/";

class Reviews extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        reviews: [],

      }
    }

    componentDidMount(){
      const url = REVIEW_API + '/properties/'+ this.props.propertydata.id + ".json";
      axios.get(url)
      .then((res)=>{
        console.log('response',res.data);
        })
      .catch(console.warn)
      }


  render(){
    console.log("property", this.props.propertydata.id);

    return(
      <div>

          <li> Review 1</li>


      </div>
    )
  }
}

export default Reviews
