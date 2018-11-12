import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import App from './App'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import RootReducer from './store/reducers/rootReducer'

const store = createStore(RootReducer)

const app = (
  <Provider store={store}>
    <App/>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
