import ITask from '../interfaces/projects/Task'

export default class Task implements ITask {
  public name: string = null
  public deadline: number = null
  public done: boolean = null
  public saved: boolean = null
  public loading: boolean = false

  public constructor(name: string = null, deadline: null = null, done: boolean = false, saved: boolean = false) {
    this.name = name
    this.deadline = deadline
    this.done = done
    this.saved = saved
  }
}