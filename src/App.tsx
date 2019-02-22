import './styles.css'
import firebase from 'firebase/app'
import * as React from 'react'
import {connect} from 'react-redux'
import {IUserState} from './interfaces/user/IUserState'
import Authorized from './containers/authorized/authorized'
import Unauthorized from './containers/unauthorized/unauthorized'
import {Dispatch} from 'redux'
import {autoLogin} from './store/actions/user/actions'
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress'
import {BrowserRouter} from 'react-router-dom'
import {getProjects} from './store/actions/project-list/actions'
import Message from './components/message/Message'
import messageType from './interfaces/messages/MessageType'

interface IProps {
  isAuthorized?: boolean
  user?: IUserState
  autoLogin?: () => Promise<any>
  getProjects?: () => void
  messageType?: messageType
}

class App extends React.Component<IProps> {

  public state = {
    loadingApp: false
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
        <Message typeMessage={this.props.messageType}/>
      </div>
    )
  }
}

function mapStateToProps(state: any): any {
  return {
    isAuthorized: !!state.UserReducer.user,
    user: state.UserReducer.user,
    messageType: state.MessagesReducer.messageType
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    autoLogin: () => dispatch<any>(autoLogin()),
    getProjects: () => dispatch<any>(getProjects())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
