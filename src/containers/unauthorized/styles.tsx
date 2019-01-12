import createStyles from "@material-ui/core/styles/createStyles";

export interface IStyles {
  disableShadow: string
  cardFix: string,
  root: string
}

export const styles = createStyles({
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