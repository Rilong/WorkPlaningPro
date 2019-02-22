import IMessagesState from '../../interfaces/messages/IMessagesState'
import {IAction} from '../../interfaces/IAction'
import {MESSAGE_CLOSE, MESSAGE_OPEN} from '../actions/message/actionsTypes'

const initialState : IMessagesState = {
  messageOpen: false,
  messageText: '',
  messageType: ''
}

export default function (state: IMessagesState = initialState, action: IAction) : IMessagesState {
  switch (action.type) {
    case MESSAGE_OPEN:
      return {
        messageOpen: true,
        messageText: action.payload.text,
        messageType: action.payload.type
      }
    case MESSAGE_CLOSE:
      return {
        ...state,
        messageOpen: false
      }
    default:
      return state
  }
}