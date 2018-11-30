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
import {BrowserRouter} from "react-router-dom";


const store = createStore(RootReducer, compose(
  applyMiddleware(thunk),
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
))

const theme = createMuiTheme({

  palette: {
    background: {
      default: '#f2f2f2'
    },
    primary: {
      main: '#78909c'
    },
    secondary: {
      main: '#00e676'
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
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </MuiThemeProvider>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
