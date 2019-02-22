import {IProject} from '../interfaces/projects/IProject'
import ITask from '../interfaces/projects/Task'

export class Project implements IProject {
  public id: string = null
  public userId: string
  public name: string = null
  public startDate: Date = null
  public finishDate: Date = null
  public tasks: ITask[] = null
  public notes: any = 0
  public price: number = null
  public attachmentFiles: any = null

  constructor(id: string,
              userId: string,
              name: string,
              startDate: Date,
              finishDate: Date = null,
              tasks: ITask[] = null, notes: any = null, price: number = 0,
              attachmentFiles: any = null) {
    this.id = id
    this.userId = userId
    this.name = name
    this.startDate = startDate
    this.finishDate = finishDate
    this.tasks = tasks
    this.notes = notes
    this.price = price
    this.attachmentFiles = attachmentFiles
  }
}