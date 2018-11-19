/**
 * @author Nam NH
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { usersService } from '../../services'
import UsersActions from '../../redux/wrapper/UsersRedux'

const UsersSagas = {
  *listUser({ data }) {
    try {
      let response = yield call(usersService.listUser, data)
      response.data.listUser = true
      yield put(UsersActions.usersSuccess(response.data))
    } catch (err) {
      yield put(UsersActions.usersFailure(err))
    }
  },

  *addUser({ data }) {
    try {
      let response = yield call(usersService.addUser, data)
      response.data.addUser = true
      yield put(UsersActions.usersSuccess(response.data))
    } catch (err) {
      yield put(UsersActions.usersFailure(err))
    }
  }
}

export default UsersSagas
