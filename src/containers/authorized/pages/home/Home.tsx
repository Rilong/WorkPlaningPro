import * as React from 'react'
import {connect} from 'react-redux';
import {Grid, Fab, TextField} from '@material-ui/core'
import DialogAction from '../../../../components/DialogAction/DialogAction'
import AddIcon from '@material-ui/icons/Add'

import './styles.scss'

interface IState {
  createProjectOpen: boolean,
  createProjectValue: string,
  createProjectValid: boolean
}

class Home extends React.Component<null, IState> {

  public state = {
    createProjectOpen: false,
    createProjectValue: '',
    createProjectValid: false
  }

  private projectNameRef = React.createRef<HTMLInputElement>()


  private onCreateProjectEntered = () => this.projectNameRef.current.focus()

  private createProjectOpen = () => this.setState({createProjectOpen: true})

  private createProjectClose = () => {
    this.setState({
      createProjectOpen: false,
      createProjectValue: '',
      createProjectValid: false
    })
  }

  private onProjectNameChangeHandler = (value: string) => {
    this.setState({createProjectValue: value})

    if (value.trim().length !== 0 && this.state.createProjectValid === false) {
      this.setState({createProjectValid: true})
    } else if (value.trim().length === 0 && this.state.createProjectValid === true) {
      this.setState({createProjectValid: false})
    }

    if (this.state.createProjectValid) {
      // Next code...
    }

  }

  public render() {
    return (
      <div>
        <Grid container={true} justify="flex-end" classes={{container: 'homeContainer'}}>
          <Fab color="primary" onClick={this.createProjectOpen}><AddIcon/></Fab>
        </Grid>
        <DialogAction open={this.state.createProjectOpen}
                      onEntered={this.onCreateProjectEntered}
                      onClose={this.createProjectClose}
                      title="Добаления проекта"
                      agreeLabel="Создать проект"
                      disabled={!this.state.createProjectValid}
                      onDisagree={this.createProjectClose}
        >
          <TextField placeholder="Ввейдите имя проекта"
                     inputRef={this.projectNameRef}
                     value={this.state.createProjectValue}
                     onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onProjectNameChangeHandler(event.target.value)}
                     fullWidth={true}/>
        </DialogAction>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {}
}

function mapDispatchToProps(dispatch: any) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)