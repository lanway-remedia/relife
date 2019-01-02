import apiClient from '../../shared/apiClient'
export default class ExampleHousesService {
  listExampleHouses(data) {
    let search = new URLSearchParams(data)
    console.log(search.toString())
    return apiClient.get(
      `/examplehouses/v1/?${search.toString()}`
    )
  }

  getExampleHousesById(data) {
    return apiClient.get(`/examplehouses/v1/${data}`)
  }

  getExampleHousesByStoreId(data) {
    return apiClient.get(
      `/examplehouses/v1/?limit=${data.limit}&offset=${data.offset}&store_id=${data.store_id}`
    )
  }
}
