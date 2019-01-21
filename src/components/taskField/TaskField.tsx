import * as React from 'react'
import {Typography, TextField} from '@material-ui/core'

interface IProps {
  autofocus?: boolean
  value: string
  change?: (value: string) => void
}

interface IState {
  inputShowed: boolean
}

class TaskField extends React.Component<IProps, IState> {

  private input = React.createRef<HTMLInputElement>();

  public state = {
    inputShowed: true,
  }

  public static defaultProps = {
    autofocus: false
  }

  private focusLost = () => {
    this.setState({inputShowed: false})
  }

  private onFocusHandler = () => {
    this.setState({inputShowed: true})
    setTimeout(() => this.input.current.focus(), 50)
  }

  private onEnterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      this.focusLost()
    }
  }

  public render(): React.ReactNode {
    return (
      <React.Fragment>
        {this.state.inputShowed !== true
         ? <Typography variant="body1" onClick={this.onFocusHandler} style={{cursor: 'pointer'}}>{this.props.value}</Typography>
         : <TextField placeholder="Введите название задачи"
                      autoFocus={this.props.autofocus}
                      value={this.props.value || ''}
                      onChange={(e: any) => this.props.change(e.target.value)}
                      inputRef={this.input}
                      onBlur={this.focusLost}
                      onKeyPress={this.onEnterHandler}
                      fullWidth={true}/>
        }
      </React.Fragment>
    )
  }
}

export default TaskField