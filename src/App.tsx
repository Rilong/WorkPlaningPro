import './styles.css'
import firebase from 'firebase/app'
import * as React from 'react'
import {connect} from 'react-redux'
import {IUserState} from './interfaces/user/IUserState'
import Authorized from './containers/authorized/authorized'
import Unauthorized from './containers/unauthorized/unauthorized'
import IconButton from '@material-ui/core/IconButton/IconButton'
import Snackbar from '@material-ui/core/Snackbar/Snackbar'
import {Dispatch} from 'redux'
import {closeMessage} from './store/actions/message/actions'
import {autoLogin} from './store/actions/user/actions'
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress'
import {BrowserRouter} from 'react-router-dom'
import {getProjects} from './store/actions/project-list/actions'

interface IProps {
  isAuthorized?: boolean
  user?: IUserState
  messageOpen?: boolean
  messageClose?: () => void
  messageText?: string,
  autoLogin?: () => Promise<any>
  getProjects?: () => void
}

class App extends React.Component<IProps> {

  public state = {
    loadingApp: false
  }

  public handleClose = () => {
    this.props.messageClose()
  }

  public componentDidMount(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyBEws4fbP-6aAt3VAXFAmcWR-8_ZrgJrDo',
      authDomain: 'workplaningpro.firebaseapp.com',
      databaseURL: 'https://workplaningpro.firebaseio.com',
      projectId: 'workplaningpro',
      storageBucket: 'workplaningpro.appspot.com',
      messagingSenderId: '855410034243',
    })

    this.setState({loadingApp: true})
    this.props.autoLogin().then(() => {
      this.setState({loadingApp: false})
    }).catch(e => {
      this.setState({loadingApp: false})
    })

    this.props.getProjects()
  }

  public render() {
    return (
      <div className="App">
        {
          this.state.loadingApp ? <LinearProgress color="secondary"/> :
            <div>
              {
                this.props.isAuthorized ?
                <BrowserRouter>
                  <Authorized/>
                </BrowserRouter>
                : <Unauthorized/>
              }
            </div>
        }
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          open={this.props.messageOpen}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{this.props.messageText}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={this.handleClose}
            >
              &times;
            </IconButton>,
          ]}
        />
      </div>
    )
  }
}

function mapStateToProps(state: any): any {
  return {
    isAuthorized: !!state.UserReducer.user,
    user: state.UserReducer.user,
    messageOpen: state.MessagesReducer.messageOpen,
    messageText: state.MessagesReducer.messageText
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    messageClose: () => dispatch(closeMessage()),
    autoLogin: () => dispatch<any>(autoLogin()),
    getProjects: () => dispatch<any>(getProjects()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
