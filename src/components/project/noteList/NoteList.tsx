import * as React from 'react'
import {Fab, Typography} from '@material-ui/core'
import NoteModel from '../../../models/Note'
import TextEditorModel from '../../../models/TextEditor'
import Note from '../../note/Note'
import TextEditor from '../../textEditor/TextEditor'
import AddIcon from '@material-ui/icons/Add'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {addNoteInProject, getProjectIndexById, removeNoteInProject} from '../../../store/actions/project/actions'
import {updateNotesInProject} from '../../../store/actions/project-list/actions'

interface IProps {
  notes: NoteModel[]
  projectId: string
  addNote: (content: string, projectId: string) => Promise<void>
  removeNote: (index: number, projectId: string) => Promise<void>
  updateNotes: (notes: NoteModel[], index: number) => void
  getProjectIndexById: (projectId: string) => number
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
    this.props.removeNote(index, this.props.projectId)
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
    addNote: (content: string, projectId: string) => dispatch<any>(addNoteInProject(content, projectId)),
    removeNote: (index: number, projectId: string) => dispatch<any>(removeNoteInProject(index, projectId)),
    updateNotes: (notes: NoteModel[], index: number) => dispatch<any>(updateNotesInProject(notes, index)),
    getProjectIndexById: (projectId: string) => dispatch<any>(getProjectIndexById(projectId))
  }
}

export default connect(null, mapDispatchToProps)(NoteList)