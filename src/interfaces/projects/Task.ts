export default interface ITask {
  name: string
  tasks: ITask[]
  deadline?: number
  done?: boolean
  saved?: boolean
  loading?: boolean
}