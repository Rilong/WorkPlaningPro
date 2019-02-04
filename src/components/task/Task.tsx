import * as React from 'react';
import {Card} from '@material-ui/core';
import TaskField from '../taskField/TaskField';
import {IStyles, styles} from './styles'
import withStyles from "@material-ui/core/styles/withStyles";

interface IProps {
  value: string
  OnChange?: (value: string) => void
  OnRemove?: () => void
  OnDatelinePicker?: () => void,
  classes?: IStyles
}


const Task = (props: IProps) => (
  <Card className={props.classes.task}>
    <TaskField
               value={props.value}
               change={props.OnChange} />
  </Card>
)

export default withStyles(styles)(Task)