import apiClient from '../../shared/apiClient'

export default class OutletStoresService {
  getStores(data) {
    return apiClient.get(`/outletstores/${data}`)
  }
}
