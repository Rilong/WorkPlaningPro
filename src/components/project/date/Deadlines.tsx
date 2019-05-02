import * as React from 'react'
import * as dateFns from 'date-fns'
import {Fab, Grid, Typography} from '@material-ui/core'
import CalendarIcon from '@material-ui/icons/Today'
import IDialog from '../../../interfaces/IDialog'
import Calendar from '../../calendar/Calendar'
import {Dispatch} from 'redux'
import {setProjectDeadlines} from '../../../store/actions/project/actions'
import {connect} from 'react-redux'

interface IProps {
  start: Date
  finish: Date
  id: string
  setProjectDeadlines: (start: Date, finish: Date, id: string) => Promise<void>
  onLoad: () => void
}

interface IState {
  dialog: IDialog
}

class Deadlines extends React.Component<IProps, IState> {

  private readonly START_DATE = 'START_DATE'
  private readonly FINISH_DATE = 'FINISH_DATE'
  private startDate: Date = null
  private finishDate: Date = null


  public state: IState = {
    dialog: {
      open: false,
      action: null,
      disabled: true,
      loading: false
    }
  }

  public constructor(props: IProps) {
   super(props)
   this.startDate = props.start
   this.finishDate = props.finish
  }

  private getDateWithFormat(date: Date) {
    return dateFns.format(date, 'DD.MM.YYYY')
  }

  private chooseStart = () => {
    this.dialogOpen(this.START_DATE)
  }

  private chooseFinish = () => {
    this.dialogOpen(this.FINISH_DATE)
  }

  private dialogCloseHandler = () => {
    this.dialogClose()
  }

  private selectDateHandler = (date: Date) => {
    if (this.state.dialog.disabled) {
      this.setState({dialog: {...this.state.dialog, disabled: false}})
    }

    if (this.state.dialog.open && this.state.dialog.action === this.START_DATE) {
      this.startDate = date
    }

    if (this.state.dialog.open && this.state.dialog.action === this.FINISH_DATE) {
      this.finishDate = date
    }
  }

  private dialogAgreeHandler = () => {
    this.setDialogLoading()
    this.props.setProjectDeadlines(this.startDate, this.finishDate, this.props.id)
      .then(() => {
        this.setDialogUnloading()
        this.props.onLoad()
        this.dialogClose()
      })
      .catch(() => this.setDialogUnloading())
  }

  private dialogDisagreeHandler = () => {
    this.dialogClose()
  }

  private dialogOpen = (action: string) => {
    this.setState({dialog: {...this.state.dialog, open: true, action}})
  }

  private dialogClose = () => {
    this.setState({dialog: {...this.state.dialog, open: false, action: null}})
  }

  private setDialogLoading() {
    this.setState({dialog: {...this.state.dialog, loading: true}})
  }
  private setDialogUnloading() {
    this.setState({dialog: {...this.state.dialog, loading: false}})
  }

  private dialogRender = () => {
    return (
      <Calendar onSelect={this.selectDateHandler}
                picker={true}
                dialog={this.state.dialog.open}
                onClose={this.dialogCloseHandler}
                onAgree={this.dialogAgreeHandler}
                onDisagree={this.dialogDisagreeHandler}
                disabled={this.state.dialog.disabled || this.state.dialog.loading}
                loading={this.state.dialog.loading}
                />
    )
  }

  public render(): React.ReactNode {
    console.log(this.props.start, this.props.finish)
    return (
      <>
        <Grid container={true} justify="space-between">
          <Typography variant="subtitle2">
            <Fab size="small" color="primary" className="pjDateStartBtn"
                 onClick={this.chooseStart}><CalendarIcon/></Fab>
            Дата начала {this.props.start ? this.getDateWithFormat(this.props.start) : 'не задана'}
          </Typography>
          <Typography variant="subtitle2">
            Дата завершения {this.props.finish ? this.getDateWithFormat(this.props.finish) : 'не задана'}
            <Fab size="small" color="primary" className="pjDateFinishBtn"
                 onClick={this.chooseFinish}><CalendarIcon/></Fab>
          </Typography>
        </Grid>
        {this.dialogRender()}
      </>
    )
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    setProjectDeadlines: (start: Date, finish: Date, id: string) => dispatch<any>(setProjectDeadlines(start, finish, id))
  }
}

export default connect(null, mapDispatchToProps)(Deadlines)