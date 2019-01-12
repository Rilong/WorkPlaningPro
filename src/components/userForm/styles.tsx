import createStyles from "@material-ui/core/styles/createStyles";

export interface IStyles {
  input: string
  submitBtn: string
  progress: string
}

export const styles = createStyles({
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