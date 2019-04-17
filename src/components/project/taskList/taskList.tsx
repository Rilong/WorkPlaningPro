import * as React from 'react'
import {Fab, Typography} from '@material-ui/core'
import Task from '../../tasks/task/Task'
import AddIcon from '@material-ui/icons/Add'
import TaskModel from '../../../models/Task'

interface IProps {
  id: string
  onAdd: () => void
  tasks: TaskModel[]
  onChange: (value: string, index: number, isSub?: boolean) => void
  onSave?: (task: TaskModel, parentIndex?: number, subIndex?: number) => void
}

class TaskList extends React.Component<IProps> {

  private listRender() {
    if (this.props.tasks.length === 0) {
      return null
    }

    return this.props.tasks.map((task: TaskModel, index: number) => (
        <Task value={task.name}
              key={`task__${index}`}
              checked={task.done}
              loading={task.loading}
              onFocusLost={() => this.props.onSave(Object.assign(Object.create(task), task), index)}
              className="pjTask"
              onChange={value => this.props.onChange(value, index)}/>
      )
    )
  }

  public render() {
    return (
      <>
        <Typography variant="h6" align="center">Задачи</Typography>
        <div className="pjTasks">
          {this.listRender()}
        </div>
        <Fab color="primary"
             variant="extended"
             size="small"
             className="pjTasksAdd"
             onClick={this.props.onAdd}><AddIcon/> Добавить
          задачу</Fab>
      </>
    )
  }
}

export default TaskList