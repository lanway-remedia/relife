import { put, call } from 'redux-saga/effects'

import { exampleHousesService } from '../../services'
import ExampleHousesActions from '../../redux/wrapper/ExampleHousesRedux'

const ExampleHousesSagas = {
  *getHouseList( {data} ) {
    try {
      let response = yield call(exampleHousesService.listExampleHouses, data)
      yield put(
        ExampleHousesActions.exampleHousesSuccess(
          response.data, 
          (response.data.isGetList = true)
        )
      )
    } catch (err) {
      yield put(ExampleHousesActions.exampleHousesFailure(err))
    }
  },
  *getHouseById( {data} ) {
    try {
      let response = yield call(exampleHousesService.getExampleHousesById, data)
      yield put(
        ExampleHousesActions.exampleHousesSuccess(
          response.data,
          (response.data.isGetHouse = true )
        )
      )
    } catch(err) {
      yield put(ExampleHousesActions.exampleHousesFailure(err))
    }
  },
  *getHouseByStoreId( {data} ) {
    try {
      let response = yield call(exampleHousesService.getExampleHousesByStoreId, data)
      yield put(
        ExampleHousesActions.exampleHousesListByStoreSuccess(
          response.data,
          (response.data.isListHouseByStore = true )
        )
      )
    } catch(err) {
      yield put(ExampleHousesActions.exampleHousesListByStoreFailure(err))
    }
  }
}

export default ExampleHousesSagas
