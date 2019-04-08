import ITask from './Task'

export interface IProject {
  id?: string
  userId: string
  name: string
  startDate: number
  finishDate: number
  price: number
  tasks: ITask[]
  notes: any
  attachmentFiles: any
}