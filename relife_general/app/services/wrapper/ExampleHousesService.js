import apiClient from '../../shared/apiClient'
export default class ExampleHousesService {
  listExampleHouses(data) {
    return apiClient.get(
      `/examplehouses/v1/?limit=${data.limit}&offset=${data.offset}`
    )
  }

  getExampleHousesById(data) {
    return apiClient.get(`/examplehouses/v1/${data}`)
  }
}
