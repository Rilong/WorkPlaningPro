import {IProject} from "../interfaces/projects/IProject";
import ITask from "../interfaces/projects/Task";

export class Project implements IProject {
  public id: string = null
  public name: string = null
  public startDate: Date = null
  public finishDate: Date = null
  public tasks: ITask[] = null
  public notes: any = 0
  public price: number = null
  public attachmentFiles: any = null

  constructor(id: string, name: string, startDate: Date, finishDate: Date, tasks: ITask[], notes: any, price: number, attachmentFiles: any) {
    this.id = id
    this.name = name;
    this.startDate = startDate;
    this.finishDate = finishDate;
    this.tasks = tasks;
    this.notes = notes;
    this.price = price;
    this.attachmentFiles = attachmentFiles;
  }
}