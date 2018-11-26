
import {USER_REGISTER, USER_REGISTER_END, USER_REGISTER_START} from './actionTypes'
import {Dispatch} from 'redux'
import firebase from '../../../firebase'
import {IUser} from '../../../interfaces/user/IUser';
import {openMessage} from "../message/actions";

export const userRegister = ({email, password}: IUser) => {
  return async (dispatch: Dispatch) => {
    dispatch(startRegister())
    try {
      dispatch(endRegister())
      const registerUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
      dispatch({
        type: USER_REGISTER,
        payload: registerUser
      })
    } catch (e) {
      dispatch(openMessage(e.message))
      dispatch(endRegister())
    }
  }
}

const startRegister = () => {
  return {
    type: USER_REGISTER_START
  }
}

const endRegister = () => {
  return {
    type: USER_REGISTER_END
  }
}
