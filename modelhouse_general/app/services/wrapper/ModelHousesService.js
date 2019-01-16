import apiClient from '../../shared/apiClient'
export default class ModelHousesService {
  listModelHouses(data) {
    let search = new URLSearchParams(data)
    return apiClient.get(
      `/modelhouses/?${search}`
    )
  }
}
