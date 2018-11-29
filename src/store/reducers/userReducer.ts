import {IAction} from '../../interfaces/IAction'
import {IUserState} from '../../interfaces/user/IUserState'
import {
  USER_REGISTER,
  USER_LOADING_END,
  USER_LOADING_START,
  USER_REGISTER_ON,
  USER_REGISTER_OFF
} from '../actions/user/actionTypes';

const initialState : IUserState = {
  isRegister: false,
  user: null,
  userLoading: false
}

export default function (state : IUserState = initialState, action: IAction) : IUserState {
  switch (action.type) {
    case USER_LOADING_START:
      return {
        ...state, userLoading: true
      }
    case USER_REGISTER:
      console.log('USER_REGISTER', state)
    case USER_LOADING_END:
      return {
        ...state, userLoading: false
      }
    case USER_REGISTER_ON:
      return {
        ...state, isRegister: true
      }
    case USER_REGISTER_OFF:
      return {
        ...state, isRegister: false
      }

    default:
      return state
  }
}
