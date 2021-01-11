import React, {state, useState, useEffect} from 'react';
import '../App.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';
import { Link, Route, HashRouter as Router } from 'react-router-dom';


const CalendarSearch = (props) => {

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection',
    },
  ]);

  const dateChange = (selection) => {
    setState({selection});
  }

  console.log();

  return(
    <span>
      <DateRange editableDateInputs={true} onChange={item => dateChange([item.selection])}
      moveRangeOnFirstSelection={false} ranges={state} />
    </span>
  ); //return


}; //CalendarSearch


export default CalendarSearch
