/**
 * @author EAS
 * Saga index: connects action type and saga
 */

import { takeLatest } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { ListLanguagesTypes } from '../redux/wrapper/ListLanguagesRedux'
import { SetLanguageTypes } from '../redux/wrapper/SetLanguageRedux'
import { AuthsTypes } from '../redux/wrapper/AuthsRedux'
import { UsersTypes } from '../redux/wrapper/UsersRedux'
import { UserProfileTypes } from '../redux/wrapper/UserProfileRedux'
import { OutletStoresTypes } from '../redux/wrapper/OutletStoresRedux'
import { LocationTypes } from '../redux/wrapper/LocationsRedux'
import { ExampleHouseTypes } from '../redux/wrapper/ExampleHousesRedux'
/* ------------- Sagas ------------- */
import ErrorSagas from './wrapper/ErrorSagas'
import LanguageSagas from './wrapper/LanguageSagas'
import AuthsSagas from './wrapper/AuthsSagas'
import UsersSagas from './wrapper/UsersSagas'
import UserProfileSagas from './wrapper/UserProfileSagas'
import OutletStoresSagas from './wrapper/OutletStoresSagas'
import LocationsSagas from './wrapper/LocationsSagas'
import ExampleHousesSagas from './wrapper/ExampleHousesSagas'
/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield [
    //language
    takeLatest(SetLanguageTypes.SET_LANGUAGE_REQUEST, LanguageSagas.set),
    takeLatest(SetLanguageTypes.SET_LANGUAGE_FAILURE, ErrorSagas.handleError),
    takeLatest(ListLanguagesTypes.LIST_LANGUAGES_REQUEST, LanguageSagas.list),
    takeLatest(
      ListLanguagesTypes.LIST_LANGUAGES_FAILURE,
      ErrorSagas.handleError
    ),

    //authentication
    takeLatest(AuthsTypes.REGISTER_REQUEST, AuthsSagas.register),
    takeLatest(AuthsTypes.LOGIN_REQUEST, AuthsSagas.login),
    takeLatest(AuthsTypes.FORGOT_PASSWORD_REQUEST, AuthsSagas.forgotPassword),
    takeLatest(AuthsTypes.RESET_PASSWORD_REQUEST, AuthsSagas.resetPassword),
    takeLatest(AuthsTypes.AUTHS_FAILURE, ErrorSagas.handleError),

    //user profile
    takeLatest(UserProfileTypes.PROFILE_REQUEST, UserProfileSagas.userProfile),
    takeLatest(
      UserProfileTypes.EDIT_PROFILE_REQUEST,
      UserProfileSagas.editProfile
    ),
    takeLatest(
      UserProfileTypes.EDIT_PROFILE_AVATAR_REQUEST,
      UserProfileSagas.editProfileAvatar
    ),
    takeLatest(
      UserProfileTypes.CHANGE_PASS_REQUEST,
      UserProfileSagas.changePass
    ),
    takeLatest(UserProfileTypes.PROFILE_FAILURE, ErrorSagas.handleError),

    //OutletStore
    // Get List
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_LIST_REQUEST,
      OutletStoresSagas.listStore
    ),
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_LIST_FAILURE,
      ErrorSagas.handleError
    ),
    //Get Store by ID
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_GET_REQUEST,
      OutletStoresSagas.getStore
    ),
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_GET_FAILURE,
      ErrorSagas.handleError
    ),
    //Add Store
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_ADD_REQUEST,
      OutletStoresSagas.addStore
    ),
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_ADD_FAILURE,
      ErrorSagas.handleError
    ),
    //Edit Store
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_EDIT_REQUEST,
      OutletStoresSagas.editStore
    ),
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_EDIT_FAILURE,
      ErrorSagas.handleError
    ),
    //Delete Store
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_DELETE_REQUEST,
      OutletStoresSagas.deleteStore
    ),
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_DELETE_FAILURE,
      ErrorSagas.handleError
    ),

    //ExampleHouses
    //List
    takeLatest(
      ExampleHouseTypes.EXAMPLE_HOUSE_LIST_REQUEST,
      ExampleHousesSagas.getHouseList
    ),
    //Get
    takeLatest(
      ExampleHouseTypes.EXAMPLE_HOUSE_GET_REQUEST,
      ExampleHousesSagas.getHouseById
    ),
    //Add
    takeLatest(
      ExampleHouseTypes.EXAMPLE_HOUSE_ADD_REQUEST,
      ExampleHousesSagas.addHouse
    ),
    //Edit
    takeLatest(
      ExampleHouseTypes.EXAMPLE_HOUSE_EDIT_REQUEST,
      ExampleHousesSagas.editHouse
    ),
    //Delete
    takeLatest(
      ExampleHouseTypes.EXAMPLE_HOUSE_DELETE_REQUEST,
      ExampleHousesSagas.deleteHouse
    ),
    takeLatest(ExampleHouseTypes.EXAMPLE_HOUSE_FAILURE, ErrorSagas.handleError),

    //Locations
    //List Location
    takeLatest(
      LocationTypes.LOCATION_LIST_REQUEST,
      LocationsSagas.listLocation
    ),
    //Get Location
    takeLatest(LocationTypes.LOCATION_GET_REQUEST, LocationsSagas.getLocation),
    //Add Location
    takeLatest(LocationTypes.LOCATION_ADD_REQUEST, LocationsSagas.addLocation),
    //Edit Location
    takeLatest(
      LocationTypes.LOCATION_EDIT_REQUEST,
      LocationsSagas.editLocation
    ),
    //Delete Location
    takeLatest(
      LocationTypes.LOCATION_DELETE_REQUEST,
      LocationsSagas.deleteLocation
    ),
    takeLatest(LocationTypes.LOCATION_FAILURE, ErrorSagas.handleError),

    //user
    takeLatest(UsersTypes.USER_LIST_REQUEST, UsersSagas.listUser),
    takeLatest(UsersTypes.ADD_USER_REQUEST, UsersSagas.addUser),
    takeLatest(UsersTypes.EDIT_USER_REQUEST, UsersSagas.editUser),
    takeLatest(UsersTypes.DELETE_USER_REQUEST, UsersSagas.deleteUser),
    takeLatest(UsersTypes.FIND_USER_BY_ID, UsersSagas.findUserById),
    takeLatest(UsersTypes.USERS_FAILURE, ErrorSagas.handleError)
  ]
}
