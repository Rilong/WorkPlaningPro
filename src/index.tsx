import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import red from '@material-ui/core/colors/red'
import CssBaseLine from '@material-ui/core/CssBaseline';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import RootReducer from './store/reducers/rootReducer'
import thunk from 'redux-thunk'

const store = createStore(RootReducer, applyMiddleware(thunk))

const theme = createMuiTheme({

  palette: {
    background: {
      default: '#f2f2f2'
    },
    primary: red
  },
  typography: {
    useNextVariants: true
  }

})

const app = (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <CssBaseLine/>
      <App/>
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
