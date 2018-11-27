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
  },

  *editUser({ data }) {
    try {
      let response = yield call(usersService.editUser, data)
      response.data.editUser = true
      yield put(UsersActions.usersSuccess(response.data))
    } catch (err) {
      yield put(UsersActions.usersFailure(err))
    }
  },

  *findUserById({ id }) {
    try {
      let response = yield call(usersService.findUserById, id)
      response.data.findUserById = true
      yield put(UsersActions.usersSuccess(response.data))
    } catch (err) {
      yield put(UsersActions.usersFailure(err))
    }
  }
}

export default UsersSagas
