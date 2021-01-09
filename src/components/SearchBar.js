import React from 'react';
import '../App.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Calendar } from 'react-date-range';


class SearchBar extends React.Component {

  state = {
    fromDate: [],
    toDate: [],
  }

  handleDate(date){
    console.log(date);
  }

  render(){

    return (
      <div>
        <form onSubmit="">
          <input placeholder="Type your location..."></input>
          <Calendar ClassName=""
                date={new Date()}
                onChange={this.handleDate}
              />
          <Calendar ClassName=""
                date={new Date()}
                onChange={this.handleDate}
              />
              <button>Submit</button>
            </form>
      </div>
    )
  }
}


export default SearchBar;
