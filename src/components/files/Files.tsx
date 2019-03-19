import * as React from 'react'
import {Card, CardContent, Typography} from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'

import './styles.scss'

interface IProps {
  children: React.ReactNode
}

interface IState {
  drag: boolean
}

class Files extends React.Component<IProps, IState> {

  public state: IState = {
    drag: true
  }

  private uploadContent(): React.ReactNode {
    return (
      <>
        <CloudUploadIcon className="Fls-uploadIcon"/>
        <Typography variant="h6" className="Fls-drop-heading">Перетащите сюда файл</Typography>
      </>
    )
  }

  private filesContent(): React.ReactNode {
    return (
      <>
        {this.props.children}
      </>
    )
  }

  public render(): React.ReactNode {
    const cardClassName = 'Fls' + (this.state.drag ? ' dragging': '')
    return (
      <>
        <Card className={cardClassName}>
          <CardContent>
            {this.state.drag ? this.uploadContent() : this.filesContent()}
          </CardContent>
        </Card>
      </>
    )
  }
}

export default Files