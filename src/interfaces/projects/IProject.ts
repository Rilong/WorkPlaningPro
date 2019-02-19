import ITask from './Task';

export interface IProject {
  id?: string
  name: string
  startDate: Date
  finishDate: Date
  price: number
  tasks: ITask[]
  notes: any
  attachmentFiles: any
}