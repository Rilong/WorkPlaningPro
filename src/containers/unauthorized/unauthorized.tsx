import * as React from 'react'
import * as classes from './styles.css'
import Grid from '@material-ui/core/Grid/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography/Typography'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import AppBar from '@material-ui/core/AppBar/AppBar'
import Register from '../../components/register/register'
import Login from '../../components/login/login'
import {connect} from "react-redux";
import {userRegisterOff, userRegisterOn} from "../../store/actions/user/actions";

interface IProps {
  isRegister?: boolean
  registerOn?: () => void
  registerOff?: () => void

}

const unauthorized = class Unauthorized extends React.Component<IProps> {

  public state = {
    isRegister: false
  }

  public changeForm = () => {
    if (this.props.isRegister) {
      this.props.registerOff()
    } else {
      this.props.registerOn()
    }
  }
  
  public render(): React.ReactNode {
    return (
      <Grid container={true} alignItems={'center'} justify={'center'} className={classes.root}>
        <Grid item={true} xs={3}>
          <Card className={classes.cardFix}>
            <AppBar color="primary" position="static" className={classes.disableShadow}>
              <Toolbar>
                <Typography variant="h6" color="inherit">
                  {this.props.isRegister ? 'Реєстрація' : 'Вхід'}
                </Typography>
              </Toolbar>
            </AppBar>
            <CardContent>
              {!this.props.isRegister ? <Login changeForm={this.changeForm}/> : <Register changeForm={this.changeForm}/>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

function mapStateToProps(state: any) {
  return {
    isRegister: state.UserReducer.isRegister
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    registerOn: () => dispatch(userRegisterOn()),
    registerOff: () => dispatch(userRegisterOff())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(unauthorized)
