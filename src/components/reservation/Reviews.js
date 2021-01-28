import React from 'react';

const Reviews = (props) => {

  const rating = () => {
    const stars = [];
    for(let i = 0; i < props.review.rating; i++){
      stars.push(<span className="star-rating"> &#9733; </span>)
    }
    return stars;
  }

  return(
    <div>
      { rating() }
      <p>{props.review.comment}</p>
    </div>
  )
}

export default Reviews
