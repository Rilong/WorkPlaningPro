import * as React from 'react'
import {Card, CardContent, CardActions, Fab, Grid, Divider} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import RemoveIcon from '@material-ui/icons/Delete'

import './styles.scss'
import TextEditor from '../textEditor/TextEditor'
import TextEditorModel from '../../models/TextEditor'
import SaveIcon from '@material-ui/icons/SaveAlt'

interface IProps {
  content: string
  showEdit: boolean
  loading?: boolean
  onEdit: (html: string) => void
  onEditToggle: () => void
  onSave: () => void
  onRemove: () => void
}

class Note extends React.Component<IProps> {

  public static defaultProps = {
    loading: false
  }

  private editorChangeHandler = (model: TextEditorModel) => {
    this.props.onEdit(model.html)
  }

  private contentRender(): React.ReactNode {
    const {content} = this.props

    return <div className="Note-content" dangerouslySetInnerHTML={{__html: content}}/>
  }

  private editRender(): React.ReactNode {
    const {content} = this.props

    return (
      <>
        <TextEditor value={content} onChange={this.editorChangeHandler}/>
        <Fab color="primary"
             variant="extended"
             size="small"
             disabled={this.props.loading}
             onClick={this.props.onSave}><SaveIcon/> Сохранить</Fab>
      </>
      )
  }

  public render(): React.ReactNode {

    return (
      <>
        <Card className="Note">
          <CardContent>
            {!this.props.showEdit ? this.contentRender() : this.editRender()}
          </CardContent>
          <Divider/>
          <CardActions>
            <Grid container={true} justify="flex-end">
              <Fab size="small" color="primary" disabled={this.props.loading} onClick={this.props.onEditToggle}><EditIcon/></Fab>
              <Fab size="small" color="primary" disabled={this.props.loading} onClick={this.props.onRemove}><RemoveIcon/></Fab>
            </Grid>
          </CardActions>
        </Card>
      </>
    )
  }
}

export default Note