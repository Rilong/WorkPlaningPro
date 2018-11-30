import {IAction} from '../../interfaces/IAction'
import {IUserState} from '../../interfaces/user/IUserState'
import {
  USER_LOADING_END,
  USER_LOADING_START,
  USER_REGISTER_ON,
  USER_REGISTER_OFF,
  USER_SING_IN,
  USER_SING_OUT
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
    case USER_SING_IN:
      return {...state, user: action.payload}
    case USER_SING_OUT:
      return {...state, user: null}

    default:
      return state
  }
}
