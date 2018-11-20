import {IUser} from '../../../interfaces/user/IUser';
import {USER_REGISTER} from './actionTypes';

export const userRegister = (userData: IUser) => {
  return {
    type: USER_REGISTER,
    payload: userData
  }
}
