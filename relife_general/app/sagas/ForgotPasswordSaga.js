/**
 * @author HaPV
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { forgotPasswordService } from '../services/ForgotPasswordService'
import ForgotPasswordActions from '../redux/forgotPassword/ForgotPasswordRedux'

const ForgotPasswordSagas = {
  *forgotPasword({ email }) {
    try {
      let response = yield call(forgotPasswordService.forgotPasword, email)
      yield put(ForgotPasswordActions.forgotSuccess(response.data))
    } catch (err) {
      yield put(ForgotPasswordActions.forgotFailure(err))
    }
  }
}

export default ForgotPasswordSagas
