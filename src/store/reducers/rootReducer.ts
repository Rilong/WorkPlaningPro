import {combineReducers} from 'redux'
import UserReducer from './userReducer'
import MessagesReducer from './messagesReducer'
import ProjectReducer from './projectReducer'

export default combineReducers({
  UserReducer, MessagesReducer, ProjectReducer
})
