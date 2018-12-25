/**
 * @author Nam NH
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import {loginService} from '../services'
import LoginActions from '../redux/login/LoginRedux'

const LoginSagas = {
  *login({ email, password }) {
    try {
      let response = yield call(loginService.login, email, password)
      yield put(LoginActions.loginSuccess(response.data))
    } catch (err) {
      yield put(LoginActions.loginFailure(err))
    }
  }
}

export default LoginSagas
