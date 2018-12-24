/**
 * @author Nam NH
 * ErrorSagas: saga to handle general errors
 */

import { call } from 'redux-saga/effects'

import I18nUtils from '../utils/I18nUtils'

const ErrorSagas = {
  *handleError(action) {
    const err = action.error

    if (!err.response) {
      //yield call(alert, err)
      return
    }

    let data = err.response.data

    let postFix = I18nUtils.getLocalePostFix()
    let message = data.message[postFix]
    yield call(alert, message)
  }
}

export default ErrorSagas
