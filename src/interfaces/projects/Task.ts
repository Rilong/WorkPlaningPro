export default interface ITask {
  name: string
  deadline?: number
  done?: boolean
  saved?: boolean
  loading?: boolean
  tasks?: ITask[]
}