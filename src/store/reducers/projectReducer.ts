import {IAction} from '../../interfaces/IAction'
import {IProjectState} from '../../interfaces/projects/IProjectState'
import {
  CREATE_PROJECT_CLOSE_WINDOW,
  CREATE_PROJECT_END_LOADING,
  CREATE_PROJECT_OPEN_WINDOW,
  CREATE_PROJECT_START_LOADING
} from '../actions/project/actionTypes';

const initialState: IProjectState = {
  name: null,
  startDate: null,
  finishDate: null,
  price: 0,
  tasks: null,
  notes: null,
  attachmentFiles: null,
  loading: false,
  open: false
}

export default function (state: IProjectState = initialState, action: IAction): IProjectState {
  switch (action.type) {
    case CREATE_PROJECT_START_LOADING:
      return {...state, loading: true}
    case CREATE_PROJECT_END_LOADING:
      return {...state, loading: false}
    case CREATE_PROJECT_OPEN_WINDOW:
      return {...state, open: true}
    case CREATE_PROJECT_CLOSE_WINDOW:
      return {...state, open: false}
    default:
      return state
  }
}