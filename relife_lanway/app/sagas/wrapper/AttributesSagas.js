/**
 * @author HaPV
 * TodoSagas
 */

import { put, call } from 'redux-saga/effects'

import { attributesService } from '../../services'
import AttributeActions from '../../redux/wrapper/AttributesRedux'

const AttributesSagas = {
  *listContruction({ data }) {
    try {
      let response = yield call(attributesService.listContruction, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isGetList = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *getContruction({ data }) {
    try {
      let response = yield call(attributesService.getContruction, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isGetId = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *addContruction({ data }) {
    try {
      let response = yield call(attributesService.addContruction, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isAdd = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *editContruction({ data }) {
    try {
      let response = yield call(attributesService.editContruction, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isEdit = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *deleteContruction({ data }) {
    try {
      let response = yield call(attributesService.deleteContruction, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isDelete = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *listFloor({ data }) {
    try {
      let response = yield call(attributesService.listFloor, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isGetList = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *getFloor({ data }) {
    try {
      let response = yield call(attributesService.getFloor, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isGetId = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *addFloor({ data }) {
    try {
      let response = yield call(attributesService.addFloor, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isAdd = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *editFloor({ data }) {
    try {
      let response = yield call(attributesService.editFloor, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isEdit = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *deleteFloor({ data }) {
    try {
      let response = yield call(attributesService.deleteFloor, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isDelete = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *listPrice({ data }) {
    try {
      let response = yield call(attributesService.listPrice, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isGetList = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *getPrice({ data }) {
    try {
      let response = yield call(attributesService.getPrice, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isGetId = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *addPrice({ data }) {
    try {
      let response = yield call(attributesService.addPrice, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isAdd = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *editPrice({ data }) {
    try {
      let response = yield call(attributesService.editPrice, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isEdit = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *deletePrice({ data }) {
    try {
      let response = yield call(attributesService.deletePrice, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isDelete = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *listStyle({ data }) {
    try {
      let response = yield call(attributesService.listStyle, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isGetList = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *getStyle({ data }) {
    try {
      let response = yield call(attributesService.getStyle, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isGetId = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *addStyle({ data }) {
    try {
      let response = yield call(attributesService.addStyle, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isAdd = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *editStyle({ data }) {
    try {
      let response = yield call(attributesService.editStyle, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isEdit = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *deleteStyle({ data }) {
    try {
      let response = yield call(attributesService.deleteStyle, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isDelete = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *listHouseIncome({ data }) {
    try {
      let response = yield call(attributesService.listHouseIncome, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isGetList = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *getHouseIncome({ data }) {
    try {
      let response = yield call(attributesService.getHouseIncome, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isGetId = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *addHouseIncome({ data }) {
    try {
      let response = yield call(attributesService.addHouseIncome, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isAdd = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *editHouseIncome({ data }) {
    try {
      let response = yield call(attributesService.editHouseIncome, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isEdit = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *deleteHouseIncome({ data }) {
    try {
      let response = yield call(attributesService.deleteHouseIncome, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isDelete = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *listHouseSize({ data }) {
    try {
      let response = yield call(attributesService.listHouseSize, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isGetList = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *getHouseSize({ data }) {
    try {
      let response = yield call(attributesService.getHouseSize, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isGetId = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *addHouseSize({ data }) {
    try {
      let response = yield call(attributesService.addHouseSize, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isAdd = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *editHouseSize({ data }) {
    try {
      let response = yield call(attributesService.editHouseSize, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isEdit = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  },
  *deleteHouseSize({ data }) {
    try {
      let response = yield call(attributesService.deleteHouseSize, data)
      yield put(
        AttributeActions.attributetSuccess(
          response.data,
          (response.data.isDelete = true)
        )
      )
    } catch (err) {
      yield put(AttributeActions.attributeFailure(err))
    }
  }
}

export default AttributesSagas
