import {combineReducers} from 'redux'
import UserReducer from './userReducer'
import MessagesReducer from './messagesReducer'

export default combineReducers({
  UserReducer, MessagesReducer
})
