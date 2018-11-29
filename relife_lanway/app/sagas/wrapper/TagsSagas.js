/**
 * @author HaPV
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { tagsService } from '../../services'
import TagActions from '../../redux/wrapper/TagsRedux'

const TagsSagas = {
  *listTag({ data }) {
    try {
      let response = yield call(tagsService.listTag, data)
      yield put(
        TagActions.tagListSuccess(
          response.data,
          (response.data.isGetList = true)
        )
      )
    } catch (err) {
      yield put(TagActions.tagListFailure(err))
    }
  },
  *getTag({ data }) {
    try {
      let response = yield call(tagsService.getTag, data)
      yield put(
        TagActions.tagGetSuccess(response.data, (response.data.isGetId = true))
      )
    } catch (err) {
      yield put(TagActions.tagGetFailure(err))
    }
  },
  *addTag({ data }) {
    try {
      let response = yield call(tagsService.addTag, data)
      yield put(
        TagActions.tagAddSuccess(response.data, (response.data.isAdd = true))
      )
    } catch (err) {
      yield put(TagActions.tagAddFailure(err))
    }
  },
  *editTag({ data }) {
    try {
      let response = yield call(tagsService.editTag, data)
      yield put(
        TagActions.tagEditSuccess(response.data, (response.data.isEdit = true))
      )
    } catch (err) {
      yield put(TagActions.tagEditFailure(err))
    }
  },
  *deleteTag({ data }) {
    try {
      let response = yield call(tagsService.deleteTag, data)
      yield put(
        TagActions.tagDeleteSuccess(
          response.data,
          (response.data.isDelete = true)
        )
      )
    } catch (err) {
      yield put(TagActions.tagDeleteFailure(err))
    }
  }
}

export default TagsSagas
