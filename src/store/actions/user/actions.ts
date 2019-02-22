import firebase from 'firebase/app'
import 'firebase/auth'
import {
  USER_LOADING_END,
  USER_LOADING_START,
  USER_REGISTER_ON,
  USER_REGISTER_OFF,
  USER_SING_IN,
  USER_SING_OUT
} from './actionTypes'
import {Dispatch} from 'redux'
import {IUser} from '../../../interfaces/user/IUser'
import {openMessage} from '../message/actions'
import {
  ERROR_AUTH_DATA_INVALID,
  ERROR_EMAIL_ALREADRY,
  ERROR_SERVER,
  ERROR_TOO_MANY_REQUESTS
} from '../../../validation/validationMessages'
import User from '../../../models/User'

export const userRegister = ({email, password}: IUser) => {
  return async (dispatch: Dispatch) => {
    dispatch(startUserLoading())
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      dispatch(endUserLoading())
      dispatch(userRegisterOff())
      dispatch(openMessage('Вы успешно зарегистрировались! Теперь вы можете войти в систему'))
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

export const userLogin = ({email, password}: IUser) => {
  return async (dispatch: Dispatch) => {
    dispatch(startUserLoading())
    try {
      const userData = await firebase.auth().signInWithEmailAndPassword(email, password)
      dispatch(endUserLoading())
      dispatch(userSingIn(new User(userData.user.uid, userData.user.email, null)))
    } catch (e) {
      dispatch(endUserLoading())
      switch (e.code) {
        case 'auth/too-many-requests':
          dispatch(openMessage(ERROR_TOO_MANY_REQUESTS))
          break
        case 'auth/user-not-found':
          dispatch(openMessage(ERROR_AUTH_DATA_INVALID))
          break
        case 'auth/wrong-password':
          dispatch(openMessage(ERROR_AUTH_DATA_INVALID))
          break
        default:
          dispatch(openMessage(ERROR_SERVER))

      }
    }
  }
}

const userSingIn = (user: User) => {
  return {
    type: USER_SING_IN,
    payload: user
  }
}

export const userSingOut = () => {
  return async (dispatch: Dispatch) => {
    try {
      await firebase.auth().signOut()
      dispatch({type: USER_SING_OUT})
    }catch (e) {
      dispatch(openMessage(e.message))
    }
  }
}

export const autoLogin = () => (dispatch: Dispatch) => {
  return new Promise((resolve, reject) => {
    firebase.auth().onAuthStateChanged(user => {
      resolve()
      if (user) {
        dispatch(userSingIn(new User(user.uid, user.email, null)))
      }
    }, e => {
      dispatch(openMessage(e.message))
      reject()
    })
  })
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