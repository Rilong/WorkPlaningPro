import './styles.css'
import * as React from 'react'
import {connect} from 'react-redux'
import {IUserState} from './interfaces/user/IUserState'
import Authorized from './containers/authorized/authorized'
import Unauthorized from './containers/unauthorized/unauthorized'


interface IProps {
  isAuthorized?: boolean
  user?: IUserState
}

class App extends React.Component<IProps> {
  public render() {
    return (
      <div className="App">
        {this.props.isAuthorized ? <Authorized/> : <Unauthorized/>}
      </div>
    );
  }
}

function mapStateToProps(state: IUserState) : any {
  return {
    isAuthorized: !!state.user,
    user: state.user
  }
}

export default connect(mapStateToProps)(App);
