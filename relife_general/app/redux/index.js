/**
 * @author Nam NH
 * This file combines all reducers and create redux store
 */

import { combineReducers } from 'redux'

import configureStore from './configureStore'
import rootSaga from '../sagas/'

export default () => {
  const rootReducer = combineReducers({
    listLanguages: require('./language/ListLanguagesRedux').reducer,
    setLanguage: require('./language/SetLanguageRedux').reducer,
    login: require('./login/LoginRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
