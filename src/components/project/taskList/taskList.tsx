import * as React from 'react'
import {Fab, Typography} from '@material-ui/core'
import Task from '../../tasks/task/Task'
import AddIcon from '@material-ui/icons/Add'

class TaskList extends React.Component {
  public render() {
    return (
      <>
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
      </>
    )
  }
}

export default TaskList