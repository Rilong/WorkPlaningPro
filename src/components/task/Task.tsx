import * as React from 'react';
import {Card, Checkbox, Fab, Grid, Typography} from '@material-ui/core';
import TaskField from '../taskField/TaskField';
import {IStyles, styles} from './styles'
import withStyles from "@material-ui/core/styles/withStyles";
import CloseIcon from '@material-ui/icons/Close'
import CalendarIcon from '@material-ui/icons/CalendarTodayRounded'

interface IProps {
  value: string
  onChange?: (value: string) => void
  onRemove?: () => void
  onDatelinePicker?: () => void,
  checked?: boolean
  checkDisable?: boolean
  onCheckChange?: () => void
  classes?: IStyles
}


const Task = (props: IProps) => (
  <Card className={props.classes.task}>
    <div className={props.classes.controls}>
      {typeof props.checked !== 'undefined'
        ? <Checkbox color="primary"
                    classes={{root: props.classes.checkRoot}}
                    checked={props.checked}
                    onChange={props.onCheckChange}
                    disabled={typeof props.checkDisable === 'undefined' ? false : props.checkDisable}/> : null}

      <Grid container={true} alignItems="center" justify="space-between">
        <Grid item={true} xs={10} style={{paddingRight: '10px'}}>
          <TaskField value={props.value}
                     change={props.onChange}/>
          <Typography variant="body2" className={props.classes.dateText}>20.02.2019</Typography>
        </Grid>
        <Grid item={true} xs={2}>
          <Fab color="primary" size="small" style={{marginRight: '10px'}} onClick={props.onDatelinePicker}><CalendarIcon/></Fab>
          <Fab color="primary" size="small" onClick={props.onRemove}><CloseIcon/></Fab>
        </Grid>
      </Grid>
    </div>
  </Card>
)

export default withStyles(styles)(Task)