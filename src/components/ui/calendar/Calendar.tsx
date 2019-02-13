import * as React from 'react'
import * as dateFns from 'date-fns'
import * as locale from 'date-fns/locale/ru'
import {
  Fab,
  Typography,
  Button,
  DialogActions,
  DialogContent,
  Dialog
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack"
import ArrowForward from "@material-ui/icons/ArrowForward"

import './styles.scss'

interface IProps {
  onSelect: (day: Date) => void,
  picker?: boolean
  dialog?: boolean
  onClose?: () => void
  onAccept?: () => void
}

interface IState {
  currentDate: Date,
  fixedDate: Date
  selectedDate: Date,
}

class Calendar extends React.Component<IProps, IState> {

  public state: IState = {
    currentDate: new Date(),
    fixedDate: new Date(),
    selectedDate: null,
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


  private calculateHeight(item: HTMLButtonElement) {
    if (item !== null && this.props.picker === true) {
      item.style.height = item.clientWidth + 'px'
    }
  }

  private headerRender() {
    const currentMonth = dateFns.format(this.state.currentDate, 'MMMM', {locale});
    const currentYear = dateFns.format(this.state.currentDate, 'YYYY', {locale});

    return (
      <div className="calendarHeader">
        <div className="calendarHeaderItem">
          <Fab color="secondary" onClick={this.prevMonthHandler}><ArrowBack/></Fab>
        </div>
        <div className="calendarHeaderItem">
          <Typography variant="h5" align="center" classes={{root: 'capitalize'}}>{currentMonth}  {currentYear}</Typography>
        </div>
        <div className="calendarHeaderItem">
          <Fab color="secondary" onClick={this.nextMonthHandler}><ArrowForward/></Fab>
        </div>
      </div>
    )
  }

  private renderWeekDays() {
    let dateFormat = 'dddd'
    const days = []

    if (this.props.picker) {
      dateFormat = 'dd'
    }

    const startWeek = dateFns.startOfWeek(this.state.currentDate, {weekStartsOn: 1})

    let classesItem = ''
    let classesContainer = ''

    if(this.props.picker) {
      classesItem = 'weekHeaderDialogItem'
      classesContainer = 'weekHeaderDialogContainer'
    } else {
      classesItem = 'weekHeaderItem'
      classesContainer = 'weekHeaderContainer'
    }

    for (let i = 0; i < 7; i++) {
      const day = dateFns.format(dateFns.addDays(startWeek, i), dateFormat, {locale})
      days.push(
        <div className={classesItem} key={'week-' + i}>
          <Typography variant="h6">{day}</Typography>
        </div>
      )
    }

    return (
      <div className={classesContainer}>
        {days}
      </div>
    )
  }

  private renderDays() {
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

        let cardClass = 'calendarCard'
        let typoClass = 'text'

        if (!dateFns.isSameMonth(day, startMonth)) {
          cardClass += ' unactivated'
          typoClass += ' unactivatedText'
        }

        if (dateFns.isSameDay(day, fixedDate)) {
          cardClass += ' activated'
          typoClass += ' activatedText'
          if (this.props.picker) {
            cardClass += ' activatedModal'
            typoClass += ' activatedTextModal'
          }
        }

        if (dateFns.isSameDay(selectedDate, currentDay)) {
          cardClass += ' selected'
          typoClass += ' selectedText'
        }

        days.push(
          <div key={i + Math.random()} className="calendarCeil">
            <Button className={cardClass}
                    onClick={() => this.selectHandler(currentDay)}
                    buttonRef={(item: HTMLButtonElement) => this.calculateHeight(item)}>
              <Typography variant="h6" className={typoClass}>{formatDate}</Typography>
            </Button>
          </div>
        )
        day = dateFns.addDays(day, 1)
      }

      rows.push(
        <div key={Math.random()} className="calendarRow">
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

  public render() {

    return (
      <>
        {this.props.picker ? (
          <>
            <Dialog
              open={this.props.dialog}
              onClose={this.props.onClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                {this.renderCalendar()}
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.onClose && null} color="primary" autoFocus={true}>
                  Отменить
                </Button>
                <Button onClick={this.props.onAccept && null} color="primary">
                  Принять
                </Button>
              </DialogActions>
            </Dialog>
          </>
        ) : this.renderCalendar()}
      </>
    );
  }
}

export default Calendar