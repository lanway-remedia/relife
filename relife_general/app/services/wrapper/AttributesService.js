/**
 * @author HaPV
 */

import apiClient from '../../shared/apiClient'

export default class AttributesService {
  listContruction(data) {
    return apiClient.get(
      `/attributes/contruction/?limit=${data.limit}&offset=${data.offset}`
    )
  }

  listFloor(data) {
    return apiClient.get(
      `/attributes/floor/?limit=${data.limit}&offset=${data.offset}`
    )
  }

  listHouseIncome(data) {
    return apiClient.get(
      `/attributes/household_income/?limit=${data.limit}&offset=${data.offset}`
    )
  }

  listHouseSize(data) {
    return apiClient.get(
      `/attributes/household_size/?limit=${data.limit}&offset=${data.offset}`
    )
  }

  listPrice(data) {
    return apiClient.get(
      `/attributes/price_range/?limit=${data.limit}&offset=${data.offset}`
    )
  }

  listStyle(data) {
    return apiClient.get(
      `/attributes/style/?limit=${data.limit}&offset=${data.offset}`
    )
  }

  listCommitment(data) {
    return apiClient.get(
      `/attributes/commitment/?limit=${data.limit}&offset=${data.offset}`
    )
  }

  listKeyword(data) {
    return apiClient.get(`/attributes/search_history/get_most_keyword/${data}`)
  }
}
