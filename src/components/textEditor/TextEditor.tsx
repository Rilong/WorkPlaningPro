import * as React from 'react'
import {Editor, EditorState, ContentState, convertFromHTML} from 'draft-js'

interface IProps {
  value?: string
  onChange?: (value:  string) => void
}

interface IState {
  editor: EditorState
}

class TextEditor extends React.Component<IProps, IState> {

  public static defaultProps:IProps = {
    value: null
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
      editor: editorState
    }
  }

  private changeHandler = (editorState: EditorState) => {
    console.log(editorState.getCurrentContent().getBlocksAsArray())
    this.setState({editor: editorState})
  }

  public render(): React.ReactNode {
    return (
      <div className="TxEditor">
        <Editor editorState={this.state.editor} onChange={this.changeHandler}/>
      </div>
    )
  }
}

export default TextEditor