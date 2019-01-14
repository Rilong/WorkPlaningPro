import createStyles from '@material-ui/core/styles/createStyles';
import gray from '@material-ui/core/colors/grey';
import {Theme} from "@material-ui/core";

export interface IStyles {
  capitalize: string
  calendarRow: string
  calendarCeil: string
  calendarCard: string
  unactivated: string
  unactivatedText: string,
  activated: string
  activatedText: string
  selected: string
  selectedText: string
  text: string
  root: string
}


export const styles = (theme: Theme) => createStyles({
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
    display: '',
  },

  calendarCard: {
    width: '100%',
    height: '100px',
    backgroundColor: '#fff',
    border: '1px solid #fafafa',
    borderRadius: '0',
    '&:hover': {
      backgroundColor: '#ebebeb',
    }
  },

  unactivated: {
    backgroundColor: gray[200],
  },

  unactivatedText: {
    color: gray[500]
  },

  activated: {},

  activatedText: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    lineHeight: '48px',
    color: '#fff',
  },

  selected: {
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  },

  selectedText: {
    color: '#fff'
  },

  text: {}
})