import * as React from 'react'
import {Typography} from '@material-ui/core'
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
    console.log()
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

  private calculateLabelPos() {
    const scroll = window.scrollY
    return Math.floor(200 + scroll - 3)
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
                  <div className="DropZone-overlay">
                    <div className="DropZone-overlay-label" style={{top: this.calculateLabelPos() + 'px'}}>
                      <Typography variant="h6" className="DropZone-overlay-label-text">Загрузить файл</Typography>
                    </div>
                  </div>
                </CSSTransition>
              ) : null}
            </TransitionGroup>
      </div>
    )
  }
}

export default DropZone