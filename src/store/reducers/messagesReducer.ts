import IMessagesState from "../../interfaces/messages/IMessagesState";
import {IAction} from "../../interfaces/IAction";
import {MESSAGE_CLOSE, MESSAGE_OPEN} from "../actions/message/actionsTypes";

const initialState : IMessagesState = {
  messageOpen: false,
  messageText: ''
}

export default function (state: IMessagesState = initialState, action: IAction) : IMessagesState {
  switch (action.type) {
    case MESSAGE_OPEN:
      return {
        messageOpen: true,
        messageText: action.payload
      }
    case MESSAGE_CLOSE:
      return {
        messageOpen: false,
        messageText: ''
      }
    default:
      return state
  }
}