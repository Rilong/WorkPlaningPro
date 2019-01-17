import * as React from 'react'
import {Typography, TextField} from '@material-ui/core'

interface IProps {
  change?: (value: string) => void
}

interface IState {
  inputShowed: boolean
  value: string
}

class TaskField extends React.Component<IProps, IState> {

  private input = React.createRef<HTMLInputElement>();

  public state = {
    inputShowed: true,
    value: ''
  }

  public componentDidMount(): void {
    this.input.current.focus()
  }

  private onInputHandler = (value: string) => {
    this.props.change(value)
    this.setState({...this.state, value})
  }

  private focusLost = () => {
    this.setState({...this.state, inputShowed: false})
  }

  private onFocusHandler = () => {
    this.setState({...this.state, inputShowed: true})
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
         ? <Typography variant="body1" onClick={this.onFocusHandler}>{this.state.value}</Typography>
         : <TextField placeholder="Введите название задачи"
                      value={this.state.value}
                      inputRef={this.input}
                      onChange={(e: any) => this.onInputHandler(e.target.value)}
                      onBlur={this.focusLost}
                      onKeyPress={this.onEnterHandler}
                      fullWidth={true}/>
        }
      </React.Fragment>
    )
  }
}

export default TaskField