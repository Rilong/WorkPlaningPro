import * as React from 'react'
import {Fab, Typography} from '@material-ui/core'
import NoteModel from '../../../models/Note'
import Note from '../../note/Note'
import TextEditor from '../../textEditor/TextEditor'
import AddIcon from '@material-ui/icons/Add'

interface IProps {
  notes: NoteModel[]
  projectId: string
}

class NoteList extends React.Component<IProps> {

  private editNote = (content: string) => {
    /**/
  }

  private removeNote = (index: number) => {
    /**/
  }

  private noteList = () => {
    if (this.props.notes.length > 0) {
      return this.props.notes.map((note: NoteModel, index: number) => (
        <Note content={note.content} onEdit={this.editNote}
              onRemove={() => this.removeNote(index)}/>
      ))
    }

    return null
  }

  public render() {
    return (
      <>
        <Typography variant="h6" align="center" className="pj-mb">Примечания</Typography>
        {this.noteList()}
        <TextEditor onChange={(model) => console.log(model)} className="pjTextEditor"/>
        <Fab color="primary" variant="extended" size="small" className="pjNotesAdd"><AddIcon/> Добавить
          примечание</Fab>
      </>
    )
  }
}

export default NoteList