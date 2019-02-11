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

interface IState {
  showControls: boolean
}

class Task extends React.Component<IProps, IState> {
  public state = {
    showControls: false
  }

  private cardEnter = () => this.setState({showControls: true})
  private cardLeave = () => this.setState({showControls: false})

  public render(): React.ReactNode {
    return (
      <Card className={this.props.classes.task} onMouseEnter={this.cardEnter} onMouseLeave={this.cardLeave}>
        <div className={this.props.classes.controls}>
          {typeof this.props.checked !== 'undefined'
            ? <Checkbox color="primary"
                        classes={{root: this.props.classes.checkRoot}}
                        checked={this.props.checked}
                        onChange={this.props.onCheckChange}
                        disabled={typeof this.props.checkDisable === 'undefined' ? false : this.props.checkDisable}/> : null}

          <Grid container={true} alignItems="center" justify="space-between">
            <Grid item={true} xs={10} style={{paddingRight: '10px'}}>
              <TaskField value={this.props.value}
                         change={this.props.onChange}/>
              <Typography variant="body2" className={this.props.classes.dateText}>20.02.2019</Typography>
            </Grid>
            <Grid item={true} xs={2} className={this.props.classes.controlsRoot}>
              {this.state.showControls ?
                  <>
                    <Fab color="primary" size="small" style={{marginRight: '10px'}} onClick={this.props.onDatelinePicker}><CalendarIcon/></Fab>
                    <Fab color="primary" size="small" onClick={this.props.onRemove}><CloseIcon/></Fab>
                  </> : null
              }
            </Grid>
          </Grid>
        </div>
      </Card>
    )
  }
}

export default withStyles(styles)(Task)