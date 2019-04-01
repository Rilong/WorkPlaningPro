import {IAction} from '../../interfaces/IAction'
import {IProjectListState} from '../../interfaces/projects/IProjectListState'
import {
  EDIT_PROJECT_NAME_IN_LIST,
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
  const projects = [...state.projects]
  switch (action.type) {
    case PROJECTS_GET:
      return {...state, projects: action.payload}
    case PROJECTS_ADD:
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
    case EDIT_PROJECT_NAME_IN_LIST:
      projects[action.payload.index].name = action.payload.name
      return {...state, projects}
    default:
      return state
  }
}