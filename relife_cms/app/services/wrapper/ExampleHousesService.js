/**
 * @author HaPV
 */

import apiClient from '../../shared/apiClient'

export default class ExampleHousesService {
  getHouseList(data) {
    return apiClient.get(
      `/examplehouse/v1/?limit=${data.limit}&offset=${data.offset}`
    )
  }
  getHouseById(data) {
    return apiClient.get(`/examplehouse/v1/${data}`)
  }
  addHouse(data) {
    return apiClient.post(`/examplehouse/v1/`, data)
  }
  editHouse(data) {
    return apiClient.put(`/examplehouse/v1/${data.get('id')}/`, data)
  }
  deleteHouse(data) {
    return apiClient.delete(`/examplehouse/v1/${data}`)
  }
}
