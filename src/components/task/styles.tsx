import createStyles from "@material-ui/core/styles/createStyles";

export interface IStyles {
  task: string
  checkRoot: string
  controlsRoot: string
  controls: string
  dateText: string
}

export const styles = createStyles({
  task: {
    padding: '20px 10px',
    marginBottom: '20px'
  },
  checkRoot: {
    padding: '0',
    marginRight: '10px'
  },
  controlsRoot: {
    textAlign: 'right'
  },
  controls: {
    display: 'flex',
  },
  dateText: {
    fontSize: '12px',
    color: '#9f9f9f'
  }
})