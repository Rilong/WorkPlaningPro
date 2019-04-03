import React from 'react'
import {Typography, Grid, Card, CardContent, Divider, TextField} from '@material-ui/core'
import {match, withRouter} from 'react-router'
import './styles.scss'
import DropZone from '../../components/dropZone/DropZone'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {changeProjectName, getProjectById} from '../../store/actions/project/actions'
import {Project as ProjectModel} from '../../models/Project'
import DialogAction from '../../components/DialogAction/DialogAction'
import Validators from '../../validation/validators'
import Deadlines from '../../components/project/date/Deadlines'
import Info from '../../components/project/info/Info'
import TaskList from '../../components/project/taskList/taskList'
import NoteList from '../../components/project/noteList/NoteList'
import FilesList from '../../components/project/fileList/FileList'

interface IParams {
  id: string
}

interface IProps {
  match?: match<IParams>
  getProjectById: (id: string) => any
  changeProjectName: (name: string, id: string) => Promise<null>
  loaded: boolean
}

interface IState {
  view: boolean
  project: ProjectModel
  dialog: {open: boolean, value: string, loading: boolean, disabled: boolean}
}

class Project extends React.Component<IProps, IState> {

  public state: IState = {
    view: false,
    project: null,
    dialog: {
      open: false,
      value: '',
      loading: false,
      disabled: true
    }
  }

  private inputRef = React.createRef<HTMLInputElement>()

  public componentDidMount(): void {
    setTimeout(() => this.setState({view: true}), 50)
    this.loadProject()
  }

  public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
    if (prevProps.loaded === false && this.props.loaded === true) {
      this.loadProject()
    }
  }

  private loadProject() {
    const project: ProjectModel = this.props.getProjectById(this.props.match.params.id)
    this.setState({project})
  }

  private addFiles = (files: FileList) => {
    console.log(files.item(0))
  }

  /**
   * Open dialog
   */

  private dialogOpen = () => {
    this.setState({dialog: {...this.state.dialog, open: true, value: this.state.project.name}})
  }

  /**
   * Close dialog
   */

  private dialogClose = () => {
    this.setState({dialog: {...this.state.dialog, open: false}})
  }

  /**
   * Handling enter dialog
   */

  private dialogEntered = () => {
    this.inputRef.current.focus()
  }

  /**
   * Handling agree action
   */

  private dialogAgree = () => {
    this.dialogLoading()
    this.props.changeProjectName(this.state.dialog.value, this.state.project.id)
      .then(() => {
        this.dialogUnloading()
        this.dialogClose()
      })
      .catch(() => this.dialogUnloading())
  }

  /**
   * Set loading to agree button
   */

  private dialogLoading = () => {
    this.setState({dialog: {...this.state.dialog, loading: true}})
  }

  /**
   * Set unloading to agree button
   */

  private dialogUnloading = () => {
    this.setState({dialog: {...this.state.dialog, loading: false}})
  }

  /**
   * Handling text field on change
   */

  private dialogTextChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const disabled = Validators.isRequired(event.target.value)
    this.setState({dialog: {...this.state.dialog, value: event.target.value, disabled}})
  }

  /**
   * Agree by Enter key
   */

  private dialogAgreeByEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13 && !this.state.dialog.disabled) {
      this.dialogAgree()
    }
  }

  /**
   * Render dialog window
   */

  private dialogRender(): React.ReactNode {
    const {dialog} = this.state

    return <DialogAction open={dialog.open}
                         onClose={this.dialogClose}
                         onAgree={this.dialogAgree}
                         onDisagree={this.dialogClose}
                         onEntered={this.dialogEntered}
                         title="Изменения названия проекта"
                         disabled={dialog.disabled || dialog.loading}
                         loading={dialog.loading}>
      <TextField fullWidth={true}
                 inputRef={this.inputRef}
                 onChange={this.dialogTextChangeHandler}
                 onKeyUp={this.dialogAgreeByEnter}
                 value={dialog.value}/>
    </DialogAction>
  }

  /**
   * Render content
   */

  private contentRender(): React.ReactNode {
    const {project} = this.state
    return (
      <div>
        <Grid container={true} justify="center" className="pjContainer">
          <Grid item={true} xs={5}>
            <Card>
              <DropZone onDrop={this.addFiles}>
                <CardContent> {/* Info */}
                  <Typography variant="h4"
                              onClick={this.dialogOpen}
                              className="pjName">{project ? project.name : ''}</Typography>
                  <Deadlines/>
                </CardContent>
                <Info/>
                <Divider/>
                <CardContent> {/* Tasks */}
                  <TaskList/>
                </CardContent>
                <Divider/>
                <CardContent> {/* Notes */}
                  <NoteList/>
                </CardContent>
                <Divider/>
                <CardContent> {/* Upload files */}
                  <FilesList/>
                </CardContent>
              </DropZone>
            </Card>
          </Grid>
        </Grid>
        {this.dialogRender()}
      </div>
    )
  }

  public render(): React.ReactNode {

    return (
      <>
        {this.state.view ? this.contentRender() : null}
      </>
    )
  }

}

function mapStateToProps(state) {
  return {
    loaded: state.ProjectListReducer.loaded
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    getProjectById: (id: string) => dispatch<any>(getProjectById(id)),
    changeProjectName: (name: string, id: string) => dispatch<any>(changeProjectName(name, id))
  }
}

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(Project))