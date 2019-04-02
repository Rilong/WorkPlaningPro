import * as React from 'react'
import {Fab, Grid, Typography} from '@material-ui/core'
import CalendarIcon from '@material-ui/icons/Today'

class Deadlines extends React.Component{
  public render(): React.ReactNode {
    return (
      <>
        <Grid container={true} justify="space-between">
          <Typography variant="subtitle2">
            <Fab size="small" color="primary" className="pjDateStartBtn"><CalendarIcon/></Fab>
            Дата начала 26.02.2019
          </Typography>
          <Typography variant="subtitle2">
            Дата завершения 05.03.2019
            <Fab size="small" color="primary" className="pjDateFinishBtn"><CalendarIcon/></Fab>
          </Typography>
        </Grid>
      </>
    )
  }
}

export default Deadlines