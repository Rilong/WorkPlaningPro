import * as React from 'react'
import {Link, NavLink, Route, withRouter} from 'react-router-dom'
import Typography from '@material-ui/core/Typography/Typography'
import Toolbar from '@material-ui/core/Toolbar/Toolbar'
import AppBar from '@material-ui/core/AppBar/AppBar'
import IconButton from '@material-ui/core/IconButton/IconButton'
import ExitToApp from '@material-ui/icons/ExitToApp'
import {connect} from 'react-redux'
import {Dispatch} from 'redux'
import {userSingOut} from '../../store/actions/user/actions'
import IMenu from '../../interfaces/IMenu'
import Calendar from '@material-ui/icons/CalendarToday'
import Button from '@material-ui/core/Button/Button'
import Home from './pages/home/Home'
import AddProject from './pages/add-project/AddProject'
import CalendarPage from './pages/calendar/Calendar'

import './styles.scss'

interface IProps {
  singOut?: () => void,
}

const authorized = class Authorized extends React.Component<IProps> {

  public menuLinks: IMenu[] = [
    {label: 'Календарь', to: '/calendar', icon: <Calendar className="iconLeft" />},
  ]

  public logout = () => {
    this.props.singOut()
  }

  public menu() {
    return this.menuLinks.map((link: IMenu, index: number) => {
      const route = (props:any) => <NavLink to={link.to} {...props}/>
      return (
        <Button key={index + Math.random()} component={route} color="inherit">{link.icon ? link.icon : null} {link.label}</Button>
      )
    })
  }

  public render(): React.ReactNode {
    const linkHome = (props: any) => <Link to="/" {...props}/>
    return (
      <div>
        <AppBar position="static">
          <Toolbar className="toolbar">
            <div>
              <Typography variant="h5" color="inherit" component={linkHome} className="logo">
                Work Planing Pro
              </Typography>
            </div>
            <div>
              {this.menu()}
              <IconButton onClick={this.logout} color="inherit"><ExitToApp/></IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <div className="content">
          <Route path="/" exact={true} component={Home}/>
          <Route path="/new-project" component={AddProject}/>
          <Route path="/calendar" component={CalendarPage}/>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    singOut: () => dispatch<any>(userSingOut())
  }
}

export default withRouter<any>(connect(null, mapDispatchToProps)(authorized))