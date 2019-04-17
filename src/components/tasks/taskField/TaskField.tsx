import * as React from 'react'
import {Typography, TextField} from '@material-ui/core'

interface IProps {
  autofocus?: boolean
  value: string
  onFocus?: () => void
  onFocusLost?: () => void
  change?: (value: string) => void
  loading?: boolean
}

interface IState {
  inputShowed: boolean
}

class TaskField extends React.Component<IProps, IState> {

  private input = React.createRef<HTMLInputElement>()

  public state = {
    inputShowed: false
  }

  public static defaultProps = {
    autofocus: false,
    loading: false,
    onFocus: () => {/* */},
    onFocusLost: () => {/* */},
    change: () => {/* */}
  }

  public componentDidMount() {
    if (!this.props.value) {
      this.makeFocus()
    }
  }

  private focusLost = () => {
    if (this.input.current.value.trim().length > 0) {
      this.setState({inputShowed: false})
      this.props.onFocusLost()
    }
  }

  private makeFocus = () => {
    this.setState({inputShowed: true})
    this.props.onFocus()
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
        {this.state.inputShowed !== true || this.props.loading === true
         ? <Typography variant="body1" onClick={this.makeFocus} style={{cursor: 'pointer'}}>{this.props.value}</Typography>
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