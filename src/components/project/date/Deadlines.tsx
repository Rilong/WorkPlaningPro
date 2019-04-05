import * as React from 'react'
import {Fab, Grid, Typography} from '@material-ui/core'
import CalendarIcon from '@material-ui/icons/Today'
import IDialog from '../../../interfaces/IDialog'
import Calendar from '../../calendar/Calendar'

interface IProps {
  start: Date
  finish: Date
  onChoose: (start: Date, finish: Date) => void
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
      disabled: true
    }
  }

  public constructor(props: IProps) {
   super(props)
   this.startDate = props.start
   this.finishDate = props.finish
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
    if (this.state.dialog.open && this.state.dialog.action === this.START_DATE) {
      this.startDate = date
    }

    if (this.state.dialog.open && this.state.dialog.action === this.FINISH_DATE) {
      this.finishDate = date
    }
  }

  private dialogAgreeHandler = () => {
    this.props.onChoose(this.startDate, this.finishDate)
    this.dialogClose()
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

  private dialogRender = () => {
    return (
      <Calendar onSelect={this.selectDateHandler}
                picker={true}
                dialog={this.state.dialog.open}
                onClose={this.dialogCloseHandler}
                onAgree={this.dialogAgreeHandler}
                onDisagree={this.dialogDisagreeHandler}
                />
    )
  }

  public render(): React.ReactNode {
    return (
      <>
        <Grid container={true} justify="space-between">
          <Typography variant="subtitle2">
            <Fab size="small" color="primary" className="pjDateStartBtn"
                 onClick={this.chooseStart}><CalendarIcon/></Fab>
            Дата начала {this.props.start ? '26.02.2019' : 'не задана'}
          </Typography>
          <Typography variant="subtitle2">
            Дата завершения {this.props.finish ? '26.02.2019' : 'не задана'}
            <Fab size="small" color="primary" className="pjDateFinishBtn"
                 onClick={this.chooseFinish}><CalendarIcon/></Fab>
          </Typography>
        </Grid>
        {this.dialogRender()}
      </>
    )
  }
}

export default Deadlines