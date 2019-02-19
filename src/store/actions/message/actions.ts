import {MESSAGE_CLOSE, MESSAGE_OPEN} from './actionsTypes'
import {IAction} from '../../../interfaces/IAction'

export const openMessage = (message: string) : IAction =>  {
   return {
     type: MESSAGE_OPEN,
     payload: message
   }
}

export const closeMessage = () : IAction => {
  return {
    type: MESSAGE_CLOSE
  }
}