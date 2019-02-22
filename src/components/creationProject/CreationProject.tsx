import * as React from 'react'
import {Fab, Grid, TextField} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DialogAction from '../DialogAction/DialogAction'
import {createProject} from '../../store/actions/project/actions'
import {connect} from 'react-redux'
import User from '../../models/User'

interface IProps {
  user?: User
  onCreateProject?: (projectName: string, userId: string) => Promise<void>
  loading?: boolean
}

interface IState {
  createProjectValue: string
  createProjectValid: boolean
  createProjectOpen: boolean
}

class CreationProject extends React.Component<IProps, IState> {
  public state = {
    createProjectValue: '',
    createProjectValid: false,
    createProjectOpen: false
  }

  private projectNameRef = React.createRef<HTMLInputElement>()

  private onCreateProjectEntered = () => this.projectNameRef.current.focus()

  private createProjectOpen = () => this.setState({createProjectOpen: true})

  private createProjectClose = () => {
    this.setState({
      createProjectOpen: false,
      createProjectValue: '',
      createProjectValid: false,
    })
  }

  private onProjectNameChangeHandler = (value: string) => {
    this.setState({createProjectValue: value})

    if (value.trim().length !== 0 && this.state.createProjectValid === false) {
      this.setState({createProjectValid: true})
    } else if (value.trim().length === 0 && this.state.createProjectValid === true) {
      this.setState({createProjectValid: false})
    }
  }

  private createProject = () => {
    if (this.state.createProjectValid) {
      this.props.onCreateProject(this.state.createProjectValue, this.props.user.id)
        .then(() => this.createProjectClose())
    }
  }

  private createProjectOnEnter(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      this.createProject()
    }
  }

  public render(): React.ReactNode {
    return (
      <div>
        <Grid container={true} justify="flex-end" classes={{container: 'homeContainer'}}>
          <Fab color="primary" onClick={this.createProjectOpen}><AddIcon/></Fab>
        </Grid>
        <DialogAction open={this.state.createProjectOpen}
                      onEntered={this.onCreateProjectEntered}
                      onAgree={this.createProject}
                      onClose={this.createProjectClose}
                      title="Добаления проекта"
                      agreeLabel="Создать проект"
                      disabled={!this.state.createProjectValid || this.props.loading}
                      loading={this.props.loading}
                      onDisagree={this.createProjectClose}
        >
          <TextField placeholder="Ввейдите имя проекта"
                     inputRef={this.projectNameRef}
                     value={this.state.createProjectValue}
                     onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => this.createProjectOnEnter(event)}
                     onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onProjectNameChangeHandler(event.target.value)}
                     fullWidth={true}/>
        </DialogAction>
      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    user: state.UserReducer.user,
    createProjectOpen: state.ProjectReducer.open,
    loading: state.ProjectReducer.loading,
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onCreateProject: (projectName: string, userId: string) => dispatch(createProject(projectName, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreationProject)