import React from 'react'
import {Typography, Grid, Card, CardContent, Divider, TextField} from '@material-ui/core'
import {match, withRouter} from 'react-router'
import './styles.scss'
import DropZone from '../../components/dropZone/DropZone'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {
  changeProjectName,
  getProjectById,
  removeTaskInProject,
  saveTaskInProject
} from '../../store/actions/project/actions'
import {Project as ProjectModel} from '../../models/Project'
import TaskModel from '../../models/Task'
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
  saveTaskInProject: (id: string, task: TaskModel, parentIndex?: number, subIndex?: number) => Promise<void>
  removeTaskInProject: (id: string, parentIndex: number, subIndex?: number) => Promise<void>
  loaded: boolean
}

interface IState {
  view: boolean
  project: ProjectModel
  dialog: { open: boolean, value: string, loading: boolean, disabled: boolean }
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
    },
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

  private loadProject = () => {
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
        this.loadProject()
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

  /*
  * *********** Tasks **************
  */

  /*
  * Add task
  */

  private addTask = (parentIndex: number = null) => {
    const taskList: TaskModel[] = [...this.state.project.tasks]
    const project: ProjectModel = Object.assign(Object.create(this.state.project), this.state.project)

    if (parentIndex === null) {
      taskList.push(new TaskModel())
    } else {
      taskList[parentIndex].tasks.push(new TaskModel())
    }
    project.tasks = taskList
    this.setState({project})
  }

  private taskChangeHandler = (value: string, index: number, subIndex: number = null) => {
    const taskList: TaskModel[] = [...this.state.project.tasks]
    const project: ProjectModel = Object.assign(Object.create(this.state.project), this.state.project)
    if (subIndex === null) {
      taskList[index].name = value
    } else {
      taskList[index].tasks[subIndex].name = value
    }
    project.tasks = taskList

    this.setState({project})
  }

  private saveTask = (task: TaskModel, parentIndex: number, subIndex: number = null) => {
    const project: ProjectModel = Object.assign(Object.create(this.state.project), this.state.project)
    const tasksCloned = Object.assign(Object.create(this.state.project.tasks), this.state.project.tasks)
    let tasks: TaskModel = null

    if(subIndex === null) {
      tasksCloned[parentIndex] = task
      project.tasks[parentIndex] = task
      tasks = tasksCloned[parentIndex]
    } else {
      tasksCloned[parentIndex].tasks[subIndex] = task
      project.tasks[parentIndex].tasks[subIndex] = task
      tasks = tasksCloned[parentIndex].tasks[subIndex]
    }
    task.loading = true

    this.setState({project}, () => {
      this.props.saveTaskInProject(this.state.project.id, tasks, parentIndex, subIndex)
        .then(() => {
          task.loading = false
          if(subIndex === null) {
            project.tasks[parentIndex] = task
          } else {
            project.tasks[parentIndex].tasks[subIndex] = task
          }
          this.setState({project}, () => this.loadProject())
        })
        .catch(() => {
          task.loading = false
          if(subIndex === null) {
            project.tasks[parentIndex] = task
          } else {
            project.tasks[parentIndex].tasks[subIndex] = task
          }
          this.setState({project}, () => this.loadProject())
        })
    })
  }

  private removeTask = (parentIndex: number, subIndex: number = null) => {
    const project: ProjectModel = Object.assign(Object.create(this.state.project), this.state.project)
    const tasks = [...this.state.project.tasks]
    const current = subIndex === null ? tasks[parentIndex] : tasks[parentIndex].tasks[subIndex]

    if (!current.saved) {
      if (subIndex === null) {
        tasks.splice(parentIndex, 1)
      } else {
        tasks[parentIndex].tasks.splice(subIndex, 1)
      }
      project.tasks = tasks
      this.setState({project})
    } else {
      current.loading = true
      project.tasks = tasks
      this.setState({project})

      this.props.removeTaskInProject(project.id, parentIndex, subIndex)
        .then(() => this.loadProject())
        .catch(() => {
          current.loading = false
          project.tasks = tasks
          this.setState({project})
        })
    }
  }

  private checkToggleTask = (task: TaskModel, parentIndex: number, subIndex: number = null) => {
    task.done = !task.done
    this.saveTask(task, parentIndex, subIndex)
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
                              className="pjName">{project.name}</Typography>
                  <Deadlines start={new Date(project.startDate)}
                             finish={new Date(project.finishDate)}
                             id={this.props.match.params.id}
                             onLoad={this.loadProject}/>
                </CardContent>
                <Info id={this.props.match.params.id}
                      budget={this.state.project.budget.toString()}
                      progress={50}
                      onLoad={this.loadProject}/>
                <Divider/>
                <CardContent> {/* Tasks */}
                  <TaskList id={this.state.project.id}
                            tasks={this.state.project.tasks}
                            onAdd={this.addTask}
                            onChange={this.taskChangeHandler}
                            onSave={this.saveTask}
                            onRemove={this.removeTask}
                            onCheck={this.checkToggleTask}
                  />
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
        {this.state.view ? (this.state.project ? this.contentRender() : null) : null}
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
    changeProjectName: (name: string, id: string) => dispatch<any>(changeProjectName(name, id)),
    saveTaskInProject: (id: string, task: TaskModel, parentIndex: number = null, subIndex: number = null) => dispatch<any>(saveTaskInProject(
      id,
      task,
      parentIndex,
      subIndex
    )),
    removeTaskInProject: (id: string, parentIndex: number, subIndex: number = null) => dispatch<any>(removeTaskInProject(id, parentIndex, subIndex))
  }
}

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(Project))