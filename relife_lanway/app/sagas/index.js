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
/* ------------- Sagas ------------- */
import ErrorSagas from './wrapper/ErrorSagas'
import LanguageSagas from './wrapper/LanguageSagas'
import AuthsSagas from './wrapper/AuthsSagas'
import UsersSagas from './wrapper/UsersSagas'
/* ------------- Connect Types To Sagas ------------- */
export default function * root () {
  yield [
    //language
    takeLatest(SetLanguageTypes.SET_LANGUAGE_REQUEST, LanguageSagas.set),
    takeLatest(SetLanguageTypes.SET_LANGUAGE_FAILURE, ErrorSagas.handleError),
    takeLatest(ListLanguagesTypes.LIST_LANGUAGES_REQUEST, LanguageSagas.list),
    takeLatest(ListLanguagesTypes.LIST_LANGUAGES_FAILURE, ErrorSagas.handleError),

    //authentication
    takeLatest(AuthsTypes.LOGIN_REQUEST, AuthsSagas.login),
    takeLatest(AuthsTypes.AUTHS_FAILURE, ErrorSagas.handleError),

    //user
    takeLatest(UsersTypes.USER_LIST_REQUEST, UsersSagas.listUser),
    takeLatest(UsersTypes.USERS_FAILURE, ErrorSagas.handleError)
  ]
}
