/**
 * @author HaPV
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  profileRequest: ['data'],
  editProfileRequest: ['data'],
  editProfileAvatarRequest: ['data'],
  changePassRequest: ['data'],
  profileSuccess: ['data'],
  profileFailure: ['error']
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

/* ------------- Hookup Reducers To Types ------------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.PROFILE_REQUEST]: request,
  [Types.EDIT_PROFILE_REQUEST]: request,
  [Types.EDIT_PROFILE_AVATAR_REQUEST]: request,
  [Types.CHANGE_PASS_REQUEST]: request,
  [Types.PROFILE_SUCCESS]: success,
  [Types.PROFILE_FAILURE]: failure
})
