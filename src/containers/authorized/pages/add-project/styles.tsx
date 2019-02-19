import {createStyles} from '@material-ui/core'

export interface IStyles {
  input: string
  textarea: string
  addTaskBtn: string
}

export const styles = createStyles({
  input: {
    marginBottom: '20px'
  },
  addTaskBtn: {
    marginBottom: '20px'
  }
})