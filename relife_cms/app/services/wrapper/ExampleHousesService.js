/**
 * @author HaPV
 */

import apiClient from '../../shared/apiClient'

export default class ExampleHousesService {
  getHouseList(data) {
    let search = new URLSearchParams(data)
    return apiClient.get(`/examplehouses/v1/?${search.toString()}`)
    // return apiClient.get(
    //   `/examplehouses/v1/?limit=${data.limit}&offset=${data.offset}`
    // )
  }
  getHouseById(data) {
    return apiClient.get(`/examplehouses/v1/${data}`)
  }
  addHouse(data) {
    return apiClient.post(`/examplehouses/v1/`, data)
  }
  editHouse(data) {
    return apiClient.put(`/examplehouses/v1/${data.get('id')}/`, data)
  }
  deleteHouse(data) {
    return apiClient.delete(`/examplehouses/v1/${data}`)
  }
}
