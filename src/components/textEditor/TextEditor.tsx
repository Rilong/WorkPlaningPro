import * as React from 'react'
import {
  ContentState,
  convertFromHTML,
  convertToRaw,
  DefaultDraftBlockRenderMap,
  Editor,
  EditorState,
  RichUtils
} from 'draft-js'
import {stateToHTML} from 'draft-js-export-html'
import * as Immutable from 'immutable'
import {Card, Fab} from '@material-ui/core'
import Align from './blocks/Align/Align'
import FormatBoldIcon from '@material-ui/icons/FormatBoldRounded'
import FormatItalicIcon from '@material-ui/icons/FormatItalicRounded'
import FormatUnderlineIcon from '@material-ui/icons/FormatUnderlinedRounded'
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft'
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter'
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
import ListIcon from '@material-ui/icons/List'
import TextEditorModel from '../../models/TextEditor'

import './styles.scss'
import {blockType, inlineStyle} from '../../types/textEditor'

interface IProps {
  editorState?: EditorState
  value?: string
  onChangeState?: (editorState: EditorState) => void
  onChange?: (model: TextEditorModel) => void
  className?: string
  placeholder?: string
}

interface IState {
  editor: EditorState
  isFocused: boolean
}

class TextEditor extends React.Component<IProps, IState> {

  public static defaultProps:IProps = {
    editorState: null,
    onChangeState: () => {/**/},
    value: null,
    placeholder: '',
    className: null
  }

  private editorRef: Editor

  private blockRenderMap: any = DefaultDraftBlockRenderMap.merge(
    Immutable.Map({
      'align-left': {
        wrapper: <Align align="left"/>
      },
      'align-center': {
        wrapper: <Align align="center"/>
      },
      'align-right': {
        wrapper: <Align align="right"/>
      }
    })
  )

  public constructor(props: IProps) {
    super(props)

    let editorState: EditorState = null

    if (props.value !== null) {
      const blocksFromHtml = convertFromHTML(props.value)
      const content = ContentState.createFromBlockArray(blocksFromHtml.contentBlocks, blocksFromHtml.entityMap)

      editorState = EditorState.createWithContent(content)
    } else {
      if (props.editorState === null) {
        editorState = EditorState.createEmpty()
      }
    }

    this.state = {
      editor: editorState,
      isFocused: false
    }
  }

  private getEditorState() : EditorState {
    return this.props.editorState ? this.props.editorState : this.state.editor
  }

  private isCurrentInlineStyle(style: inlineStyle) {
    const editorState = this.getEditorState()
    return editorState.getCurrentInlineStyle().has(style)
  }

  private isCurrentBlockType(type: blockType) {
    const editorState = this.getEditorState()
    const selection = editorState.getSelection()
    const blockTypeSelection = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()

    return blockTypeSelection === type
  }

  public shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
    const oldEditorState = this.getEditorState()
    const nextEditorState = nextProps.editorState ? nextProps.editorState : nextState.editor

    const oldHtml = this.toHtml(oldEditorState.getCurrentContent())
    const nextHtml = this.toHtml(nextEditorState.getCurrentContent())

    if (oldHtml !== nextHtml || this.state.isFocused !== nextState.isFocused) {
      return true
    }

    return false
  }

  private setInlineStyle = (style: inlineStyle) => {
    this.onChangeHandler(RichUtils.toggleInlineStyle(this.getEditorState(), style))
  }

  private setBlockType = (type: blockType) => {
    this.onChangeHandler(RichUtils.toggleBlockType(this.getEditorState(), type))
  }

  private focus = () => {
    this.editorRef.focus()
  }

  private onChangeHandler = (editorState: EditorState) => {

    const contentState = editorState.getCurrentContent()
    const html = this.toHtml(contentState)
    const raw = JSON.stringify(convertToRaw(contentState))
    this.props.onChange(new TextEditorModel(raw, html))

    if (this.props.editorState) {
      this.props.onChangeState(editorState)
    } else {
      this.setState({editor: editorState})
    }
  }

  private onFocusHandler = (event: React.SyntheticEvent) => this.setState({isFocused: true})
  private onBlurHandler = (event: React.SyntheticEvent) => this.setState({isFocused: false})

  private toHtml(contentState: ContentState) {
    const options = {
      blockRenderers: {
        'align-left': (block) => {
          return '<div style="text-align: left">' + escape(block.getText()) + '</div>'
        },
        'align-center': (block) => {
          return '<div style="text-align: center">' + escape(block.getText()) + '</div>'
        },
        'align-right': (block) => {
          return '<div style="text-align: right">' + escape(block.getText()) + '</div>'
        }
      }
    }

    return stateToHTML(contentState, options)
  }

  public render(): React.ReactNode {
    let textFieldClassName = 'TxEditor-textField'

    const mainClassName = 'TxEditor' + (this.props.className !== null ? ` ${this.props.className}` : '')
    const btnClassName = 'TxEditor-toolbar-btn'
    const boldClassName = btnClassName + (this.isCurrentInlineStyle('BOLD') ? ' active' : '')
    const italicClassName = btnClassName + (this.isCurrentInlineStyle('ITALIC') ? ' active' : '')
    const underlineClassName = btnClassName + (this.isCurrentInlineStyle('UNDERLINE') ? ' active' : '')

    const alignLeftClassName = btnClassName + (this.isCurrentBlockType('align-left')  ? ' active' : '')
    const alignCenterClassName = btnClassName + (this.isCurrentBlockType('align-center')  ? ' active' : '')
    const alignRightClassName = btnClassName + (this.isCurrentBlockType('align-right')  ? ' active' : '')
    const listClassName = btnClassName + (this.isCurrentBlockType('ordered-list-item')  ? ' active' : '')

    if (this.state.isFocused) {
      textFieldClassName += ' focused'
    }

    return (
      <div className={mainClassName} onFocus={this.focus}>
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

          <Fab color="primary"
               size="small"
               className={alignLeftClassName}
               onClick={() => this.setBlockType('align-left')}><FormatAlignLeftIcon/></Fab>
          <Fab color="primary"
               size="small"
               className={alignCenterClassName}
               onClick={() => this.setBlockType('align-center')}><FormatAlignCenterIcon/></Fab>
          <Fab color="primary"
               size="small"
               className={alignRightClassName}
               onClick={() => this.setBlockType('align-right')}><FormatAlignRightIcon/></Fab>

          <Fab color="primary"
               size="small"
               className={listClassName}
               onClick={() => this.setBlockType('ordered-list-item')}><ListIcon/></Fab>
        </Card>

        <div className={textFieldClassName} onClick={this.focus}>
          <Editor editorState={this.getEditorState()}
                  placeholder={this.props.placeholder}
                  blockRenderMap={this.blockRenderMap}
                  onChange={this.onChangeHandler}
                  onFocus={this.onFocusHandler}
                  onBlur={this.onBlurHandler}
                  ref={(ref: Editor) => this.editorRef = ref}/>
        </div>
      </div>
    )
  }
}

export default TextEditor