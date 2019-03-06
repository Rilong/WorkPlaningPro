import * as React from 'react'
import {Editor, EditorState, ContentState, RichUtils, convertFromHTML} from 'draft-js'
import {Card, Fab} from '@material-ui/core'
import FormatBoldIcon from '@material-ui/icons/FormatBoldRounded'
import FormatItalicIcon from '@material-ui/icons/FormatItalicRounded'
import FormatUnderlineIcon from '@material-ui/icons/FormatUnderlinedRounded'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'

import './styles.scss'
import {inlineStyle} from '../../types/textEditor'

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

  private editorRef: Editor

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

  private isCurrentInlineStyle(style: inlineStyle) {
    return this.state.editor.getCurrentInlineStyle().has(style)
  }

  private setInlineStyle = (style: inlineStyle) => {
    this.onChangeHandler(RichUtils.toggleInlineStyle(this.state.editor, style))
  }

  private focus = () => {
    this.editorRef.focus()
  }

  private onChangeHandler = (editorState: EditorState) => {
    // console.log(editorState.getCurrentContent().getBlocksAsArray())
    this.setState({editor: editorState})
  }

  private onFocusHandler = (event: React.SyntheticEvent) => this.setState({isFocused: true})
  private onBlurHandler = (event: React.SyntheticEvent) => this.setState({isFocused: false})

  public render(): React.ReactNode {
    const btnClassName = 'TxEditor-toolbar-btn'
    let textFieldClassName = 'TxEditor-textField'
    let boldClassName = btnClassName
    let italicClassName = btnClassName
    let underlineClassName = btnClassName
    
    if (this.isCurrentInlineStyle('BOLD')) {
      boldClassName += ' active'
    }
    
    if (this.isCurrentInlineStyle('ITALIC')) {
      italicClassName += ' active'
    }
    
    if (this.isCurrentInlineStyle('UNDERLINE')) {
      underlineClassName += ' active'
    }
    
    

    if (this.state.isFocused) {
      textFieldClassName += ' focused'
    }

    return (
      <div className="TxEditor" onFocus={this.focus}>
        <Card className="TxEditor-toolbar">
          <Fab color="primary"
               size="small"
               className={boldClassName}
               onClick={() => this.setInlineStyle('BOLD')}><FormatBoldIcon/></Fab>
          <Fab color="primary"
               size="small"
               className={italicClassName}
               onClick={() => this.setInlineStyle('ITALIC')}><FormatItalicIcon/></Fab>
          <Fab color="primary"
               size="small"
               className={underlineClassName}
               onClick={() => this.setInlineStyle('UNDERLINE')}><FormatUnderlineIcon/></Fab>

          <Fab color="primary" size="small" className="TxEditor-toolbar-btn"><FormatAlignLeftIcon/></Fab>
          <Fab color="primary" size="small" className="TxEditor-toolbar-btn"><FormatAlignCenterIcon/></Fab>
          <Fab color="primary" size="small" className="TxEditor-toolbar-btn"><FormatAlignRightIcon/></Fab>
        </Card>
        <div className={textFieldClassName} onClick={this.focus}>
          <Editor editorState={this.state.editor}
                  onChange={this.onChangeHandler}
                  placeholder={this.props.placeholder}
                  onFocus={this.onFocusHandler}
                  onBlur={this.onBlurHandler}
                  ref={(ref: Editor) => this.editorRef = ref}/>
        </div>
      </div>
    )
  }
}

export default TextEditor