import ITask from './Task';

export interface IProjectState {
  name: string
  startDate: Date
  finishDate: Date
  price: number
  tasks: ITask[]
  notes: any
  attachmentFiles: any
  loading: boolean
}