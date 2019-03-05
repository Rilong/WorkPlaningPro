import * as React from 'react'
import {Editor, EditorState, ContentState, convertFromHTML} from 'draft-js'
import {Card, Fab} from '@material-ui/core'
import FormatBoldIcon from '@material-ui/icons/FormatBoldRounded'
import FormatItalicIcon from '@material-ui/icons/FormatItalicRounded'
import FormatUnderlineIcon from '@material-ui/icons/FormatUnderlinedRounded'
import './styles.scss'

interface IProps {
  value?: string
  onChange?: (value:  string) => void
  placeholder?: string
}

interface IState {
  editor: EditorState
  isFocused: boolean
}

class TextEditor extends React.Component<IProps, IState> {

  public static defaultProps:IProps = {
    value: null,
    placeholder: ''
  }

  public constructor(props: IProps) {
    super(props)

    let editorState: EditorState = null

    if (props.value !== null) {
      const blocksFromHtml = convertFromHTML(props.value)
      const content = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks, blocksFromHtml.entityMap)

      editorState = EditorState.createWithContent(content)
    } else {
      editorState = EditorState.createEmpty()
    }

    this.state = {
      editor: editorState,
      isFocused: false
    }
  }

  private onChangeHandler = (editorState: EditorState) => {
    // console.log(editorState.getCurrentContent().getBlocksAsArray())
    this.setState({editor: editorState})
  }

  private onFocusHandler = (event: React.SyntheticEvent) => this.setState({isFocused: true})
  private onBlurHandler = (event: React.SyntheticEvent) => this.setState({isFocused: false})


  public render(): React.ReactNode {
    let textFieldClassName = 'TxEditor-textField'

    if (this.state.isFocused) {
      textFieldClassName += ' focused'
    }

    return (
      <div className="TxEditor">
        <Card className="TxEditor-toolbar">
          <Fab color="primary" size="small" className="TxEditor-toolbar-btn"><FormatBoldIcon/></Fab>
          <Fab color="primary" size="small" className="TxEditor-toolbar-btn"><FormatItalicIcon/></Fab>
          <Fab color="primary" size="small" className="TxEditor-toolbar-btn"><FormatUnderlineIcon/></Fab>
        </Card>
        <div className={textFieldClassName}>
          <Editor editorState={this.state.editor}
                  onChange={this.onChangeHandler}
                  placeholder={this.props.placeholder}
                  onFocus={this.onFocusHandler}
                  onBlur={this.onBlurHandler}/>
        </div>
      </div>
    )
  }
}

export default TextEditor