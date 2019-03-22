import * as React from 'react'
import {Card, CardContent, CardActions, Fab, Grid, Divider} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import RemoveIcon from '@material-ui/icons/Delete'

import './styles.scss'
import TextEditor from '../textEditor/TextEditor'
import TextEditorModel from '../../models/TextEditor'

interface IProps {
  content: string
  onEdit: (html: string) => void
  onRemove: () => void
}

interface IState {
  edit: boolean
}

class Note extends React.Component<IProps, IState> {

  public state:IState = {
    edit: false
  }

  private editToggle = () => this.setState({edit: !this.state.edit})

  private editorChangeHandler = (model: TextEditorModel) => {
    this.props.onEdit(model.html)
  }

  private contentRender(): React.ReactNode {
    const {content} = this.props

    return <div className="Note-content" dangerouslySetInnerHTML={{__html: content}}/>
  }

  private editRender(): React.ReactNode {
    const {content} = this.props

    return <TextEditor value={content} onChange={this.editorChangeHandler}/>
  }

  public render(): React.ReactNode {

    return (
      <>
        <Card className="Note">
          <CardContent>
            {!this.state.edit ? this.contentRender() : this.editRender()}
          </CardContent>
          <Divider/>
          <CardActions>
            <Grid container={true} justify="flex-end">
              <Fab size="small" color="primary" onClick={this.editToggle}><EditIcon/></Fab>
              <Fab size="small" color="primary"><RemoveIcon/></Fab>
            </Grid>
          </CardActions>
        </Card>
      </>
    )
  }
}

export default Note