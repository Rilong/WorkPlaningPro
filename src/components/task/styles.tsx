import createStyles from "@material-ui/core/styles/createStyles";

export interface IStyles {
  task: string
}

export const styles = createStyles({
  task: {
    padding: '20px 10px',
    marginBottom: '20px'
  },
})