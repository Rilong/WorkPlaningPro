import {IUserAction} from '../../interfaces/user/IUserAction'
import {IUserState} from '../../interfaces/user/IUserState'
import {USER_REGISTER, USER_REGISTER_END, USER_REGISTER_START} from '../actions/user/actionTypes';

const initialState : IUserState = {
  user: null,
  userLoading: false
}

export default function (state : IUserState = initialState, action: IUserAction) : IUserState {
  switch (action.type) {
    case USER_REGISTER_START:
      state.userLoading = true
    case USER_REGISTER:
      console.log('USER_REGISTER', )
    case USER_REGISTER_END:
      state.userLoading = false

    default:
      return state
  }
}
