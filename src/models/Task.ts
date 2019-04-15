import ITask from '../interfaces/projects/Task'

export default class Task implements ITask {
  public name: string = null
  public deadline: number = null

  public constructor(name: string = null, deadline: null = null) {
    this.name = name
    this.deadline = deadline
  }
}