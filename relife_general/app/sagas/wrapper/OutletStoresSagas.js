import { put, call } from 'redux-saga/effects'

import { outletStoresService } from '../../services'
import OutletStoresActions from '../../redux/wrapper/OutletStoresRedux'

const OutletStoresSagas = {
  *getStores({ data }) {
    try {
      let response = yield call(outletStoresService.getStores, data)
      yield put(
        OutletStoresActions.outletStoresGetSuccess(
          response.data,
          (response.data.isGetStore = true)
        )
      )
    } catch (err) {
      yield put(OutletStoresActions.outletStoresGetFailure(err))
    }
  }
}

export default OutletStoresSagas
