import {IProject} from './IProject'

export interface IProjectListState {
  projects: IProject[]
  loading: boolean
}