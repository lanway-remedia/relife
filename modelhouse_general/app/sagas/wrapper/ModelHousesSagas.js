import { put, call } from 'redux-saga/effects'

import { modelHousesService } from '../../services'
import ModelHousesActions from '../../redux/wrapper/ModelHousesRedux'

const ModelHousesSagas = {
  *listHouses( { data } ) {
    try {
      let response = yield call(modelHousesService.listModelHouses, data)
      yield put(
        ModelHousesActions.modelHousesListSuccess (
          response.data,
          (response.data.isGetListHouse = true)
        )
      )
    } catch (err) {
      yield put(ModelHousesActions.modelHousesListFailure(err))
    }
  }
}

export default ModelHousesSagas
