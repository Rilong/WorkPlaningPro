import {IUserAction} from '../../interfaces/user/IUserAction'
import {IUserState} from '../../interfaces/user/IUserState'

const initialState : IUserState = {
  user: null
}

export default function (state : IUserState = initialState, action: IUserAction) : IUserState {
  switch (action.type) {
    default:
      return state
  }
}
