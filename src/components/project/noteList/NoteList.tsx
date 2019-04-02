import * as React from 'react'
import {Fab, Typography} from '@material-ui/core'
import Note from '../../note/Note'
import TextEditor from '../../textEditor/TextEditor'
import AddIcon from '@material-ui/icons/Add'

class NoteList extends React.Component {
  public render() {
    return (
      <>
        <Typography variant="h6" align="center" className="pj-mb">Примечания</Typography>
        <Note content={'<b>dsd</b>'} onEdit={(content: string) => console.log(content)}
              onRemove={() => null}/>

        <TextEditor onChange={(model) => console.log(model)} className="pjTextEditor"/>
        <Fab color="primary" variant="extended" size="small" className="pjNotesAdd"><AddIcon/> Добавить
          примечание</Fab>
      </>
    )
  }
}

export default NoteList