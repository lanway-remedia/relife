/**
 * @author Nam NH
 * This file combines all reducers and create redux store
 */

import { combineReducers } from 'redux'
import { reducer as modal } from 'redux-modal'
import configureStore from './configureStore'
import rootSaga from '../sagas/'

export default () => {
  const rootReducer = combineReducers({
    modal,
    listLanguages: require('./wrapper/ListLanguagesRedux').reducer,
    setLanguage: require('./wrapper/SetLanguageRedux').reducer,
    auths: require('./wrapper/AuthsRedux').reducer,
    users: require('./wrapper/UsersRedux').reducer,
    userProfile: require('./wrapper/UserProfileRedux').reducer,
    outletStores: require('./wrapper/OutletStoresRedux').reducer,
    locations: require('./wrapper/LocationsRedux').reducer,
    exampleHouses: require('./wrapper/ExampleHousesRedux').reducer,
    attributes: require('./wrapper/AttributesRedux').reducer,
    tags: require('./wrapper/TagsRedux').reducer
  })

  return configureStore(rootReducer, rootSaga)
}
