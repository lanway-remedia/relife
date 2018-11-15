/**
 * @author Nam NH
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { userProfileService } from '../../services'
import UserProfileActions from '../../redux/wrapper/UserProfileRedux'

const UserProfileSagas = {
  *userProfile({ data }) {
    try {
      let response = yield call(userProfileService.getUserProfile, data)
      yield put(UserProfileActions.profileSuccess(response.data))
    } catch (err) {
      yield put(UserProfileActions.profileFailure(err))
    }
  }
}

export default UserProfileSagas
