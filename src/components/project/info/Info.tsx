import * as React from 'react'
import {Fab, Grid, LinearProgress, TextField, Typography} from '@material-ui/core'
import MoneyIcon from '@material-ui/icons/MonetizationOn'
import IDialog from '../../../interfaces/IDialog'
import DialogAction from '../../DialogAction/DialogAction'
import {Dispatch} from 'redux'
import {connect} from 'react-redux'
import {setProjectBudget} from '../../../store/actions/project/actions'

interface IState {
  dialog: IDialog
}

interface IProps {
  id: string
  budget: string
  onLoad: () => void
  progress: number
  setProjectBudget?: (budget: number, id: string) => Promise<void>
}

class Info extends React.Component<IProps, IState> {
  public state:IState = {
    dialog: {
      open: false,
      disabled: true,
      loading: false,
      value: ''
    }
  }

  private inputRef = React.createRef<HTMLInputElement>()


  public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
    if (prevProps.budget !== this.props.budget) {
      this.setState({dialog: {...this.state.dialog, value: this.props.budget}})
    }
  }

  private dialogOpen = () => {
    this.setState({dialog: {...this.state.dialog, open: true}})
  }

  private dialogClose = () => {
    this.setState({dialog: {...this.state.dialog, open: false}})
  }

  private dialogAgree = () => {
    this.dialogLoading()
    if (!this.state.dialog.disabled) {
      this.props.setProjectBudget(+this.state.dialog.value, this.props.id)
        .then(() => {
          this.dialogUnloading()
          this.props.onLoad()
          this.dialogClose()
        })
        .catch(() => this.dialogUnloading())
    }
  }

  private dialogLoading = () => {
    this.setState({dialog: {...this.state.dialog, loading: true}})
  }

  private dialogUnloading = () => {
    this.setState({dialog: {...this.state.dialog, loading: false}})
  }


  private dialogEntered = () => {
    this.inputRef.current.focus()
  }

  private dialogTextChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dialog = {...this.state.dialog}
    let value = dialog.value
    let disabled = dialog.disabled

    if (event.target.value.match(/(^[0-9.]+$)|(^$)/)) {
      value = event.target.value

      if (value.length !== 0) {
        disabled = false
      } else {
        disabled = true
      }
    }

    this.setState({dialog: {...dialog, value, disabled}})
  }

  private dialogAgreeByEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && !this.state.dialog.disabled) {
      this.dialogAgree()
    }
  }

  private dialogRender() {
    const {dialog} = this.state
    return <DialogAction open={dialog.open}
                         onClose={this.dialogClose}
                         onAgree={this.dialogAgree}
                         onDisagree={this.dialogClose}
                         onEntered={this.dialogEntered}
                         title="Изменения стоимости проекта"
                         disabled={dialog.disabled || dialog.loading}
                         loading={dialog.loading}>
      <TextField fullWidth={true}
                 inputRef={this.inputRef}
                 onChange={this.dialogTextChangeHandler}
                 onKeyUp={this.dialogAgreeByEnter}
                 value={dialog.value}/>
    </DialogAction>
  }

  public render() {
    return (
      <>
        <Grid container={true} className="pjInfo">
          <LinearProgress variant="determinate" value={this.props.progress} className="pjProgress"/>
          <Grid container={true} justify="space-between">
            <Typography variant="body1" className="pjMoneyText">
              <Fab size="small" color="primary" onClick={this.dialogOpen}>
                <MoneyIcon/>
              </Fab>
              <span className="text">{this.props.budget}</span>
            </Typography>
            <Typography variant="body1" className="pjProgressText"><span>{this.props.progress}%</span></Typography>
          </Grid>
        </Grid>
        {this.dialogRender()}
      </>
    )
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    setProjectBudget: (budget: number, id: string) => dispatch<any>(setProjectBudget(budget, id))
  }
}

export default connect(null, mapDispatchToProps)(Info)