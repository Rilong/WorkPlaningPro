import * as React from 'react'
import {Grid, Fab, TextField, withStyles} from '@material-ui/core'
import DialogAction from '../../../../components/DialogAction/DialogAction'
import AddIcon from '@material-ui/icons/Add'
import {IStyles, styles} from './styles'

interface IProps {
  classes: IStyles
}

interface IState {
  createProjectOpen: boolean,
  createProjectValue: string
}

class Home extends React.Component<IProps, IState> {

  public state = {
    createProjectOpen: false,
    createProjectValue: ''
  }

  private createProjectClose = () => this.setState({createProjectOpen: false})
  private createProjectOpen = () => this.setState({createProjectOpen: true})

  public render() {
    const {container} = this.props.classes
    return (
      <div>
        <Grid container={true} justify="flex-end" classes={{container}}>
          <Fab color="primary" onClick={this.createProjectOpen}><AddIcon/></Fab>
        </Grid>
        <DialogAction open={this.state.createProjectOpen}
                      onClose={this.createProjectClose}
                      title="Добаления проекта"
                      agreeLabel="Создать проект">
          <TextField placeholder="Ввейдите имя проекта" value={this.state.createProjectValue} fullWidth={true}/>
        </DialogAction>
      </div>
    )
  }
}

export default withStyles(styles)(Home)