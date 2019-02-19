import {IAction} from '../../interfaces/IAction'
import {IProjectListState} from '../../interfaces/projects/IProjectListState';
import {PROJECTS_GET} from '../actions/project-list/actionTypes';

const initialState: IProjectListState = {
  projects: [],
  loading: false
}

export default function (state: IProjectListState = initialState, action: IAction): IProjectListState {
  switch (action.type) {
    case PROJECTS_GET:
      return {...state, projects: action.payload}
    default:
      return state
  }
}