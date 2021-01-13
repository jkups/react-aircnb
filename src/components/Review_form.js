import React from 'react';
import axios from 'axios';
import '../App.css'

class Review_form extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        booking:'',
        review: '',
        rating:''
      }
    }

    handleSubmit(event){
      event.preventDefault();
        axios({
        method: "POST",
        url:"http://localhost:3000/reviews/post",
        data:  this.state
      }).then((response)=>{
        console.log(response.data.sent);
        this.setState({response:response.data.sent})

      })
      .catch(console.warn)
    } //handleSubmit


    onBookingChange(event) {
      this.setState({booking: event.target.value})
    }

    onRatingChange(event) {
      this.setState({rating: event.target.value})
    }

    onReviewChange(event) {
      this.setState({review: event.target.value})
    }


  render(){

    return(
      <div>

      <form id="submit-review" onSubmit={this.handleSubmit.bind(this)} method="POST">
       <div className="form-group">
         <label htmlFor="booking_code">Booking Code</label>
         <input type="text" className="form-control" value={this.state.booking} onChange={this.onBookingChange.bind(this)} />
       </div>
       <br />
       <div className="form-group">
         <label htmlFor="rating">Rating (0-5)</label>
         <input type="number" id="quantity" name="quantity" min="1" max="5" className="form-control"  value={this.state.rating} onChange={this.onRatingChange.bind(this)} />
       </div>
       <br />
         <div className="form-group">
           <label htmlFor="review">Review </label>
           <textarea className="form-control" rows="5" value={this.state.review} onChange={this.onReviewChange.bind(this)} />
         </div>

       <br />
       <button type="submit" className="btn btn-primary">Submit</button>
     </form>



      </div>
    )
  }
}

export default Review_form
