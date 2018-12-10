/**
 * @author EAS
 * Saga index: connects action type and saga
 */

import { takeLatest } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { ListLanguagesTypes } from '../redux/language/ListLanguagesRedux'
import { SetLanguageTypes } from '../redux/language/SetLanguageRedux'
import { LoginTypes } from '../redux/login/LoginRedux'
/* ------------- Sagas ------------- */
import ErrorSagas from '../sagas/ErrorSagas'
import LanguageSagas from '../sagas/LanguageSagas'
import LoginSagas from '../sagas/LoginSagas'
/* ------------- Connect Types To Sagas ------------- */
export default function * root () {
  yield [
    takeLatest(SetLanguageTypes.SET_LANGUAGE_REQUEST, LanguageSagas.set),
    takeLatest(SetLanguageTypes.SET_LANGUAGE_FAILURE, ErrorSagas.handleError),
    takeLatest(ListLanguagesTypes.LIST_LANGUAGES_REQUEST, LanguageSagas.list),
    takeLatest(ListLanguagesTypes.LIST_LANGUAGES_FAILURE, ErrorSagas.handleError),

    takeLatest(LoginTypes.LOGIN_REQUEST, LoginSagas.login),
    takeLatest(LoginTypes.LOGIN_FAILURE, ErrorSagas.handleError)
  ]
}
