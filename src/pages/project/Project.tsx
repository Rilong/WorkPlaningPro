import React from 'react'
import {Typography, Grid, Card, CardContent, LinearProgress, Fab, Divider, TextField} from '@material-ui/core'
import CalendarIcon from '@material-ui/icons/Today'
import MoneyIcon from '@material-ui/icons/MonetizationOn'
import AddIcon from '@material-ui/icons/Add'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {match, withRouter} from 'react-router'
import './styles.scss'
import Task from '../../components/tasks/task/Task'
import TextEditor from '../../components/textEditor/TextEditor'
import Note from '../../components/note/Note'
import File from '../../components/file/File'
import DropZone from '../../components/dropZone/DropZone'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {getProjectById} from '../../store/actions/project/actions'
import {Project as ProjectModel} from '../../models/Project'
import DialogAction from '../../components/DialogAction/DialogAction'

interface IParams {
  id: string
}

interface IProps {
  match?: match<IParams>
  getProjectById: (id: string) => any
  loaded: boolean
}

interface IState {
  view: boolean
  project: ProjectModel
  dialog: {open: boolean, title: string, action: string, value: any}
}

class Project extends React.Component<IProps, IState> {

  private readonly EDIT_PROJECT_NAME = 'EDIT_PROJECT_NAME'

  public state: IState = {
    view: false,
    project: null,
    dialog: {
      open: false,
      title: '',
      action: '',
      value: null
    }
  }

  private dialogContent: React.ReactNode = null

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

  private projectNameEdit = () => {
    this.dialogOpen('Изменения названия проекта', this.EDIT_PROJECT_NAME, this.textFieldRender)
  }

  private dialogOpen = (title: string, action: string, renderFunc: () => React.ReactNode) => {
    this.dialogContent = renderFunc()
    this.setState({dialog: {...this.state.dialog, open: true, title, action}})
  }

  private dialogAgree = () => {
    // Next code
  }

  private dialogClose = () => {
    this.setState({dialog: {...this.state.dialog, open: false, action: ''}})
  }

  private dialogRender(): React.ReactNode {
    return <DialogAction open={this.state.dialog.open}
                         onClose={this.dialogClose}
                         onAgree={this.dialogAgree}
                         onDisagree={this.dialogClose}
                         title={this.state.dialog.title}>
      {this.dialogContent}
    </DialogAction>
  }

  private textFieldRender(): React.ReactNode {
    return <TextField/>
  }

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
                              onClick={this.projectNameEdit}
                              className="pjName">{project ? project.name : ''}</Typography>
                  <Grid container={true} justify="space-between">
                    <Typography variant="subtitle2">
                      <Fab size="small" color="primary" className="pjDateStartBtn"><CalendarIcon/></Fab>
                      Дата начала 26.02.2019
                    </Typography>
                    <Typography variant="subtitle2">
                      Дата завершения 05.03.2019
                      <Fab size="small" color="primary" className="pjDateFinishBtn"><CalendarIcon/></Fab>
                    </Typography>
                  </Grid>
                </CardContent>
                <Grid container={true} className="pjInfo">
                  <LinearProgress variant="determinate" value={67} className="pjProgress"/>
                  <Grid container={true} justify="space-between">
                    <Typography variant="body1" className="pjMoneyText">
                      <Fab size="small" color="primary">
                        <MoneyIcon/>
                      </Fab>
                      <span className="text">0</span>
                    </Typography>
                    <Typography variant="body1" className="pjProgressText"><span>67%</span></Typography>
                  </Grid>
                </Grid>
                <Divider/>
                <CardContent> {/* Tasks */}
                  <Typography variant="h6" align="center">Задачи</Typography>
                  <div className="pjTasks">
                    <Task value="Тестовая задача" checked={false} className="pjTask">
                      <Task value="Тестовая задача" checked={true} sub={true} className="pjTask"/>
                      <Task value="Тестовая задача" checked={false} sub={true} className="pjTask"/>
                    </Task>
                    <Task value="Тестовая задача" checked={false} className="pjTask"/>
                  </div>
                  <Fab color="primary" variant="extended" size="small" className="pjTasksAdd"><AddIcon/> Добавить
                    задачу</Fab>
                </CardContent>
                <Divider/>
                <CardContent> {/* Notes */}
                  <Typography variant="h6" align="center" className="pj-mb">Примечания</Typography>
                  <Note content={'<b>dsd</b>'} onEdit={(content: string) => console.log(content)}
                        onRemove={() => null}/>

                  <TextEditor onChange={(model) => console.log(model)} className="pjTextEditor"/>
                  <Fab color="primary" variant="extended" size="small" className="pjNotesAdd"><AddIcon/> Добавить
                    примечание</Fab>
                </CardContent>
                <Divider/>
                <CardContent> {/* Upload files */}
                  <Typography variant="h6" align="center" className="pj-mb">Прикрепления файлов</Typography>
                  <div className="files pj-mb">
                    <File link="#"
                          download={'file.jpg'}
                          onRemove={() => null}>File name 1</File>
                    <File link="#"
                          download={'file.jpg'}
                          onRemove={() => null}>File name 2</File>
                    <File link="#"
                          download={'file.jpg'}
                          onRemove={() => null}>File name 3</File>
                  </div>
                  <Fab variant="extended"
                       size="small"
                       color="primary"
                       className="pjUploadBtn">
                    <CloudUploadIcon className="pjUploadBtnIcon"/> Загрузить файл
                  </Fab>
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
    getProjectById: (id: string) => dispatch<any>(getProjectById(id))
  }
}

export default withRouter<any>(connect(mapStateToProps, mapDispatchToProps)(Project))