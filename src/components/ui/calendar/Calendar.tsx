import * as React from 'react'
import * as dateFns from 'date-fns'
import * as ru from 'date-fns/locale/ru'
import {Fab, Grid, Typography} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack"
import ArrowForward from "@material-ui/icons/ArrowForward"

interface IProps {
  size:string
}

interface IState {
  currentDate: Date
  selectedDate: Date
}

class Calendar extends React.Component<IProps, IState> {

  public state: IState = {
    currentDate: new Date(),
    selectedDate: new Date()
  }

  private locale = ru;

  constructor(props: IProps) {
    super(props)
  }

  public nextMonth = () => {
    console.log("Next month");
  }

  public prevMonth = () => {
    console.log("Previous month");
  }


  public headerRender() {
    const currentMonth = dateFns.format(this.state.currentDate, 'MMMM', {
      locale: this.locale
    });
    return (
      <>
        <Grid container={true} item={true} xs={3} justify="flex-start">
          <Fab color="secondary" onClick={this.prevMonth}><ArrowBack/></Fab>
        </Grid>
        <Grid container={true} item={true} xs={6} justify="center">
          <Typography variant="h5">{currentMonth}</Typography>
        </Grid>
        <Grid container={true} item={true} xs={3} justify="flex-end">
          <Fab color="secondary" onClick={this.nextMonth}><ArrowForward/></Fab>
        </Grid>
      </>
    )
  }

  public render() {
    return (
      <>
        {this.headerRender()}
      </>
    );
  }
}

export default Calendar