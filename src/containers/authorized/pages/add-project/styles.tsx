import {createStyles} from "@material-ui/core";

export interface IStyles {
  input: string
  textarea: string
  task: string
  addTaskBtn: string
}

export const styles = createStyles({
  input: {
    marginBottom: '20px'
  },
  textarea: {
    minHeight: '80px'
  },

  task: {
    padding: '20px 10px',
    marginBottom: '20px'
  },
  addTaskBtn: {
    marginBottom: '20px'
  }
})