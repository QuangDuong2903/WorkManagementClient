import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Provider } from 'react-redux'

// import { store, persistor } from './app/store'
// import { PersistGate } from 'redux-persist/integration/react'

import { store } from './app/store'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Provider store={store}>
  //   <PersistGate persistor={persistor}>
  //     <App/>
  //   </PersistGate>
  // </Provider>
  <Provider store={store}>
    <App />
  </Provider>
)
