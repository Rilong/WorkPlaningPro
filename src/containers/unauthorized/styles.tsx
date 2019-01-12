import {Theme} from "@material-ui/core";

export interface IStyles {
  disableShadow: string
  cardFix: string,
  root: string
}

export const styles = (theme: Theme) => ({
  disableShadow: {
    boxShadow: 'none !important'
  },

  cardFix: {
    borderRadius: '0',
    border: 'none'
  },

  root: {
    height: '100vh'
  }

})