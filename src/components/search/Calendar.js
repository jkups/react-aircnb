import React from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';

const Calendar = (props) => {

  return(
    <div>
      <DateRange
        months={2}
        direction="horizontal"
        showDateDisplay={false}
        onChange={(item) => props.handleSelect(item.selection)}
        minDate={new Date()}
        ranges={props.state}
      />

    </div>
  ); //return
}; //Calendar

export default Calendar
