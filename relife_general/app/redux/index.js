/**
 * @author Nam NH
 * This file combines all reducers and create redux store
 */

import { combineReducers } from 'redux'

import configureStore from './configureStore'
import rootSaga from '../sagas/'

export default () => {
  const rootReducer = combineReducers({
    listLanguages: require('./wrapper/ListLanguagesRedux').reducer,
    setLanguage: require('./wrapper/SetLanguageRedux').reducer,
    auths: require('./wrapper/AuthsRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
