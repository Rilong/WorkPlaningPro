import {IAction} from '../../interfaces/IAction'
import {IProjectListState} from '../../interfaces/projects/IProjectListState'
import {
  PROJECTS_ADD,
  PROJECTS_GET,
  PROJECTS_LOADED, PROJECTS_LOADING_END,
  PROJECTS_LOADING_START,
  PROJECTS_UNLOADED
} from '../actions/project-list/actionTypes'

const initialState: IProjectListState = {
  projects: [],
  loading: false,
  loaded: false
}

export default function (state: IProjectListState = initialState, action: IAction): IProjectListState {
  switch (action.type) {
    case PROJECTS_GET:
      return {...state, projects: action.payload}
    case PROJECTS_ADD:
      const projects = [...state.projects]
      projects.push(action.payload)
      return {...state, projects}
    case PROJECTS_LOADING_START:
      return {...state, loading: true}
    case PROJECTS_LOADING_END:
      return {...state, loading: false}
    case PROJECTS_LOADED:
      return {...state, loaded: true}
    case PROJECTS_UNLOADED:
      return {...state, loaded: false}
    default:
      return state
  }
}