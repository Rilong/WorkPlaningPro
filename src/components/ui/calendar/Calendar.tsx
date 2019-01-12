import {styles, IStyles} from './styles'

import * as React from 'react'
import * as dateFns from 'date-fns'
import * as locale from 'date-fns/locale/ru'
import {Fab, Grid, Typography, Card} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack"
import ArrowForward from "@material-ui/icons/ArrowForward"
import withStyles from "@material-ui/core/styles/withStyles";

interface IProps {
  size:string,
  classes?: IStyles
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
    const {classes} = this.props

    const currentMonth = dateFns.format(this.state.currentDate, 'MMMM', { locale });
    const currentYear = dateFns.format(this.state.currentDate, 'YYYY', { locale });

    return (
      <>
        <Grid container={true} item={true} xs={3} justify="flex-start">
          <Fab color="secondary" onClick={this.prevMonthHandler}><ArrowBack/></Fab>
        </Grid>
        <Grid container={true} item={true} xs={6} justify="center">
          <Typography variant="h5" classes={{root: classes.capitalize}}>{currentMonth} - {currentYear}</Typography>
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

  private renderDays() {
    const {classes} = this.props

    const {currentDate} = this.state
    const startMonth = dateFns.startOfMonth(currentDate)
    const endMonth = dateFns.endOfMonth(startMonth)
    const startDate = dateFns.startOfWeek(startMonth, { weekStartsOn: 1 })
    const endDate = dateFns.endOfWeek(endMonth, { weekStartsOn: 1 })

    const rows = []

    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formatDate = dateFns.format(day, 'D MMM', { locale })
        days.push(
          <div key={i + Math.random()} className={classes.calendarCeil}>
            <Card className={classes.calendarCard}>
              <Typography variant="h6">{formatDate}</Typography>
            </Card>
          </div>
        )

        day = dateFns.addDays(day, 1)
      }

      rows.push(
        <div key={Math.random()} className={classes.calendarRow}>
          {days}
        </div>
      )
      days = []
    }

    return (rows)
  }

  public render() {

    return (
      <>
        {this.headerRender()}
        {this.renderWeekDays()}
        {this.renderDays()}
      </>
    );
  }
}

export default withStyles(styles)(Calendar)