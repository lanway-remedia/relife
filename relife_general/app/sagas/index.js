/**
 * @author EAS
 * Saga index: connects action type and saga
 */

import { takeLatest } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { ListLanguagesTypes } from '../redux/wrapper/ListLanguagesRedux'
import { SetLanguageTypes } from '../redux/wrapper/SetLanguageRedux'
import { AuthsTypes } from '../redux/wrapper/AuthsRedux'
import { ProfileTypes } from '../redux/wrapper/ProfileRedux'
import { LocationTypes } from '../redux/wrapper/LocationsRedux'
import { ExampleHousesTypes } from '../redux/wrapper/ExampleHousesRedux'
import { OutletStoresTypes } from '../redux/wrapper/OutletStoresRedux'
/* ------------- Sagas ------------- */
import ErrorSagas from './wrapper/ErrorSagas'
import LanguageSagas from './wrapper/LanguageSagas'
import AuthsSagas from './wrapper/AuthsSagas'
import ProfileSagas from './wrapper/ProfileSagas'
import LocationsSagas from './wrapper/LocationsSagas'
import { AttributeTypes } from '../redux/wrapper/AttributesRedux'
import AttributesSagas from './wrapper/AttributesSagas'
import ExampleHousesSagas from './wrapper/ExampleHousesSagas'
import OutletStoresSagas from './wrapper/OutletStoresSagas'
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
    takeLatest(ProfileTypes.PROFILE_REQUEST, ProfileSagas.getProfile),
    takeLatest(
      ProfileTypes.EDIT_PROFILE_REQUEST,
      ProfileSagas.editProfile
    ),
    takeLatest(
      ProfileTypes.EDIT_PROFILE_AVATAR_REQUEST,
      ProfileSagas.editProfileAvatar
    ),
    takeLatest(ProfileTypes.CHANGE_PASS_REQUEST, ProfileSagas.changePass),
    takeLatest(ProfileTypes.PROFILE_FAILURE, ErrorSagas.handleError),

    //Locations
    //List Location
    takeLatest(
      LocationTypes.LOCATION_LIST_REQUEST,
      LocationsSagas.listLocation
    ),
    takeLatest(LocationTypes.LOCATION_FAILURE, ErrorSagas.handleError),

    //Attributes
    // Get List Contruction
    takeLatest(
      AttributeTypes.ATTRIBUTE_CONTRUCTION_LIST_REQUEST,
      AttributesSagas.listContruction
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),

     // Get List Floor
     takeLatest(
      AttributeTypes.ATTRIBUTE_FLOOR_LIST_REQUEST,
      AttributesSagas.listFloor
    ),

    // Get List Style
    takeLatest(
      AttributeTypes.ATTRIBUTE_STYLE_LIST_REQUEST,
      AttributesSagas.listStyle
    ),

    // Get List Price
    takeLatest(
      AttributeTypes.ATTRIBUTE_PRICE_LIST_REQUEST,
      AttributesSagas.listPrice
    ),

    // Get List Household Income
    takeLatest(
      AttributeTypes.ATTRIBUTE_HOUSE_INCOME_LIST_REQUEST,
      AttributesSagas.listHouseIncome
    ),

    // Get List Household Size
    takeLatest(
      AttributeTypes.ATTRIBUTE_HOUSE_SIZE_LIST_REQUEST,
      AttributesSagas.listHouseSize
    ),

    // Example House
    // Get List Example House
    takeLatest(
      ExampleHousesTypes.EXAMPLE_HOUSES_LIST_REQUEST,
      ExampleHousesSagas.getHouseList
    ),
    takeLatest(
      ExampleHousesTypes.EXAMPLE_HOUSES_GET_REQUEST,
      ExampleHousesSagas.getHouseById
    ),
    takeLatest(
      ExampleHousesTypes.EXAMPLE_HOUSES_LIST_BY_STORE_REQUEST,
      ExampleHousesSagas.getHouseByStoreId
    ),

    //Outlet Stores
    // Get Outlet Store
    takeLatest(
      OutletStoresTypes.OUTLET_STORES_GET_REQUEST,
      OutletStoresSagas.getStores
    ),

    // Get List Outlet Store
    takeLatest(
      OutletStoresTypes.OUTLET_STORES_LIST_REQUEST,
      OutletStoresSagas.listStores
    )
  ]
}
