import * as React from 'react'
import {Link, NavLink, Route, withRouter} from 'react-router-dom'
import {styles, IStyles} from './styles'
import { withStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography/Typography";
import Toolbar from "@material-ui/core/Toolbar/Toolbar";
import AppBar from "@material-ui/core/AppBar/AppBar";
import IconButton from "@material-ui/core/IconButton/IconButton";
import ExitToApp from "@material-ui/icons/ExitToApp";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {userSingOut} from "../../store/actions/user/actions";
import IMenu from "../../interfaces/IMenu";
import AddNote from '@material-ui/icons/NoteAdd'
import Calendar from '@material-ui/icons/CalendarToday'
import Button from "@material-ui/core/Button/Button";
import Home from "./pages/home/Home";
import AddProject from "./pages/add-project/AddProject";
import CalendarPage from './pages/calendar/Calendar'

interface IProps {
  singOut?: () => void,
  classes?: IStyles
}

const authorized = class Authorized extends React.Component<IProps> {

  public menuLinks: IMenu[] = [
    {label: 'Добавить новый проект', to: '/new-project', icon: <AddNote className={this.props.classes.iconLeft}/>},
    {label: 'Календарь', to: '/calendar', icon: <Calendar className={this.props.classes.iconLeft}/>},
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
    const {classes} = this.props
    const linkHome = (props: any) => <Link to="/" {...props}/>
    return (
      <div>
        <AppBar position="static">
          <Toolbar className={classes.toolbar}>
            <div>
              <Typography variant="h5" color="inherit" component={linkHome} className={classes.logo}>
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
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    singOut: () => dispatch<any>(userSingOut())
  }
}

export default withRouter<any>(connect(null, mapDispatchToProps)(withStyles(styles)(authorized)))