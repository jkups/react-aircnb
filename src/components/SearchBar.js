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

        {/* <div className="dropdown">

          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Select Dates</button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <div className="dropdown-menu">
              <a className="dropdown-item" href="#">
              <DateRange className="dropdown-item" editableDateInputs={true} onChange={item => setState([item.selection])} moveRangeOnFirstSelection={false} ranges={state}/>
              </a>
              <a className="dropdown-item" href="#">second tag</a>
            </div>
          </div>
        </div>
        <button type="button" onClick={handleSubmit}> Search</button>

        <br/><br/>

        <input placeholder="Type your location..." onChange={handleSearchTerm}></input> */}

        {/* <div className="modal" tabindex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Dates</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  <DateRange  editableDateInputs={true} onChange={item => setState([item.selection])} moveRangeOnFirstSelection={false} ranges={state}/>
                </p>
              </div>
              <div className="modal-footer">

                <button type="button" className="btn btn-primary">Save changes</button>

                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <br/> */}


    </div>
  );
}

export default SearchBar
