/**
 * @author EAS
 * Saga index: connects action type and saga
 */

import { takeLatest } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { ListLanguagesTypes } from '../redux/wrapper/ListLanguagesRedux'
import { SetLanguageTypes } from '../redux/wrapper/SetLanguageRedux'
import { AuthsTypes } from '../redux/wrapper/AuthsRedux'
import { UserProfileTypes } from '../redux/wrapper/UserProfileRedux'

/* ------------- Sagas ------------- */
import ErrorSagas from './wrapper/ErrorSagas'
import LanguageSagas from './wrapper/LanguageSagas'
import AuthsSagas from './wrapper/AuthsSagas'
import UserProfileSagas from './wrapper/UserProfileSagas'

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
  ]
}
