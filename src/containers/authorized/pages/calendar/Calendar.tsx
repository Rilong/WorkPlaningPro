import * as React from 'react'
import CalendarUI from '../../../../components/ui/calendar/Calendar'
import {Grid, withStyles} from '@material-ui/core';
import {IStyles, styles} from './styles';

interface IProps {
  classes?: IStyles
}

class Calendar extends React.Component<IProps> {

  private handler(day: Date) {
    console.log(day);
  }

  public render() {
    return (
        <Grid container={true} className={this.props.classes.calendar}>
          <CalendarUI size="big" onSelect={this.handler}/>
        </Grid>
    );
  }
}

export default withStyles(styles)(Calendar)