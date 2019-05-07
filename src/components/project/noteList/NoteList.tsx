import * as React from 'react'
import {Fab, Typography} from '@material-ui/core'
import NoteModel from '../../../models/Note'
import TextEditorModel from '../../../models/TextEditor'
import Note from '../../note/Note'
import TextEditor from '../../textEditor/TextEditor'
import AddIcon from '@material-ui/icons/Add'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {addNoteInProject} from '../../../store/actions/project/actions'

interface IProps {
  notes: NoteModel[]
  projectId: string
  addNote: (content: string, projectId: string) => Promise<void>
  onLoad: () => void
}

interface IState {
  loading: boolean
  model: TextEditorModel
}

class NoteList extends React.Component<IProps, IState> {

  public state = {
    loading: false,
    model: null
  }

  private changeTextEditor = (model: TextEditorModel) => {
    if (model.html !== '<p><br></p>') {
      this.setState({model})
    } else {
      this.setState({model: null})
    }
  }

  private addNote = () => {
    if (this.state.model !== null) {
      this.setLoading()
      this.props.addNote(this.state.model.html, this.props.projectId)
        .then(() => {
          this.setUnloading()
          this.props.onLoad()
        })
        .catch(() => this.setUnloading())
    }
  }

  private editNote = (content: any) => {
    /**/
  }

  private removeNote = (index: number) => {
    /**/
  }

  private setLoading = () => {
    this.setState({loading: true})
  }

  private setUnloading = () => {
    this.setState({loading: false})
  }

  private noteList = () => {
    if (this.props.notes.length > 0) {
      return this.props.notes.map((note: NoteModel, index: number) => (
        <Note key={`note-${index}`}
              content={note.content}
              onEdit={this.editNote}
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
        <TextEditor onChange={this.changeTextEditor} className="pjTextEditor"/>
        <Fab color="primary"
             variant="extended"
             size="small"
             disabled={this.state.model === null || this.state.loading}
             className="pjNotesAdd"
             onClick={this.addNote}><AddIcon/> Добавить
          примечание</Fab>
      </>
    )
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    addNote: (content: string, projectId: string) => dispatch<any>(addNoteInProject(content, projectId))
  }
}

export default connect(null, mapDispatchToProps)(NoteList)