import {MESSAGE_CLOSE, MESSAGE_OPEN} from './actionsTypes'
import {IAction} from '../../../interfaces/IAction'

export const openMessage = (message: string, messageType: 'success' | 'warning' | 'danger' | '' = '') : IAction =>  {
   return {
     type: MESSAGE_OPEN,
     payload: {
       text: message,
       type: messageType
     }
   }
}

export const closeMessage = () : IAction => {
  return {
    type: MESSAGE_CLOSE
  }
}