import React, { useState } from 'react';
import '../App.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
// import axios from 'axios';
// import { DateRange } from 'react-date-range';
// import { HashRouter as Router } from 'react-router-dom';
import CalendarSearch from './CalendarSearch';

// const SEARCH_BAR_URL = 'http://localhost:3001/'

const SearchBar = (props) => {

  const [state] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  const [searchText, setSearchText] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [calendarShow, setCalendarShow] = useState(false);

  const toggleCalendar = () => {
    setCalendarShow(!calendarShow);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Submit!');
    // console.log(state[0].startDate);
    let url = "/search/" + searchText + "/" +  startDate + "/" + endDate;
    console.log(url);
    props.history.push(url);
    setCalendarShow(false);
  };

  const handleSearchTerm = (e) => {
    // console.log(e.target.value);
    setSearchText(e.target.value);
  };

  const handleSelect = (item) => {
    // console.log("Item:",item[0].startDate,item[0].endDate);
    setStartDate(item[0].startDate);
    setEndDate(item[0].endDate);
  }

  // console.log("history:", props.history);
  return(
    <div className="position-absolute">
        <span>
        <input placeholder="Type your location..." onChange={handleSearchTerm}></input>

        <span className="button" onClick={toggleCalendar}> Select Dates </span><span><button type="button" onClick={handleSubmit}> Search</button></span></span>
          {
            calendarShow === true ?
              <span>
                <CalendarSearch state={state} handleSelect = {handleSelect} />
              </span>
              :
            <span></span>
          }


    </div>
  );
}

export default SearchBar
