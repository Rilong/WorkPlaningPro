import * as React from 'react'
import * as classes from './styles.css'
import Grid from '@material-ui/core/Grid/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography/Typography'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import AppBar from '@material-ui/core/AppBar/AppBar'
import LoginForm from '../../components/loginForm/loginForm'

const unauthorized = class Unauthorized extends React.Component {

  public render(): React.ReactNode {
    return (
      <Grid container={true} alignItems={'center'} justify={'center'} className={classes.root}>
        <Grid item={true} xs={2}>
          <Card className={classes.cardFix}>
            <AppBar color="primary" position="static" className={classes.disableShadow}>
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  Вхід
                </Typography>
              </Toolbar>
            </AppBar>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default unauthorized
