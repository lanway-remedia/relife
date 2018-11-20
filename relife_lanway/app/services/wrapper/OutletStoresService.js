/**
 * @author HaPV
 */

import apiClient from '../../shared/apiClient'

export default class OutletStoresService {
  listStore(data) {
    return apiClient.get(
      `/outletstores/?${data.page ? `page=${data.page}` : ''}${
        data.page_size ? `&page_size=${data.page_size}` : ''
      }`
    )
  }
  addStore(data) {
    return apiClient.post(`/outletstores/`, data)
  }
  deleteStore(data) {
    return apiClient.delete(`/outletstores/${data}`)
  }
}
