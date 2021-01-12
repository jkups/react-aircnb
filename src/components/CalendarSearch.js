import React, { useState } from 'react';
import '../App.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
// import { Link, Route, HashRouter as Router } from 'react-router-dom';


const CalendarSearch = (props) => {

  const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }
    ]);

  // const selectionRange = {
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   key: 'selection',
  //   }

  const handleSelect = (item) => {
    setState([item.selection])
    props.handleSelect([item.selection])
  }

  return(
    <div>
      <DateRange
        editableDateInputs={true}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
    </div>
  ); //return


}; //CalendarSearch


export default CalendarSearch
