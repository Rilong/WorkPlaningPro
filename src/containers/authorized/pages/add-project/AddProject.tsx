import * as React from 'react'
import {Grid, Card, TextField, Divider, Button, Typography, withStyles} from '@material-ui/core'
import Input from '../../../../components/input/input'
import Validation from '../../../../validation/validation';
import {IFormControl} from '../../../../validation/interfaces/validation';
import {IStyles, styles} from './styles';
import TaskField from "../../../../components/taskField/TaskField";
import ITask from "../../../../interfaces/projects/Task";

interface IProps {
  classes?: IStyles
}

interface IState {
  hasError: boolean
  formControls: IFormControl
  tasks: ITask[]
}

class AddProject extends React.Component<IProps, IState> {

  public state = {
    hasError: true,
    formControls: {
      'name': Validation.createControlWithDefault('text', 'Имя', {
        required: true
      }),
      'desc': Validation.createControlWithDefault('textarea', 'Описание')
    },
    tasks: []
  }


  private onInputHandler(name: string, value: string) {
    const formControls: IFormControl = {...this.state.formControls};

    formControls[name].touched = true
    formControls[name].value = value
    formControls[name] = Validation.valid(formControls, name)

    this.setState({...this.state, formControls, hasError: Validation.hasErrorForm(formControls)})
  }

  private onFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  private onAddTaskHandler = () => {
    const tasks = this.state.tasks.concat()
    const newTask: ITask = {name: '', deadline: null}
    tasks.push(newTask)

    this.setState({...this.state, tasks})
  }

  private onTaskChangeHandler = (value: string, index: number) => {
    // console.log(value, index)
    const tasks: ITask[] = this.state.tasks.concat()
    tasks[index] = {...tasks[index], name: value}
    this.setState({tasks})
  }

  private renderTaskFields() {
    return this.state.tasks.map((task: ITask, index: number) => (
      <TaskField key={'taskInput' + index}
                 value={task.name}
                 change={(value: string) => this.onTaskChangeHandler(value, index)} />
      )
    )
  }

  public render() {
    return (
      <div>
        <Grid container={true} justify="center">
          <Grid item={true} xs={4}>
            <Card style={{padding: '20px', minHeight: '200px', marginTop: '20px'}}>
              <form onSubmit={this.onFormHandler}>
                <Input type="text"
                       change={(event: any) => this.onInputHandler('name', event.target.value)}
                       name="name"
                       value={this.state.formControls.name.value}
                       label="Имя проекта"
                       errorMessage={this.state.formControls.name.errorMessage}
                       hasError={this.state.formControls.name.hasError}
                       className={this.props.classes.input}
                />
                <TextField placeholder="Описание"
                           multiline={true}
                           fullWidth={true}
                           onChange={(event: any) => this.onInputHandler('desc', event.target.value)}
                           className={this.props.classes.input}/>
                <Divider variant="fullWidth"/>
                <Typography variant="h6" align="center">Задачи</Typography>
                <div>
                  <Button variant="contained" onClick={this.onAddTaskHandler}>Добавить задачу</Button>
                </div>
                {this.renderTaskFields()}
              </form>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AddProject)