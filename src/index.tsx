import * as React from 'react'
import * as ReactDOM from 'react-dom'
import JssProvider from 'react-jss/lib/JssProvider'
import {createMuiTheme, MuiThemeProvider, createGenerateClassName, jssPreset} from '@material-ui/core/styles'
import { create } from 'jss'
import CssBaseLine from '@material-ui/core/CssBaseline'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import RootReducer from './store/reducers/rootReducer'
import thunk from 'redux-thunk'
import red from '@material-ui/core/colors/red'

const styleNode = document.createComment('jss-insertion-point')

document.head.insertBefore(styleNode, document.head.firstChild)

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: true
})

const jss = create({
  ...jssPreset(),
  insertionPoint: 'jss-insertion-point'
})

const composeEnhancers =
  typeof window === 'object' &&
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
)

const store = createStore(RootReducer, enhancer)

const primary = red['500']
const secondary = red['700']

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
    <JssProvider jss={jss} generateClassName={generateClassName}>
      <MuiThemeProvider theme={theme}>
        <CssBaseLine/>
        <App/>
      </MuiThemeProvider>
    </JssProvider>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
