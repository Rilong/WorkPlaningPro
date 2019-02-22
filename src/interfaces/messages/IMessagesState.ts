import messageType from './MessageType'

export default interface IMessagesState {
  messageOpen: boolean
  messageText?: string
  messageType?: messageType
}