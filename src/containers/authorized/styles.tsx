import {Theme} from "@material-ui/core";

export interface IStyles {
  toolbar: string
  logo: string
  iconLeft: string
}

export const styles = (theme: Theme) => ({
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