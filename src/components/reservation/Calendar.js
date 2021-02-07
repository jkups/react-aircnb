import React from 'react'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';

class Calendar extends React.Component {

  render(){
    return(
      <div>
        <DateRange
          ranges={[this.props.selectionRange]}
          months={2}
          direction="horizontal"
          showDateDisplay={false}
          minDate={new Date()}
          disabledDates={this.props.reservedDates}
          onChange={(ranges) => this.props.handleSelect(ranges)}
        />
      </div>
    )
  }
}

export default Calendar
