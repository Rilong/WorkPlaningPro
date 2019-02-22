import User from '../../models/User'

export interface IUserState {
  isRegister: boolean
  user: User
  userLoading: boolean
}
