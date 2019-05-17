import * as React from 'react'
import {EditorState, ContentState} from 'draft-js'
import {Fab, Typography} from '@material-ui/core'
import NoteModel from '../../../models/Note'
import TextEditorModel from '../../../models/TextEditor'
import Note from '../../note/Note'
import TextEditor from '../../textEditor/TextEditor'
import AddIcon from '@material-ui/icons/Add'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {
  addNoteInProject,
  editNoteInProject,
  getProjectIndexById,
  removeNoteInProject
} from '../../../store/actions/project/actions'
import {updateNotesInProject} from '../../../store/actions/project-list/actions'

interface IProps {
  notes: NoteModel[]
  projectId: string
  addNote: (content: string, projectId: string) => Promise<void>
  removeNote: (index: number, projectId: string) => Promise<void>
  editNoteInProject: (note: NoteModel, index: number, projectId: string) => Promise<void>
  updateNotes: (notes: NoteModel[], index: number) => void
  getProjectIndexById: (projectId: string) => number
  onLoad: () => void
}

interface IState {
  loading: boolean
  model: TextEditorModel,
  editor: EditorState
}

class NoteList extends React.Component<IProps, IState> {

  constructor(props: Readonly<IProps>) {
    super(props)

    this.state = {
      loading: false,
      model: null,
      editor: EditorState.createEmpty()
    }
  }

  private setEditorState = (editorState: EditorState) => {
    this.setState({editor: editorState})
  }

  private clearEditorState() {
    const editorState = EditorState.push(this.state.editor, ContentState.createFromText(''), 'remove-range')
    this.setState({editor: editorState})

  }

  private changeTextEditor = (model: TextEditorModel) => {
    if (model.html !== '<p><br></p>') {
      this.setState({model})
    } else {
      this.setState({model: null})
    }
  }

  private updateNoteInStore = (note: NoteModel, index: number) => {
    const {projectId} = this.props
    const projectIndex = this.props.getProjectIndexById(projectId)
    const notes = [...this.props.notes]
    notes[index] = note

    this.props.updateNotes(notes, projectIndex)
    this.props.onLoad()
  }

  private addNote = () => {
    if (this.state.model !== null) {
      this.setLoading()
      this.props.addNote(this.state.model.html, this.props.projectId)
        .then(() => {
          this.setUnloading()
          this.clearEditorState()
          this.props.onLoad()
        })
        .catch(() => this.setUnloading())
    }
  }

  private editNote = (index: number, content: any) => {
    const note: NoteModel = [...this.props.notes][index]
    note.editedContent = content
    this.updateNoteInStore(note, index)
  }

  private editSaveNote = (index: number) => {
    const note = [...this.props.notes][index]
    console.log(note)
    note.loading = true

    this.updateNoteInStore(note, index)

    this.props.editNoteInProject(note, index, this.props.projectId)
      .then(() => this.props.onLoad())
      .catch(() => this.props.onLoad())
  }

  private removeNote = (index: number) => {
    const note = [...this.props.notes][index]
    note.loading = true

    this.updateNoteInStore(note, index)

    this.props.removeNote(index, this.props.projectId)
      .then(() => this.props.onLoad())
  }

  private onEditToggleHandler = (index: number) => {
    const note = [...this.props.notes][index]
    note.showEdit = !note.showEdit

    this.updateNoteInStore(note, index)
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
              showEdit={note.showEdit}
              onEditToggle={() => this.onEditToggleHandler(index)}
              onEdit={(content: any) => this.editNote(index, content)}
              onSave={() => this.editSaveNote(index)}
              onRemove={() => this.removeNote(index)}
              loading={note.loading}/>
      ))
    }

    return null
  }

  public render() {
    return (
      <>
        <Typography variant="h6" align="center" className="pj-mb">Примечания</Typography>
        {this.noteList()}
        <TextEditor onChange={this.changeTextEditor}
                    editorState={this.state.editor}
                    onChangeState={this.setEditorState}
                    className="pjTextEditor"/>
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
    editNoteInProject: (note: NoteModel, index: number, projectId: string) => dispatch<any>(editNoteInProject(note, index, projectId)),
    updateNotes: (notes: NoteModel[], index: number) => dispatch<any>(updateNotesInProject(notes, index)),
    getProjectIndexById: (projectId: string) => dispatch<any>(getProjectIndexById(projectId))
  }
}

export default connect(null, mapDispatchToProps)(NoteList)