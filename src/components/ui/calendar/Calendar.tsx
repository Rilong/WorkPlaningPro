import {styles, IStyles} from './styles'

import * as React from 'react'
import * as dateFns from 'date-fns'
import * as locale from 'date-fns/locale/ru'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import {
  Fab,
  Grid,
  Typography,
  Button,
  DialogActions,
  DialogContent,
  Dialog
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack"
import ArrowForward from "@material-ui/icons/ArrowForward"
import withStyles from "@material-ui/core/styles/withStyles";

interface IProps {
  onSelect: (day: Date) => void,
  classes?: IStyles
  picker?: boolean
}

interface IState {
  currentDate: Date,
  fixedDate: Date
  selectedDate: Date,
  dialog: boolean
}

class Calendar extends React.Component<IProps, IState> {

  public state: IState = {
    currentDate: new Date(),
    fixedDate: new Date(),
    selectedDate: null,
    dialog: false
  }

  public static defaultProps = {
    picker: false
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

    const currentMonth = dateFns.format(this.state.currentDate, 'MMMM', {locale});
    const currentYear = dateFns.format(this.state.currentDate, 'YYYY', {locale});

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
    let dateFormat = 'dddd'
    const days = []

    if (this.props.picker) {
      dateFormat = 'dd'
    }

    const startWeek = dateFns.startOfWeek(this.state.currentDate, {weekStartsOn: 1})

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

    const {currentDate, fixedDate, selectedDate} = this.state
    const startMonth = dateFns.startOfMonth(currentDate)
    const endMonth = dateFns.endOfMonth(startMonth)
    const startDate = dateFns.startOfWeek(startMonth, {weekStartsOn: 1})
    const endDate = dateFns.endOfWeek(endMonth, {weekStartsOn: 1})
    const rows = []

    let days = []
    let day = startDate

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const currentDay = day
        const formatDate = dateFns.format(currentDay, 'D', {locale})

        let cardClass = classes.calendarCard
        let typoClass = classes.text

        if (!dateFns.isSameMonth(day, startMonth)) {
          cardClass += ' ' + classes.unactivated
          typoClass += ' ' + classes.unactivatedText
        }

        if (dateFns.isSameDay(day, fixedDate)) {
          cardClass += ' ' + classes.activated
          typoClass += ' ' + classes.activatedText
        }

        if (dateFns.isSameDay(selectedDate, currentDay)) {
          cardClass += ' ' + classes.selected
          typoClass += ' ' + classes.selectedText
        }

        days.push(
          <div key={i + Math.random()} className={classes.calendarCeil}>
            <Button className={cardClass} onClick={() => this.selectHandler(currentDay)}>
              <Typography variant="h6" className={typoClass}>{formatDate}</Typography>
            </Button>
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

  private selectHandler(day: Date) {
    this.props.onSelect(day)
    this.setState({...this.state, selectedDate: day})
    console.log(day)
  }

  private renderCalendar() {
    return (
      <>
        {this.headerRender()}
        {this.renderWeekDays()}
        {this.renderDays()}
      </>
    )
  }

  private dialogCloseHandler = () => this.setState({dialog: false});


  private openDialog = () => this.setState({dialog: true})

  public render() {

    return (
      <>
        {this.props.picker ? (
          <>
            <Button color="primary" onClick={this.openDialog}>Выбрать дату <CalendarIcon/></Button>
            <Dialog
              open={this.state.dialog}
              onClose={this.dialogCloseHandler}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                {this.renderCalendar()}
              </DialogContent>
              <DialogActions>
                <Button onClick={this.dialogCloseHandler} color="primary">
                  Disagree
                </Button>
                <Button onClick={this.dialogCloseHandler} color="primary" autoFocus={true}>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : this.renderCalendar()}
      </>
    );
  }
}

export default withStyles(styles)(Calendar)