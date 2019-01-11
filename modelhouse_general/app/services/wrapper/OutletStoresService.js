import apiClient from '../../shared/apiClient'

export default class OutletStoresService {
  getStores(data) {
    return apiClient.get(`/outletstores/${data}`)
  }

  listStores(data) {
    let search = new URLSearchParams(data)
    return apiClient.get(`/outletstores/?${search.toString()}`)
  }

  contactStores(data) {
    return apiClient.post(`/outletstores/contacts/`, data)
  }
}
