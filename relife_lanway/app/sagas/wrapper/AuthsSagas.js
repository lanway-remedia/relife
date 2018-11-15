/**
 * @author Nam NH
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { authsService } from '../../services'
import AuthsActions from '../../redux/wrapper/AuthsRedux'

const AuthsSagas = {
  *login({ data }) {
    try {
      let response = yield call(authsService.login, data)
      response.data.login = true
      yield put(AuthsActions.authsSuccess(response.data))
    } catch (err) {
      yield put(AuthsActions.authsFailure(err))
    }
  },

  *forgotPassword({ data }) {
    try {
      let response = yield call(authsService.forgotPassword, data)
      response.data.forgotPassword = true
      yield put(AuthsActions.authsSuccess(response.data))
    } catch (err) {
      yield put(AuthsActions.authsFailure(err))
    }
  }
}

export default AuthsSagas
