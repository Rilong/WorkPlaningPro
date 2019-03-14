import * as React from 'react'
import {Card, CardContent, CardActions, Fab, Grid} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import RemoveIcon from '@material-ui/icons/Delete'

import './styles.scss'


interface IProps {
  content: string
  onEdit: () => void
  onRemove: () => void
}

interface IState {
  edit: boolean
}

class Note extends React.Component<IProps, IState> {

  public state:IState = {
    edit: false
  }

  public render(): React.ReactNode {
    const {content} = this.props

    return (
      <>
        <Card className="Note">
          <CardContent>
            <div className="Note-content" dangerouslySetInnerHTML={{__html: content}}/>
          </CardContent>
          <CardActions>
            <Grid container={true} justify="flex-end">
              <Fab size="small" color="primary"><EditIcon/></Fab>
              <Fab size="small" color="primary"><RemoveIcon/></Fab>
            </Grid>
          </CardActions>
        </Card>
      </>
    )
  }
}

export default Note