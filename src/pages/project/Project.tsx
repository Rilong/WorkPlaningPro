import React from 'react'
import {Typography, Grid, Card, CardContent, LinearProgress, Fab, Divider} from '@material-ui/core'
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

interface IParams {
  id: string
}

interface IProps {
  match?: match<IParams>
}

interface IState {
  view: boolean
}



class Project extends React.Component<IProps, IState> {

  public state: IState = {
    view: false
  }

  public componentDidMount(): void {
    setTimeout(() => this.setState({view: true}), 50)
  }

  private contentRender(): React.ReactNode {
    return (
      <div>
        <Grid container={true} justify="center" className="pjContainer">
          <Grid item={true} xs={5}>
            <Card>
              <DropZone>
              <CardContent> {/* Info */}
                <Typography variant="h4" className="pjName">Test</Typography>
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
                <Note content={'<b>dsd</b>'} onEdit={(content: string) => console.log(content)} onRemove={() => null}/>

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

export default withRouter<any>(Project)