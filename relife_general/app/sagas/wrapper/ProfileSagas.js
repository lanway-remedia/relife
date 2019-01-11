/**
 * @author HaPV
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { profileService } from '../../services'
import ProfileActions from '../../redux/wrapper/ProfileRedux'

const ProfileSagas = {
  *getProfile({ data }) {
    try {
      let response = yield call(profileService.getProfile, data)
      response.data.getProfile = true
      yield put(ProfileActions.profileSuccess(response.data))
    } catch (err) {
      yield put(ProfileActions.profileFailure(err))
    }
  },
  *editProfile({ data }) {
    try {
      let response = yield call(profileService.editProfile, data)
      response.data.editProfile = true
      yield put(ProfileActions.profileSuccess(response.data))
    } catch (err) {
      yield put(ProfileActions.profileFailure(err))
    }
  },
  *editProfileAvatar({ data }) {
    try {
      let response = yield call(profileService.editAvatarProfile, data)
      response.data.editProfileImage = true
      yield put(ProfileActions.profileSuccess(response.data))
    } catch (err) {
      yield put(ProfileActions.profileFailure(err))
    }
  },
  *changePass ({ data }) {
    try {
      let response = yield call(profileService.changePass, data)
      response.data.changePass = true
      yield put(ProfileActions.profileSuccess(response.data))
    } catch (err) {
      yield put(ProfileActions.profileFailure(err))
    }
  },
  *becomeStore ({ data }) {
    try {
      let response = yield call(profileService.becomeStore, data)
      response.data.becomeStore = true
      yield put(ProfileActions.profileSuccess(response.data))
    } catch (err) {
      yield put(ProfileActions.profileFailure(err))
    }
  }

}

export default ProfileSagas
