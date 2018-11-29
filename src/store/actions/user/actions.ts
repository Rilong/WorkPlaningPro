
import {USER_LOADING_END, USER_LOADING_START, USER_REGISTER_ON, USER_REGISTER_OFF} from './actionTypes'
import {Dispatch} from 'redux'
import firebase from '../../../firebase'
import 'firebase/auth'
import {IUser} from '../../../interfaces/user/IUser';
import {openMessage} from "../message/actions";
import {ERROR_EMAIL_ALREADRY, ERROR_SERVER} from "../../../validation/validationMessages";

export const userRegister = ({email, password}: IUser) => {
  return async (dispatch: Dispatch) => {
    dispatch(startUserLoading())
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      dispatch(endUserLoading())
      dispatch(userRegisterOff())
      dispatch(openMessage('Ви успішно зареєструвались! Тепер ви можете увійти в систему'))
    } catch (e) {
      switch (e.code) {
        case 'auth/email-already-in-use':
          dispatch(openMessage(ERROR_EMAIL_ALREADRY))
          break
        default:
          dispatch(openMessage(ERROR_SERVER))
      }
      dispatch(endUserLoading())
    }
  }
}

const startUserLoading = () => {
  return {
    type: USER_LOADING_START
  }
}

const endUserLoading = () => {
  return {
    type: USER_LOADING_END
  }
}

export const userRegisterOn = () => {
  return {
    type: USER_REGISTER_ON
  }
}

export const userRegisterOff = () => {
  return {
    type: USER_REGISTER_OFF
  }
}