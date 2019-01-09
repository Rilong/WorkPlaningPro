import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles'
import CssBaseLine from '@material-ui/core/CssBaseline';
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import RootReducer from './store/reducers/rootReducer'
import thunk from 'redux-thunk'
import red from '@material-ui/core/colors/red'

const store = createStore(RootReducer, compose(
  applyMiddleware(thunk),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
))

const primary = red["500"];
const secondary = red["700"];

const theme = createMuiTheme({

  palette: {
    background: {
      default: '#f2f2f2'
    },
    primary: {
      main: primary
    },
    secondary: {
      main: secondary
    }
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
