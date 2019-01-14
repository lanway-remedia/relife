/**
 * @author NamNH
 */

import { put, call } from 'redux-saga/effects'

import { mostSearchedService } from '../../services'
import MostSearchedActions from '../../redux/wrapper/MostSearchedRedux'

const MostSearchedSagas = {
  *mostSearched({ data }) {
    try {
      let response = yield call(mostSearchedService.mostSearched, data)
      yield put(
        MostSearchedActions.success(
          response.data,
          (response.data.mostSearched = true)
        )
      )
    } catch (err) {
      yield put(MostSearchedActions.failure(err))
    }
  }
}

export default MostSearchedSagas
