import * as React from 'react'
import './styles.css'
import {StyleRulesCallback, withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography/Typography'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import AppBar from '@material-ui/core/AppBar/AppBar'
import LoginForm from '../../components/loginForm/loginForm'

const styles: StyleRulesCallback = theme => ({
  root: {
    height: '100vh'
  },
  disableShadow: {
    boxShadow: 'none'
  },
  cardFix: {
    borderRadius: 0,
    border: 'none'
  }
})

interface IProps {
  classes?: {
    root: string,
    disableShadow: string,
    cardFix: string,
  }
}

const unauthorized = class Unauthorized extends React.Component<IProps> {

  public render(): React.ReactNode {
    const classes = this.props.classes
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
              <LoginForm classes={classes}/>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(unauthorized)
