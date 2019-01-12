import * as React from 'react'
import CalendarUI from '../../../../components/ui/calendar/Calendar'
import {Grid, withStyles} from '@material-ui/core';
import {IStyles, styles} from './styles';

interface IProps {
  classes?: IStyles
}

class Calendar extends React.Component<IProps> {

  public render() {
    return (
        <Grid container={true} className={this.props.classes.calendar}>
          <CalendarUI size="big"/>
        </Grid>
    );
  }
}

export default withStyles(styles)(Calendar)