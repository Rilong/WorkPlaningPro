import * as React from 'react'
import {Fab, Typography} from '@material-ui/core'
import Task from '../../tasks/task/Task'
import AddIcon from '@material-ui/icons/Add'
import TaskModel from '../../../models/Task'

interface IProps {
  id: string
  onAdd: (parentIndex?: number) => void
  tasks: TaskModel[]
  onChange: (value: string, index: number, subIndex?: number) => void
  onSave?: (task: TaskModel, parentIndex?: number, subIndex?: number) => void
  onCheck?: (task: TaskModel, parentIndex?: number, subIndex?: number) => void
  onRemove: (parentIndex: number, subIndex?: number) => void
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
              onChange={value => this.props.onChange(value, index)}
              onRemove={() => this.props.onRemove(index)}
              onSubAdd={() => this.props.onAdd(index)}
              onCheckChange={() => this.props.onCheck(Object.assign(Object.create(task), task), index)}
              checkDisable={task.loading}
        >
          {task.tasks.map((taskSub: TaskModel, indexSub: number) => (
            <Task value={taskSub.name}
                  key={`task__${index}__sub__${indexSub}`}
                  sub={true}
                  checked={taskSub.done}
                  loading={taskSub.loading}
                  onFocusLost={() => this.props.onSave(Object.assign(Object.create(taskSub), taskSub), index, indexSub)}
                  className="pjTask"
                  onChange={value => this.props.onChange(value, index, indexSub)}
                  onRemove={() => this.props.onRemove(index, indexSub)}
                  onCheckChange={() => this.props.onCheck(Object.assign(Object.create(taskSub), taskSub), index, indexSub)}
                  checkDisable={taskSub.loading} />
          ))}
        </Task>
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
             onClick={() => this.props.onAdd()}><AddIcon/> Добавить
          задачу</Fab>
      </>
    )
  }
}

export default TaskList