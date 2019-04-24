import * as React from 'react'
import {Fab, Typography} from '@material-ui/core'
import Task from '../../tasks/task/Task'
import AddIcon from '@material-ui/icons/Add'
import TaskModel from '../../../models/Task'
import IDialog from '../../../interfaces/IDialog'
import Calendar from '../../calendar/Calendar'
import {Dispatch} from 'redux'
import {saveTaskInProject} from '../../../store/actions/project/actions'
import {connect} from 'react-redux'

interface IProps {
  id: string
  onAdd: (parentIndex?: number) => void
  tasks: TaskModel[]
  saveTaskInProject: (id: string, task: TaskModel, parentIndex?: number, subIndex?: number) => Promise<void>
  onChange: (value: string, index: number, subIndex?: number) => void
  onSave?: (task: TaskModel, parentIndex?: number, subIndex?: number) => void
  onCheck?: (task: TaskModel, parentIndex?: number, subIndex?: number) => void
  onRemove: (parentIndex: number, subIndex?: number) => void
  onLoad: () => void
}

interface IState {
  dialog: IDialog
}

class TaskList extends React.Component<IProps, IState> {

  public state: IState = {
    dialog: {
      open: false,
      loading: false,
      value: {
        parentIndex: null,
        subIndex: null,
        date: null
      },
      disabled: true,
      action: ''
    }
  }

  private selectDateHandler = (date: Date) => {
    const disabled: boolean = false

    this.setState({dialog: {...this.state.dialog, disabled, value: {
          ...this.state.dialog.value,
          date: date.getTime()
        }}})
  }

  private openPicker = (parentIndex: number, subIndex: number = null) => {
    this.setState({dialog: {...this.state.dialog, open: true, value: {
      ...this.state.dialog.value,
         parentIndex,
         subIndex
    }}})
  }

  private dialogClose = () => {
    this.setState({
      dialog: {
        ...this.state.dialog,
        open: false,
        value: {
          ...this.state.dialog.value,
          parentIndex: null,
          subIndex: null
        }
      }
    })
  }

  private dialogAgree = () => {
    const {dialog} = this.state
    const {tasks} = this.props
    console.log(tasks, dialog)
    const parentIndex = dialog.value.parentIndex
    const subIndex = dialog.value.subIndex
    const task: TaskModel = subIndex === null
      ? Object.assign(Object.create(tasks[parentIndex]), tasks[parentIndex])
      : Object.assign(Object.create(tasks[parentIndex].tasks[subIndex]), tasks[parentIndex].tasks[subIndex])

    task.deadline = dialog.value.date

    this.setDialogLoading()
    this.props.saveTaskInProject(this.props.id, task, parentIndex, subIndex)
      .then(() => {
        this.setDialogUnloading()
        this.dialogClose()
         this.props.onLoad()
      })
      .catch(() => this.setDialogUnloading())
  }

  private setDialogLoading = () => {
    this.setState({dialog: {...this.state.dialog, loading: true}})
  }

  private setDialogUnloading = () => {
    this.setState({dialog: {...this.state.dialog, loading: false}})
  }

  private calculatePercent(tasks: TaskModel[]) {
    let done = 0
    let total = 0

    if (tasks.length === 0) {
      return 0
    }
    tasks.forEach((task: TaskModel) => {
      if (task.saved) {
        total += 1
      }
      if (task.done) {
        done += 1
      }
    })

    return Math.ceil(100 * done / total)
  }

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
              onDatelinePicker={() => this.openPicker(index)}
              onCheckChange={() => this.props.onCheck(Object.assign(Object.create(task), task), index)}
              checkDisable={task.loading || !task.saved}
              addSubDisable={!task.saved}
              calendarDisable={!task.saved}
              progress={this.calculatePercent(task.tasks)}
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
                  onDatelinePicker={() => this.openPicker(index, indexSub)}
                  onCheckChange={() => this.props.onCheck(Object.assign(Object.create(taskSub), taskSub), index, indexSub)}
                  checkDisable={taskSub.loading || !taskSub.saved}
                  addSubDisable={!taskSub.saved}
                  calendarDisable={!taskSub.saved}
            />
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
        <Calendar onSelect={this.selectDateHandler}
                  picker={true}
                  dialog={this.state.dialog.open}
                  onClose={this.dialogClose}
                  disabled={this.state.dialog.disabled}
                  loading={this.state.dialog.loading}
                  onAgree={this.dialogAgree}
                  onDisagree={this.dialogClose}/>
      </>
    )
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    saveTaskInProject: (id: string, task: TaskModel, parentIndex: number = null, subIndex: number = null) => dispatch<any>(saveTaskInProject(
      id,
      task,
      parentIndex,
      subIndex
    )),
  }
}

export default connect(null, mapDispatchToProps)(TaskList)