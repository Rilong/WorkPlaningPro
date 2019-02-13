import * as React from 'react'
import CalendarUI from '../../../../components/ui/calendar/Calendar'
import {Grid} from '@material-ui/core';

import './styles.scss'

class Calendar extends React.Component {

  private handler(day: Date) {
    console.log(day);
  }

  public render() {
    return (
        <Grid container={true} className="calendar">
          <CalendarUI onSelect={this.handler}/>
        </Grid>
    );
  }
}

export default Calendar