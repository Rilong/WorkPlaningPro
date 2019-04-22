import * as React from 'react'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import {Card, Checkbox, Fab, Grid, LinearProgress, Typography} from '@material-ui/core'
import TaskField from '../taskField/TaskField'
import CloseIcon from '@material-ui/icons/Close'
import CalendarIcon from '@material-ui/icons/CalendarTodayRounded'
import AddIcon from '@material-ui/icons/Add'

import './styles.scss'
import './animation.css'

interface IProps {
  value: string
  className?: string
  onChange?: (value: string) => void
  onRemove?: () => void
  onSubAdd?: () => void
  onDatelinePicker?: () => void
  onFocus: () => void
  onFocusLost: () => void
  checked?: boolean
  checkDisable?: boolean
  onCheckChange?: () => void
  children?: React.ReactNode[]
  sub?: boolean
  progress?: number
  loading: boolean
}

interface IState {
  showControls: boolean
}

class Task extends React.Component<IProps, IState> {
  public state = {
    showControls: false
  }

  public static defaultProps = {
    className: null,
    checked: null,
    children: null,
    checkDisable: false,
    sub: false,
    progress: 0,
    loading: false,
    onFocus: () => {/* */},
    onFocusLost: () => {/* */},
    onSubAdd: () => {/* */}
  }

  public shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {


    if (nextProps.children !== null) {
      if (nextProps.children.length > 0) {
        return true
      }
    }

    if (nextProps.value !== this.props.value ||
        nextProps.loading !== this.props.loading ||
        nextProps.progress !== this.props.progress ||
        nextProps.checked !== this.props.checked ||
        nextProps.checkDisable !== this.props.checkDisable ||
        nextProps.sub !== this.props.sub ||
        nextState.showControls !== this.state.showControls) {
      return true
    }

    return false
  }

  private cardEnter = () => this.setState({showControls: true})
  private cardLeave = () => this.setState({showControls: false})

  private isExistsSubs() {
    return this.props.children !== null && this.props.children.length > 0
  }

  private checkRender() {
    if (this.props.checked !== null) {
      return (
        <Checkbox color="primary"
                  classes={{root: 'checkRoot'}}
                  checked={this.props.checked}
                  onChange={this.props.onCheckChange}
                  disabled={this.props.checkDisable}/>
      )
    }
    return null
  }

  private addSubButtonRender() {
    if (!this.props.sub) {
      return (
        <Fab color="primary"
             size="small"
             style={{marginRight: '10px'}}
             onClick={this.props.onSubAdd}
             disabled={this.props.loading}><AddIcon/></Fab>
      )
    }
    return null
  }

  private progressRender() {
    if (!this.props.loading) {
      if (!this.props.sub && this.isExistsSubs()) {
        return <LinearProgress variant="determinate" value={this.props.progress}/>
      }
      return null
    } else {
      return <LinearProgress color="secondary" />
    }
  }

  public render(): React.ReactNode {
    let cssClass = ''

    if (this.props.className !== null) {
      cssClass = ` ${this.props.className}`
    }

    const {sub} = this.props

    return (
      <>
        <Card className={`task${cssClass}`}>
          <div className="controls" onMouseEnter={this.cardEnter} onMouseLeave={this.cardLeave}>
            {this.checkRender()}
            <Grid container={true} alignItems="center" justify="space-between">
              <Grid item={true} xs={!sub ? 9 : 10} style={{paddingRight: '10px'}}>

                <TaskField value={this.props.value}
                           change={this.props.onChange}
                           loading={this.props.loading}
                           onFocus={this.props.onFocus}
                           onFocusLost={this.props.onFocusLost}/>
                <Typography variant="body2" className="dateText">20.02.2019</Typography>

              </Grid>
              <Grid item={true} xs={!sub ? 3 : 2} className="controlsRoot">
                <TransitionGroup>
                  {this.state.showControls ?
                    <CSSTransition classNames="fade" timeout={300}>
                      <div>
                        {this.addSubButtonRender()}
                        <Fab color="primary"
                             size="small"
                             style={{marginRight: '10px'}}
                             onClick={this.props.onDatelinePicker}
                             disabled={this.props.loading}><CalendarIcon/></Fab>
                        <Fab color="primary"
                             size="small"
                             onClick={this.props.onRemove}
                             disabled={this.props.loading}><CloseIcon/></Fab>
                      </div>
                    </CSSTransition>
                    : null
                  }
                </TransitionGroup>
              </Grid>
            </Grid>
          </div>
          {this.progressRender()}
        </Card>
        {this.isExistsSubs() ? <div className="tasksSubs">{this.props.children}</div> : null}
      </>
    )
  }
}

export default Task