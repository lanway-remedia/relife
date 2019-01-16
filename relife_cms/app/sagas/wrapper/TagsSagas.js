/**
 * @author HaPV
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { tagsService } from '../../services'
import TagActions from '../../redux/wrapper/TagsRedux'

const TagsSagas = {
  *listTag() {
    try {
      let response = yield call(tagsService.listTag)
      yield put(
        TagActions.tagSuccess(
          response.data,
          (response.data.isGetTagList = true)
        )
      )
    } catch (err) {
      yield put(TagActions.tagFailure(err))
    }
  }
}

export default TagsSagas
