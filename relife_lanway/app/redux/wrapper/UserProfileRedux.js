/**
 * @author HaPV
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  profileRequest: ['data'],
  profileSuccess: ['data'],
  editProfileRequest: ['data'],
  editProfileSuccess: ['data'],
  editProfileAvatarRequest: ['data'],
  editProfileAvatarSuccess: ['data'],
  profileFailure: ['error'],
  editProfileFailure: ['error'],
  editProfileAvatarFailure: ['error']
})

export const UserProfileTypes = Types
export default Creators

/* ------------- Initial State ------------- */
export const INITIAL_STATE = {
  processing: false,
  data: {},
  error: null
}

/* ------------- Reducers ------------- */
export const request = state => {
  return { ...state, processing: true }
}

export const success = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const failure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const editProfileRequest = state => {
  return { ...state, processing: true }
}

export const editProfileSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const editProfilefailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

export const editProfileAvatarRequest = state => {
  return { ...state, processing: true }
}

export const editProfileAvatarSuccess = (state, { data }) => {
  return { ...state, processing: false, data, error: null }
}

export const editProfileAvatarfailure = (state, { error }) => {
  return { ...state, processing: false, error }
}

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.PROFILE_REQUEST]: request,
  [Types.PROFILE_SUCCESS]: success,
  [Types.PROFILE_FAILURE]: failure,
  [Types.EDIT_PROFILE_REQUEST]: editProfileRequest,
  [Types.EDIT_PROFILE_SUCCESS]: editProfileSuccess,
  [Types.EDIT_PROFILE_FAILURE]: editProfilefailure,
  [Types.EDIT_PROFILE_AVATAR_REQUEST]: editProfileAvatarRequest,
  [Types.EDIT_PROFILE_AVATAR_SUCCESS]: editProfileAvatarSuccess,
  [Types.EDIT_PROFILE_AVATAR_FAILURE]: editProfileAvatarfailure
})
