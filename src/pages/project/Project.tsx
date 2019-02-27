import React from 'react'
import {Typography, Grid, Card, CardContent, LinearProgress, Fab, Divider, Button} from '@material-ui/core'
import CalendarIcon from '@material-ui/icons/Today'
import MoneyIcon from '@material-ui/icons/MonetizationOn'
import AddIcon from '@material-ui/icons/Add'
import {match, withRouter} from 'react-router'
import './styles.scss'
import Task from '../../components/tasks/task/Task'

interface IParams {
  id: string
}

interface IProps {
  match?: match<IParams>
}

class Project extends React.Component<IProps> {

  public render(): React.ReactNode {

    return (
      <div>
        <Grid container={true} justify="center" className="pjContainer">
          <Grid item={true} xs={5}>
            <Card>
              <CardContent>
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
                  <Typography variant="body1" className="pjMoneyText"><MoneyIcon/> <span>0</span></Typography>
                  <Typography variant="body1" className="pjProgressText"><span>67%</span></Typography>
                </Grid>
              </Grid>
              <Divider/>
              <CardContent>
                <Typography variant="h6" align="center">Задачи</Typography>
                <div className="pjTasks">
                  <Task value="Тестовая задача" checked={false} className="pjTask">
                    <Task value="Тестовая задача" checked={true} sub={true} className="pjTask"/>
                    <Task value="Тестовая задача" checked={false} sub={true} className="pjTask"/>
                  </Task>
                  <Task value="Тестовая задача" checked={false} className="pjTask"/>
                </div>
                <Button variant="extendedFab" color="primary" size="small" className="pjTasksAdd"><AddIcon/> Добавить задачу</Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    )
  }

}

export default withRouter<any>(Project)