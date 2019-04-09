import {IProject} from '../interfaces/projects/IProject'
import ITask from '../interfaces/projects/Task'
import * as dateFns from 'date-fns'

export class Project implements IProject {
  public id: string = null
  public userId: string
  public name: string = null
  public startDate: number = null
  public finishDate: number = null
  public tasks: ITask[] = null
  public notes: any = 0
  public price: number = null
  public attachmentFiles: any = null

  constructor(id: string,
              userId: string,
              name: string,
              startDate: number = null,
              finishDate: number = null,
              tasks: ITask[] = null,
              notes: any = null, price: number = 0,
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

  public getStartDateAsDate() {
    return new Date(this.startDate)
  }

  public getFinishDateAsDate() {
    return new Date(this.finishDate)
  }

  public getStartDateAsFormated(): string {
    return dateFns.format(this.getStartDateAsDate(), 'DD.MM.YYYY')
  }

  public getFinishDateAsFormated(): string {
    return dateFns.format(this.getFinishDateAsDate(), 'DD.MM.YYYY')
  }
}