import React, { useState } from 'react';
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
  const [startDate, setStartDate] = useState('Select date');
  const [endDate, setEndDate] = useState('Select date');

  const [calendarShow, setCalendarShow] = useState(false);

  const toggleCalendar = () => {
    setCalendarShow(true);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Submit!');
    // console.log(state[0].startDate);
    props.history.push(`/search/${searchText}/${startDate}/${endDate}`)
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
    <div>
        <div className="search-wrapper">
          <div className="search-item">
            <div>Location</div>
            <input
              placeholder="Enter a location..."
              onChange={handleSearchTerm}>
            </input>
          </div>

          <div className="search-item dates" onClick={toggleCalendar}>
            <div>Check in</div>
            <div>
              {
                Object.prototype.toString.call(startDate) === "[object Date]" ?
                startDate.toLocaleDateString() :
                startDate
              }
            </div>
          </div>

          <div className="search-item dates" onClick={toggleCalendar}>
            <div>Check out</div>
            <div>
              {
                Object.prototype.toString.call(endDate) === "[object Date]" ?
                endDate.toLocaleDateString() :
                endDate
              }
            </div>
          </div>

          <div>
            <button className="search-button" onClick={handleSubmit}>
              &#x1F50D;
            </button>
          </div>
        </div>
        {
          calendarShow === true ?
            <div className="search-calendar">
              <CalendarSearch state={state} handleSelect = {handleSelect} />
            </div>
            : null
        }
    </div>
  );
}

export default SearchBar
