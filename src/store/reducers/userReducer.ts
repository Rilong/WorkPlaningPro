import {IUserAction} from '../../interfaces/user/IUserAction'
import {IUserState} from '../../interfaces/user/IUserState'
import {USER_REGISTER} from '../actions/user/actionTypes';

const initialState : IUserState = {
  user: null
}

export default function (state : IUserState = initialState, action: IUserAction) : IUserState {
  switch (action.type) {
    case USER_REGISTER:
      console.log('add user')
    default:
      return state
  }
}
