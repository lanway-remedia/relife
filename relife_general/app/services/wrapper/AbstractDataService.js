/**
 * @author Nam NH
 * AbstractDataService is base class for services using data from localstorage
 */

import _ from 'lodash'

export default class AbstractDataService {
  constructor(dataKey) {
    this.dataKey = dataKey
  }

  getById(id, needAttachInfo = false) {
    let data = this.getOwnData()
    let res = _.find(data, { 'id': id })

    if (needAttachInfo) {
      this.attachInfo(res)
    }
    return res
  }

  getList(condition, needAttachInfo = false) {
    let res = _.filter(this.getOwnData(), condition)

    if (needAttachInfo) {
      this.attachInfoForList(res)
    }
    return res
  }

  getListByIds(ids, needAttachInfo = false) {
    return this.getList((element) => {
      return _.includes(ids, element.id)
    }, needAttachInfo)
  }

  // eslint-disable-next-line no-unused-vars
  search(searchKey, needAttachInfo = true) {
    throw new Error('Not Implemented')
  }

  // eslint-disable-next-line no-unused-vars
  attachInfo(element) {}

  attachInfoForList(elements) {
    _.each(elements, (element) => {
      this.attachInfo(element)
    })
  }

  // PRIVATE METHODS
  getOwnData() {
    return this.getDataFromStorage(this.dataKey)
  }

  getDataFromStorage(key) {
    return JSON.parse(localStorage.getItem(key))
  }
}
