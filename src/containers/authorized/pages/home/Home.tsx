import * as React from 'react'
import {Grid, Fab, TextField} from '@material-ui/core'
import DialogAction from '../../../../components/DialogAction/DialogAction'
import AddIcon from '@material-ui/icons/Add'
import Task from "../../../../components/task/Task";

import './styles.scss'

interface IState {
  createProjectOpen: boolean,
  createProjectValue: string
}

class Home extends React.Component<null, IState> {

  public state = {
    createProjectOpen: false,
    createProjectValue: ''
  }

  private createProjectClose = () => this.setState({createProjectOpen: false})
  private createProjectOpen = () => this.setState({createProjectOpen: true})

  public render() {
    return (
      <div>
        <Grid container={true} justify="flex-end" classes={{container: 'homeContainer'}}>
          <Fab color="primary" onClick={this.createProjectOpen}><AddIcon/></Fab>
        </Grid>
        <DialogAction open={this.state.createProjectOpen}
                      onClose={this.createProjectClose}
                      title="Добаления проекта"
                      agreeLabel="Создать проект">
          <TextField placeholder="Ввейдите имя проекта" value={this.state.createProjectValue} fullWidth={true}/>
        </DialogAction>
        <Task value="123"/>
      </div>
    )
  }
}

export default Home