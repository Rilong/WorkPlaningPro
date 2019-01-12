import {Theme} from "@material-ui/core";

export interface IStyles {
  capitalize: string
  calendarRow: string
  calendarCeil: string
  calendarCard: string
  root: string
}


export const styles = (theme: Theme): any => ({
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
    display: 'flex'
  },

  calendarCard: {
    width: '100%',
    height: '100px'
  }
})