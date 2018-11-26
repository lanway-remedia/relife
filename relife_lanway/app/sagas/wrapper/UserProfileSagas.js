/**
 * @author HaPV
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { userProfileService } from '../../services'
import UserProfileActions from '../../redux/wrapper/UserProfileRedux'

const UserProfileSagas = {
  *userProfile({ data }) {
    try {
      let response = yield call(userProfileService.getUserProfile, data)
      response.data.getProfile = true
      yield put(UserProfileActions.profileSuccess(response.data))
    } catch (err) {
      yield put(UserProfileActions.profileFailure(err))
    }
  },
  *editProfile({ data }) {
    try {
      let response = yield call(userProfileService.editUserProfile, data)
      response.data.editProfile = true
      yield put(UserProfileActions.editProfileSuccess(response.data))
    } catch (err) {
      yield put(UserProfileActions.editProfileFailure(err))
    }
  },
  *editProfileAvatar({ data }) {
    try {
      let response = yield call(userProfileService.editAvatarProfile, data)
      response.data.editProfileImage = true
      yield put(UserProfileActions.editProfileAvatarSuccess(response.data))
    } catch (err) {
      yield put(UserProfileActions.editProfileAvatarFailure(err))
    }
  }
}

export default UserProfileSagas
