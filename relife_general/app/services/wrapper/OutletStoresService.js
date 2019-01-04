import apiClient from '../../shared/apiClient'

export default class OutletStoresService {
  getStores(data) {
    return apiClient.get(`/outletstores/${data}`)
  }

  listStores(data) {
    return apiClient.get(`/outletstores/?limit=${data.limit}&offset=${data.offset}`)
  }

  contactStores(data) {
    console.log(data)
    return apiClient.post(`/outletstores/contacts/`, data)
  }
}
