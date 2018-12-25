/**
 * @author Cuonglb
 * Task Confirmation
 */

import { createReducer, createActions } from 'reduxsauce'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  userListRequest: ['data'],
  addUserRequest: ['data'],
  editUserRequest: ['data'],
  deleteUserRequest: ['id'],
  findUserById: ['id'],
  usersSuccess: ['data'],
  usersFailure: ['error']
})

export const UsersTypes = Types
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
  [Types.USER_LIST_REQUEST]: request,
  [Types.ADD_USER_REQUEST]: request,
  [Types.EDIT_USER_REQUEST]: request,
  [Types.DELETE_USER_REQUEST]: request,
  [Types.FIND_USER_BY_ID]: request,
  [Types.USERS_SUCCESS]: success,
  [Types.USERS_FAILURE]: failure
})
