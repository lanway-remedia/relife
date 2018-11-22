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
import { ExhibitionsTypes } from '../redux/wrapper/ExhibitionsRedux'
/* ------------- Sagas ------------- */
import ErrorSagas from './wrapper/ErrorSagas'
import LanguageSagas from './wrapper/LanguageSagas'
import AuthsSagas from './wrapper/AuthsSagas'
import UsersSagas from './wrapper/UsersSagas'
import UserProfileSagas from './wrapper/UserProfileSagas'
import OutletStoresSagas from './wrapper/OutletStoresSagas'
import ExhibitionsSagas from './wrapper/ExhibitionsSagas'
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
    takeLatest(AuthsTypes.LOGIN_REQUEST, AuthsSagas.login),
    takeLatest(AuthsTypes.FORGOT_PASSWORD_REQUEST, AuthsSagas.forgotPassword),
    takeLatest(AuthsTypes.RESET_PASSWORD_REQUEST, AuthsSagas.resetPassword),
    takeLatest(AuthsTypes.AUTHS_FAILURE, ErrorSagas.handleError),

    //user profile
    takeLatest(UserProfileTypes.PROFILE_REQUEST, UserProfileSagas.userProfile),
    takeLatest(UserProfileTypes.PROFILE_FAILURE, ErrorSagas.handleError),
    takeLatest(
      UserProfileTypes.EDIT_PROFILE_REQUEST,
      UserProfileSagas.editProfile
    ),
    takeLatest(UserProfileTypes.EDIT_PROFILE_FAILURE, ErrorSagas.handleError),
    takeLatest(
      UserProfileTypes.EDIT_PROFILE_AVATAR_REQUEST,
      UserProfileSagas.editProfileAvatar
    ),
    takeLatest(
      UserProfileTypes.EDIT_PROFILE_AVATAR_FAILURE,
      ErrorSagas.handleError
    ),

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

    //Exhibitions
    // Get List
    takeLatest(
      ExhibitionsTypes.EXHIBITION_LIST_REQUEST,
      ExhibitionsSagas.listExh
    ),
    takeLatest(
      ExhibitionsTypes.EXHIBITION_LIST_FAILURE,
      ErrorSagas.handleError
    ),
    //Get Store by ID
    takeLatest(
      ExhibitionsTypes.EXHIBITION_GET_REQUEST,
      ExhibitionsSagas.getExh
    ),
    takeLatest(ExhibitionsTypes.EXHIBITION_GET_FAILURE, ErrorSagas.handleError),
    //Add Store
    takeLatest(
      ExhibitionsTypes.EXHIBITION_ADD_REQUEST,
      ExhibitionsSagas.addExh
    ),
    takeLatest(ExhibitionsTypes.EXHIBITION_ADD_FAILURE, ErrorSagas.handleError),
    //Edit Store
    takeLatest(
      ExhibitionsTypes.EXHIBITION_EDIT_REQUEST,
      ExhibitionsSagas.editExh
    ),
    takeLatest(
      ExhibitionsTypes.EXHIBITION_EDIT_FAILURE,
      ErrorSagas.handleError
    ),
    //Delete Store
    takeLatest(
      ExhibitionsTypes.EXHIBITION_DELETE_REQUEST,
      ExhibitionsSagas.deleteExh
    ),
    takeLatest(
      ExhibitionsTypes.EXHIBITION_DELETE_FAILURE,
      ErrorSagas.handleError
    ),

    //user
    takeLatest(UsersTypes.USER_LIST_REQUEST, UsersSagas.listUser),
    takeLatest(UsersTypes.ADD_USER_REQUEST, UsersSagas.addUser),
    takeLatest(UsersTypes.USERS_FAILURE, ErrorSagas.handleError)
  ]
}
