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
  },
  *listStores( { data } ) {
    try {
      let response = yield call(outletStoresService.listStores, data)
      yield put(
        OutletStoresActions.outletStoresListSuccess (
          response.data,
          (response.data.isGetListStores = true)
        )
      )
    } catch (err) {
      yield put(OutletStoresActions.outletStoresListFailure(err))
    }
  },
  *contactStores({ data }) {
    try {
      let response = yield call(outletStoresService.contactStores, data)
      yield put(
        OutletStoresActions.outletStoresContactSuccess(
          response.data,
          (response.data.isContactStores = true)
        )
      )
    } catch (err) {
      yield put(OutletStoresActions.outletStoresContactFailure(err))
    }
  },
}

export default OutletStoresSagas
