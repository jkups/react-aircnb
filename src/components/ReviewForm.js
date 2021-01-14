import React from 'react';
import axios from 'axios';
import '../App.css'

class ReviewForm extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        comment: '',
        rating:'',
        review:{}
      }
    }

    componentDidMount(){
      this.props.data[0].reviews.forEach((item)=>{
        if (item.reservation_id === this.props.reservationid){
          this.setState({review:item})
        }
      })
    }

    handleSubmit(event){
      event.preventDefault();
      axios.post(`http://localhost:3000/reviews.json`,
      { review: this.state },
      { withCredentials: true }
      )
      .then((response)=>{
        // console.log(response.data);
        this.setState({response:response.data})
      })
      .catch(console.warn)
    } //handleSubmit


    onRatingChange(event) {
      this.setState({rating: event.target.value})
    }

    onCommentChange(event) {
      this.setState({comment: event.target.value})
    }


  render(){
    console.log("data is",this.state.review);
    return(
      <div>

      <form id="submit-review" onSubmit={this.handleSubmit.bind(this)} method="POST">
       <div className="form-group">
         <label htmlFor="rating">Rating (0-5)</label>
         <input type="number" id="quantity" name="quantity" min="1" max="5" className="form-control"  value={this.state.rating} onChange={this.onRatingChange.bind(this)} />
       </div>
       <br />
         <div className="form-group">
           <label htmlFor="review">Comment </label>
           <textarea className="form-control" rows="5" value={this.state.comment} onChange={this.onCommentChange.bind(this)} />
         </div>

       <br />
       <button type="submit" className="btn btn-primary">Submit</button>
     </form>



      </div>
    )
  }
}

export default ReviewForm
