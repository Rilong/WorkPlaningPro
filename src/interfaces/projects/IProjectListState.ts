import {IProjectState} from './IProjectState'

export interface IProjectListState {
  projects: IProjectState[]
  loading: boolean
}