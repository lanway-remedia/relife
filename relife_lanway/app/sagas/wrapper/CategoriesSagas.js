/**
 * @author HaPV
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { categoriesService } from '../../services'
import CateActions from '../../redux/wrapper/CategoriesRedux'

const CategoriesSagas = {
  *listCate({ data }) {
    try {
      let response = yield call(categoriesService.listCate, data)
      console.log(response)
      yield put(
        CateActions.cateListSuccess(
          response.data,
          (response.data.isGetList = true)
        )
      )
    } catch (err) {
      yield put(CateActions.cateListFailure(err))
    }
  },
  *getCate({ data }) {
    try {
      let response = yield call(categoriesService.getCate, data)
      yield put(
        CateActions.cateGetSuccess(
          response.data,
          (response.data.isGetId = true)
        )
      )
    } catch (err) {
      yield put(CateActions.cateGetFailure(err))
    }
  },
  *addCate({ data }) {
    try {
      let response = yield call(categoriesService.addCate, data)
      yield put(
        CateActions.cateAddSuccess(response.data, (response.data.isAdd = true))
      )
    } catch (err) {
      yield put(CateActions.cateAddFailure(err))
    }
  },
  *editCate({ data }) {
    try {
      let response = yield call(categoriesService.editCate, data)
      yield put(
        CateActions.cateEditSuccess(
          response.data,
          (response.data.isEdit = true)
        )
      )
    } catch (err) {
      yield put(CateActions.cateEditFailure(err))
    }
  },
  *deleteCate({ data }) {
    try {
      let response = yield call(categoriesService.deleteCate, data)
      yield put(
        CateActions.cateDeleteSuccess(
          response.data,
          (response.data.isDelete = true)
        )
      )
    } catch (err) {
      yield put(CateActions.cateDeleteFailure(err))
    }
  }
}

export default CategoriesSagas
