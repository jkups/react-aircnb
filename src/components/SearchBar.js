import React, {state, useState, useEffect} from 'react';
import '../App.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import axios from 'axios';
import { DateRange } from 'react-date-range';
import { Link, Route, HashRouter as Router } from 'react-router-dom';
import CalendarSearch from './CalendarSearch';

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

  const [calendarShow, setCalendarShow] = useState(false);

  const toggleCalendar = () => {
    setCalendarShow(!calendarShow);
  }

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
        <span>
        <input placeholder="Type your location..." onChange={handleSearchTerm}></input>

        <span className="button" onClick={toggleCalendar}> Select Dates </span> </span>
          {
            calendarShow === true ?
              <span>
                <CalendarSearch />
              </span>
              :
            <span></span>
          }
          <span>


        <button type="button" onClick={handleSubmit}> Search</button></span>

    </div>
  );
}

export default SearchBar
