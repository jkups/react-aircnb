import React, { useState } from 'react';
import CalendarSearch from './CalendarSearch';

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
    let url = "/search/" + searchText + "/" +  startDate + "/" + endDate;
    props.history.push(url);
    setCalendarShow(false);
  };

  const handleSearchTerm = (e) => {
    setSearchText(e.target.value);
  };

  const handleSelect = (item) => {
    setStartDate(item[0].startDate);
    setEndDate(item[0].endDate);
  }

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