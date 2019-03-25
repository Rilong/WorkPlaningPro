import * as React from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import './style.scss'

interface IProps {
  children: React.ReactNode
}

interface IState {
  dragging: boolean
}

class DropZone extends React.Component<IProps, IState> {
  public state: IState = {
    dragging: false
  }

  private zone = React.createRef<HTMLDivElement>()
  private dragCounter: number = 0

  private dragEnterHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    this.dragCounter++

    this.setState({dragging: true})
  }

  private dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    this.dragCounter--

    if (this.dragCounter === 0) {
      this.setState({dragging: false})
    }
  }

  public render(): React.ReactNode {
    const {children} = this.props

    return (
      <div className="DropZone"
           ref={this.zone}
           onDragEnter={this.dragEnterHandler}
           onDragLeave={this.dragLeaveHandler}>
        <div className="DropZone-content">{children}</div>
            <TransitionGroup>
              {this.state.dragging ? (
                <CSSTransition classNames="DropZoneFade" timeout={300}>
                  <div className="DropZone-overlay"/>
                </CSSTransition>
              ) : null}
            </TransitionGroup>
      </div>
    )
  }
}

export default DropZone