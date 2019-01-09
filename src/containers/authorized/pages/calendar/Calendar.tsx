import * as React from 'react'
import CalendarUI from '../../../../components/ui/calendar/Calendar'
import {Grid} from '@material-ui/core';
import * as classes from './styles.css'
class Calendar extends React.Component {

  public render() {
    return (
        <Grid container={true} className={classes.calendar}>
          <CalendarUI size="big"/>
        </Grid>
    );
  }
}

export default Calendar