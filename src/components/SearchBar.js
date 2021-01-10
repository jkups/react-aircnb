import React, {state, useState, useEffect} from 'react';
import '../App.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axios from 'axios';
import { DateRange } from 'react-date-range';
import { Link, Route, HashRouter as Router } from 'react-router-dom';

// const SEARCH_BAR_URL = 'http://localhost:3001/'

const SearchBar = (props) => {



  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  const [searchText, setSearchText] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Submit!');
    // console.log(state[0].startDate);
    let url = "/search/" + searchText + "/" +  state[0].startDate + "/" + state[0].endDate;
    console.log(url);
    props.history.push(url);

  };

  const handleSearchTerm = (e) => {
    console.log(e.target.value);
    setSearchText(e.target.value);
  };

  return(
    <div>

        <input placeholder="Type your location..." onChange={handleSearchTerm}></input>

        <div className="dropdown">

          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Dates</button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div className="dropdown-menu">
            <a className="dropdown-item" href="#">
              <DateRange className="dropdown-item" editableDateInputs={true} onChange={item => setState([item.selection])} moveRangeOnFirstSelection={false} ranges={state}/> </a><a className="dropdown-item" href="#">second tag</a>

            </div>
          </div>
        </div>
        <button type="button" onClick={handleSubmit}> Search</button>

    </div>
  );
}

export default SearchBar
