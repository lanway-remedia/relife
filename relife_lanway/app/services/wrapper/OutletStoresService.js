/**
 * @author HaPV
 */

import apiClient from '../../shared/apiClient'

export default class OutletStoresService {
  listStore(data) {
    return apiClient.get(
      `/outletstores/?limit=${data.limit}&offset=${data.offset}`
    )
  }
  getStore(data) {
    return apiClient.get(`/outletstores/${data}`)
  }
  addStore(data) {
    return apiClient.post(`/outletstores/`, data)
  }
  editStore(data) {
    return apiClient.put(`/outletstores/${data.get('id')}/`, data)
  }
  deleteStore(data) {
    return apiClient.delete(`/outletstores/${data}`)
  }
}
