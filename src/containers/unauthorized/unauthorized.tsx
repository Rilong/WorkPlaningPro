import * as React from 'react'
import * as classes from './styles.css'
import Grid from '@material-ui/core/Grid/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography/Typography'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import AppBar from '@material-ui/core/AppBar/AppBar'
import UserForm from '../../components/userForm/userForm'

const unauthorized = class Unauthorized extends React.Component {

  public state = {
    isRegister: false
  }

  public changeForm = () => {
    this.setState({
      isRegister: !this.state.isRegister
    })
  }

  public render(): React.ReactNode {
    return (
      <Grid container={true} alignItems={'center'} justify={'center'} className={classes.root}>
        <Grid item={true} xs={3}>
          <Card className={classes.cardFix}>
            <AppBar color="primary" position="static" className={classes.disableShadow}>
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  {this.state.isRegister ? 'Реєстрація' : 'Вхід  '}
                </Typography>
              </Toolbar>
            </AppBar>
            <CardContent>
              <UserForm isRegister={this.state.isRegister} changeForm={this.changeForm}  />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default unauthorized
