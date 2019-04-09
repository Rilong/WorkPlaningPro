import * as React from 'react'
import {Fab, Grid, LinearProgress, TextField, Typography} from '@material-ui/core'
import MoneyIcon from '@material-ui/icons/MonetizationOn'
import IDialog from '../../../interfaces/IDialog'
import DialogAction from '../../DialogAction/DialogAction'

interface IState {
  dialog: IDialog
}

class Info extends React.Component<{}, IState> {
  public state:IState = {
    dialog: {
      open: false,
      disabled: true,
      loading: false,
      value: ''
    }
  }

  private inputRef = React.createRef<HTMLInputElement>()


  private dialogOpen = () => {
    this.setState({dialog: {...this.state.dialog, open: true}})
  }

  private dialogClose = () => {
    this.setState({dialog: {...this.state.dialog, open: false}})
  }

  private dialogAgree = () => {
    //
  }

  private dialogEntered = () => {
    this.inputRef.current.focus()
  }

  private dialogTextChangeHandler = () => {
    //
  }

  private dialogAgreeByEnter = () => {
    //
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
          <LinearProgress variant="determinate" value={67} className="pjProgress"/>
          <Grid container={true} justify="space-between">
            <Typography variant="body1" className="pjMoneyText">
              <Fab size="small" color="primary" onClick={this.dialogOpen}>
                <MoneyIcon/>
              </Fab>
              <span className="text">0</span>
            </Typography>
            <Typography variant="body1" className="pjProgressText"><span>67%</span></Typography>
          </Grid>
        </Grid>
        {this.dialogRender()}
      </>
    )
  }
}

export default Info