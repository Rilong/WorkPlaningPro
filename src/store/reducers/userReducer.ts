import {IAction} from '../../interfaces/IAction'
import {IUserState} from '../../interfaces/user/IUserState'
import {USER_REGISTER, USER_REGISTER_END, USER_REGISTER_START} from '../actions/user/actionTypes';

const initialState : IUserState = {
  user: null,
  userLoading: false
}

export default function (state : IUserState = initialState, action: IAction) : IUserState {
  switch (action.type) {
    case USER_REGISTER_START:
      return {
        ...state, userLoading: true
      }
    case USER_REGISTER:
      console.log('USER_REGISTER', state)
    case USER_REGISTER_END:
      return {
        ...state, userLoading: false
      }

    default:
      return state
  }
}
