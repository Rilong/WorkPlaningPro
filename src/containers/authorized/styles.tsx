import createStyles from "@material-ui/core/styles/createStyles";

export interface IStyles {
  toolbar: string
  logo: string
  iconLeft: string
}

export const styles = createStyles({
  toolbar: {
    justifyContent: 'space-between'
  },

  logo: {
    textDecoration: 'none'
  },

  iconLeft: {
    marginRight: '10px'
  }
})