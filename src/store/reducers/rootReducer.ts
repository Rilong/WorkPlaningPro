import {combineReducers} from 'redux'
import UserReducer from './userReducer'
import MessagesReducer from './messagesReducer'
import ProjectReducer from './projectReducer'
import ProjectListReducer from './projectListReducer'

export default combineReducers({
  UserReducer,
  MessagesReducer,
  ProjectReducer,
  ProjectListReducer
})
