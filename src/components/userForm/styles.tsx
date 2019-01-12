import {Theme} from "@material-ui/core";

export interface IStyles {
  input: string
  submitBtn: string
  progress: string
}

export const styles = (theme: Theme) => ({
  input: {
    marginBottom: '10px'
  },

  submitBtn: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between'
  },

  progress: {
    marginLeft: '10px'
  }
})