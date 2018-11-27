import './styles.css'
import * as React from 'react'
import {connect} from 'react-redux'
import {IUserState} from './interfaces/user/IUserState'
import Authorized from './containers/authorized/authorized'
import Unauthorized from './containers/unauthorized/unauthorized'
import IconButton from "@material-ui/core/IconButton/IconButton";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import {Dispatch} from "redux";
import {closeMessage} from "./store/actions/message/actions";

interface IProps {
  isAuthorized?: boolean
  user?: IUserState
  messageOpen?: boolean
  messageClose?: () => void
  messageText?: string
}

class App extends React.Component<IProps> {
  public handleClose = () => {
    this.props.messageClose()
  }

  public render() {
    console.log(this.props)
    return (
      <div className="App">
        {this.props.isAuthorized ? <Authorized/> : <Unauthorized/>}
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
    );
  }
}

function mapStateToProps(state: any) : any {
  return {
    isAuthorized: !!state.UserReducer.user,
    user: state.UserReducer.user,
    messageOpen: state.MessagesReducer.messageOpen,
    messageText: state.MessagesReducer.messageText
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
      messageClose: () => dispatch(closeMessage())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
