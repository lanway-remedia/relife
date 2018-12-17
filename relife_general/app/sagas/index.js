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
/* ------------- Sagas ------------- */
import ErrorSagas from './wrapper/ErrorSagas'
import LanguageSagas from './wrapper/LanguageSagas'
import AuthsSagas from './wrapper/AuthsSagas'
import ProfileSagas from './wrapper/ProfileSagas'
import LocationsSagas from './wrapper/LocationsSagas'
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
  ]
}
