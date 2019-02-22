import * as React from 'react'
import {Dispatch} from 'redux'
import {closeMessage} from '../../store/actions/message/actions'
import {connect} from 'react-redux'
import IconButton from '@material-ui/core/IconButton/IconButton'
import {Snackbar} from '@material-ui/core'

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

  const handleClose = () => props.messageClose()

  switch (props.typeMessage) {
    case 'success':
      colorClass = `${classPrefix}Success`
      break
    case 'warning':
      colorClass = `${classPrefix}Warning`
      break
    case 'danger':
      colorClass = `${classPrefix}Danger`
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
        message={<span id="message-id">{props.messageText}</span>}
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