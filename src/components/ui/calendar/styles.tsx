import createStyles from '@material-ui/core/styles/createStyles';

export interface IStyles {
  capitalize: string
  calendarRow: string
  calendarCeil: string
  calendarCard: string
  root: string
}


export const styles = createStyles({
  root: {
    margin: '20px'
  },
  capitalize: {
    textTransform: 'capitalize'
  },

  calendarRow: {
    width: '100%',
    display: 'flex'
  },

  calendarCeil: {
    width: '100%',
    display: ''
  },

  calendarCard: {
    width: '100%',
    height: '100px'
  }
})