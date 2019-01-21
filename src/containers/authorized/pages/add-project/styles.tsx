import {createStyles} from "@material-ui/core";

export interface IStyles {
  input: string
  textarea: string
}

export const styles = createStyles({
  input: {
    marginBottom: '20px'
  },
  textarea: {
    minHeight: '80px'
  }
})