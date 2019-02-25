import * as React from 'react'
import {Dispatch} from 'redux'
import {closeMessage} from '../../store/actions/message/actions'
import {connect} from 'react-redux'
import IconButton from '@material-ui/core/IconButton/IconButton'
import CheckCircle from '@material-ui/icons/CheckCircle'
import Warning from '@material-ui/icons/Warning'
import HighlightOff from '@material-ui/icons/HighlightOff'
import {Snackbar, Typography} from '@material-ui/core'

import './styles.scss'
import messageType from '../../interfaces/messages/MessageType'

interface IProps {
  typeMessage: messageType
  messageOpen?: boolean
  messageClose?: () => void
  messageText?: string,
}

const Message = (props: IProps) => {
  const classPrefix = 'mg'
  let colorClass = ''
  let icon = null

  const handleClose = () => props.messageClose()

  switch (props.typeMessage) {
    case 'success':
      colorClass = `${classPrefix}Success`
      icon = <CheckCircle className="icon"/>
      break
    case 'warning':
      colorClass = `${classPrefix}Warning`
      icon = <Warning className="icon"/>
      break
    case 'danger':
      colorClass = `${classPrefix}Danger`
      icon = <HighlightOff className="icon"/>
      break
    default:
      colorClass = `${classPrefix}Default`
      break
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={props.messageOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
          classes: {
            root: `mg ${colorClass}`
          }
        }}
        message={
          <span className="mgContainer">
            <span className="mgIcon">{icon}</span>
            <Typography variant="body1" className="mgText">{props.messageText}</Typography>
          </span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={handleClose}
            classes={{root: 'closeBtn'}}
          >
            &times;
          </IconButton>,
        ]}
      />
    </>
  )
}

function mapStateToProps(state: any): any {
  return {
    messageOpen: state.MessagesReducer.messageOpen,
    messageText: state.MessagesReducer.messageText
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    messageClose: () => dispatch(closeMessage()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Message)