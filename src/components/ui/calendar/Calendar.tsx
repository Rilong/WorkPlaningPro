import * as classes from './styles.css'

import * as React from 'react'
import * as dateFns from 'date-fns'
import * as locale from 'date-fns/locale/ru'
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

  constructor(props: IProps) {
    super(props)
  }

  private nextMonthHandler = () => {
    this.setState({currentDate: dateFns.addMonths(this.state.currentDate, 1)})
  }

  private prevMonthHandler = () => {
    this.setState({currentDate: dateFns.subMonths(this.state.currentDate, 1)})
  }

  private headerRender() {
    const currentMonth = dateFns.format(this.state.currentDate, 'MMMM', { locale });
    return (
      <>
        <Grid container={true} item={true} xs={3} justify="flex-start">
          <Fab color="secondary" onClick={this.prevMonthHandler}><ArrowBack/></Fab>
        </Grid>
        <Grid container={true} item={true} xs={6} justify="center">
          <Typography variant="h5" classes={{root: classes.capitalize}}>{currentMonth}</Typography>
        </Grid>
        <Grid container={true} item={true} xs={3} justify="flex-end">
          <Fab color="secondary" onClick={this.nextMonthHandler}><ArrowForward/></Fab>
        </Grid>
      </>
    )
  }

  private renderWeekDays() {
    const dateFormat = 'dddd'
    const days = []

    const startWeek = dateFns.startOfWeek(this.state.currentDate, { weekStartsOn: 1 })

    for (let i = 0; i < 7; i++) {
      const day = dateFns.format(dateFns.addDays(startWeek, i), dateFormat, {locale})
      days.push(
        <Grid item={true} key={i + Math.random()}>
          <Typography variant="h6" align="center">{day}</Typography>
        </Grid>
      )
    }

    return (
      <Grid container={true} justify="space-between" style={{margin: '20px'}}>
        {days}
      </Grid>
    )
  }

  public render() {
    return (
      <>
        {this.headerRender()}
        {this.renderWeekDays()}
      </>
    );
  }
}

export default Calendar