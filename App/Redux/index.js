import { combineReducers } from 'redux'
import configureStore from './CreateStore'
import rootSaga from '../Sagas/'

/* ------------- Assemble The Reducers ------------- */
const appReducers = combineReducers({
  nav: require('./NavigationRedux').reducer,
  image: require('./ImageRedux').reducer,
  key: require('./KeyRedux').reducer,
  balance: require('./BalanceRedux').reducer,
  order: require('./OrderRedux').reducer,
  ticket: require('./TicketRedux').reducer
})

export const reducers = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined
  }
  return appReducers(state, action)
}

export default () => {
  let { store, sagasManager, sagaMiddleware } = configureStore(reducers, rootSaga)

  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./').reducers
      store.replaceReducer(nextRootReducer)

      const newYieldedSagas = require('../Sagas').default
      sagasManager.cancel()
      sagasManager.done.then(() => {
        sagasManager = sagaMiddleware.run(newYieldedSagas)
      })
    })
  }

  return store
}
