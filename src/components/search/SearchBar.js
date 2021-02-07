import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import Calendar from './Calendar';

const SearchBar = (props) => {

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchAttempt, setSearchAttempt] = useState(false);
  const [startDate, setStartDate] = useState('Select date');
  const [endDate, setEndDate] = useState('Select date');
  const [calendarShow, setCalendarShow] = useState(false);
  const [count] = useState(0);

  const toggleCalendar = value => {
    setCalendarShow(value);
    if(!value && props.showSearch) props.toggleSearch()
  }

  const clearCalendar = () => {
    const state = {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }

    setState([state]);
    setStartDate('Select date');
    setEndDate('Select date');
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if(searchTerm && startDate !== 'Select date'){
      setCalendarShow(false);
      if(props.showSearch) props.toggleSearch()

      props.history.push({
        pathname: '/search',
        search: '?' + new URLSearchParams({
          location: searchTerm,
          checkin: startDate.toLocaleDateString('en-GB').split('/').join('-'),
          checkout: endDate.toLocaleDateString('en-GB').split('/').join('-')
        }).toString()
      });
    } else {
      setSearchAttempt(true)
    }
  };

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (selection) => {
    setState([selection]);
    setStartDate(selection.startDate);
    setEndDate(selection.endDate);
  }

  useEffect( () => {
    if(props.showSearch){
      const search = props.location.search
      let startDate = (queryString.parse(search).checkin).split('-')
      let endDate = (queryString.parse(search).checkout).split('-')

      startDate = new Date(startDate[2],startDate[1]-1,startDate[0])
      endDate = new Date(endDate[2],endDate[1]-1,endDate[0])

      const state = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
      }

      setCalendarShow(true)
      setSearchTerm(queryString.parse(search).location);
      setStartDate(startDate);
      setEndDate(endDate);
      setState([state])
    }
  }, [count])

  return(
    <div>
        <div className="search-wrapper">
          <div className="search-item">
            <div className="offset">Location</div>
            <input
              className={
                searchTerm ? 'offset' : searchAttempt ? 'offset highlight' : 'offset'
              }
              placeholder="Enter a location..."
              value={searchTerm}
              onChange={handleSearchTerm}>
            </input>
          </div>

          <div className="search-item dates" onClick={() => toggleCalendar(true)}>
            <div className="offset">Check in</div>
            <div className="offset">
              {
                Object.prototype.toString.call(startDate) === "[object Date]" ?
                startDate.toLocaleDateString('en-GB') :
                startDate
              }
            </div>
          </div>

          <div className="search-item dates" onClick={() => toggleCalendar(true)}>
            <div className="offset">Check out</div>
            <div className="offset">
              {
                Object.prototype.toString.call(endDate) === "[object Date]" ?
                endDate.toLocaleDateString('en-GB') :
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
              <Calendar state={state} handleSelect = {handleSelect} />
              <div className="calendar action">
                <span className="button" onClick={ clearCalendar }>
                  Clear dates
                </span>
                <span className="button" onClick={ () => toggleCalendar(false) }>
                  Close
                </span>
              </div>
            </div>
            : null
        }
    </div>
  );
}

export default SearchBar
