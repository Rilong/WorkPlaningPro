import * as React from 'react'
import {connect} from 'react-redux'
import {Grid, Fab, TextField} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DialogAction from '../../components/DialogAction/DialogAction'
import {createProject} from '../../store/actions/project/actions'

import './styles.scss'

interface IProps {
  createProjectOpen: boolean
  onCreateProject?: (projectName: string) => Promise<void>
  loading?: boolean
}

interface IState {
  createProjectValue: string
  createProjectValid: boolean
  createProjectOpen: boolean
}

class Home extends React.Component<IProps, IState> {

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

  private onProjectAgree = () => {
    if (this.state.createProjectValid) {
      this.props.onCreateProject(this.state.createProjectValue).then(() => this.createProjectClose())
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
                      onAgree={this.onProjectAgree}
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
                     onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.onProjectNameChangeHandler(event.target.value)}
                     fullWidth={true}/>
        </DialogAction>

      </div>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    createProjectOpen: state.ProjectReducer.open,
    loading: state.ProjectReducer.loading
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    onCreateProject: (projectName: string) => dispatch(createProject(projectName))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)