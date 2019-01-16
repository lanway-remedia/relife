import { put, call } from 'redux-saga/effects'

import { exhibitionsService } from '../../services'
import ExhibitonsActions from '../../redux/wrapper/ExhibitionsRedux'

const ExhibitionsSagas = {
  *listExhibitions( { data } ) {
    try {
      let response = yield call(exhibitionsService.listExhibitions, data)
      yield put(
        ExhibitonsActions.exhibitionsListSuccess (
          response.data,
          (response.data.isGetListExhibitions = true)
        )
      )
    } catch (err) {
      yield put(ExhibitonsActions.exhibitionsListFailure(err))
    }
  },
  *listExhibitionsByRegion( { data } ) {
    try {
      let response = yield call(exhibitionsService.listExhibitionsByRegion, data)
      yield put(
        ExhibitonsActions.exhibitionsListByRegionSuccess (
          response.data,
          (response.data.isGetListExhByRegion = true)
        )
      )
    } catch (err) {
      yield put(ExhibitonsActions.exhibitionsListByRegionFailure(err))
    }
  }
}

export default ExhibitionsSagas
