import * as React from 'react'
import {Fab, Grid, LinearProgress, Typography} from '@material-ui/core'
import MoneyIcon from '@material-ui/icons/MonetizationOn'

class Info extends React.Component {
  public render() {
    return (
      <>
        <Grid container={true} className="pjInfo">
          <LinearProgress variant="determinate" value={67} className="pjProgress"/>
          <Grid container={true} justify="space-between">
            <Typography variant="body1" className="pjMoneyText">
              <Fab size="small" color="primary">
                <MoneyIcon/>
              </Fab>
              <span className="text">0</span>
            </Typography>
            <Typography variant="body1" className="pjProgressText"><span>67%</span></Typography>
          </Grid>
        </Grid>
      </>
    )
  }
}

export default Info