import {IAction} from '../../interfaces/IAction'
import {IProjectState} from '../../interfaces/projects/IProjectState'
import {
  CREATE_PROJECT_END_LOADING,
  CREATE_PROJECT_START_LOADING
} from '../actions/project/actionTypes'

const initialState: IProjectState = {
  userId: null,
  name: null,
  startDate: null,
  finishDate: null,
  budget: 0,
  tasks: null,
  notes: null,
  attachmentFiles: null,
  loading: false,
}

export default function (state: IProjectState = initialState, action: IAction): IProjectState {
  switch (action.type) {
    case CREATE_PROJECT_START_LOADING:
      return {...state, loading: true}
    case CREATE_PROJECT_END_LOADING:
      return {...state, loading: false}
    default:
      return state
  }
}