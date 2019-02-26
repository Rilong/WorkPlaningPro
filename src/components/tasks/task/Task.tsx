import * as React from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {Card, Checkbox, Fab, Grid, Typography} from '@material-ui/core'
import TaskField from '../taskField/TaskField'
import CloseIcon from '@material-ui/icons/Close'
import CalendarIcon from '@material-ui/icons/CalendarTodayRounded'

import './styles.scss'
import './animation.css'

interface IProps {
  value: string
  className?: string
  onChange?: (value: string) => void
  onRemove?: () => void
  onDatelinePicker?: () => void
  checked?: boolean
  checkDisable?: boolean
  onCheckChange?: () => void
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
    let cssClass = ''

    if (typeof this.props.className !== 'undefined') {
      cssClass = ` ${this.props.className}`
    }

    return (
      <Card className={`task${cssClass}`} onMouseEnter={this.cardEnter} onMouseLeave={this.cardLeave}>
        <div className="controls">
          {typeof this.props.checked !== 'undefined'
            ? <Checkbox color="primary"
                        classes={{root: 'checkRoot'}}
                        checked={this.props.checked}
                        onChange={this.props.onCheckChange}
                        disabled={typeof this.props.checkDisable === 'undefined' ? false : this.props.checkDisable}/> : null}

          <Grid container={true} alignItems="center" justify="space-between">
            <Grid item={true} xs={10} style={{paddingRight: '10px'}}>
              <TaskField value={this.props.value}
                         change={this.props.onChange}/>
              <Typography variant="body2" className="dateText">20.02.2019</Typography>
            </Grid>
            <Grid item={true} xs={2} className="controlsRoot">
              <TransitionGroup>
                {this.state.showControls ?
                      <CSSTransition classNames="fade" timeout={300}>
                        <div>
                          <Fab color="primary" size="small" style={{marginRight: '10px'}} onClick={this.props.onDatelinePicker}><CalendarIcon/></Fab>
                          <Fab color="primary" size="small" onClick={this.props.onRemove}><CloseIcon/></Fab>
                        </div>
                      </CSSTransition>
                     : null
                }
              </TransitionGroup>
            </Grid>
          </Grid>
        </div>
      </Card>
    )
  }
}

export default Task