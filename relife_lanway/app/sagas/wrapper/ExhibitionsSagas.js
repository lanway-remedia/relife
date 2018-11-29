/**
 * @author HaPV
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { exhibitionsService } from '../../services'
import ExhibitionsActions from '../../redux/wrapper/ExhibitionsRedux'

const ExhibitionsSagas = {
  *listExh({ data }) {
    try {
      let response = yield call(exhibitionsService.listExh, data)
      yield put(
        ExhibitionsActions.exhibitionListSuccess(
          response.data,
          (response.data.isGetList = true)
        )
      )
    } catch (err) {
      yield put(ExhibitionsActions.exhibitionListFailure(err))
    }
  },
  *getExh({ data }) {
    try {
      let response = yield call(exhibitionsService.getExh, data)
      yield put(
        ExhibitionsActions.exhibitionGetSuccess(
          response.data,
          (response.data.isGetId = true)
        )
      )
    } catch (err) {
      yield put(ExhibitionsActions.exhibitionGetFailure(err))
    }
  },
  *addExh({ data }) {
    try {
      let response = yield call(exhibitionsService.addExh, data)
      yield put(
        ExhibitionsActions.exhibitionAddSuccess(
          response.data,
          (response.data.isAdd = true)
        )
      )
    } catch (err) {
      yield put(ExhibitionsActions.exhibitionAddFailure(err))
    }
  },
  *editExh({ data }) {
    try {
      let response = yield call(exhibitionsService.editExh, data)
      yield put(
        ExhibitionsActions.exhibitionEditSuccess(
          response.data,
          (response.data.isEdit = true)
        )
      )
    } catch (err) {
      yield put(ExhibitionsActions.exhibitionEditFailure(err))
    }
  },
  *deleteExh({ data }) {
    try {
      let response = yield call(exhibitionsService.deleteExh, data)
      yield put(
        ExhibitionsActions.exhibitionDeleteSuccess(
          response.data,
          (response.data.isDelete = true)
        )
      )
    } catch (err) {
      yield put(ExhibitionsActions.exhibitionDeleteFailure(err))
    }
  }
}

export default ExhibitionsSagas
