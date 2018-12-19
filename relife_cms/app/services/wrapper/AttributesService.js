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
  getContruction(data) {
    return apiClient.get(`/attributes/contruction/${data}`)
  }

  listFloor(data) {
    return apiClient.get(
      `/attributes/floor/?limit=${data.limit}&offset=${data.offset}`
    )
  }
  getFloor(data) {
    return apiClient.get(`/attributes/floor/${data}`)
  }

  listHouseIncome(data) {
    return apiClient.get(
      `/attributes/household_income/?limit=${data.limit}&offset=${data.offset}`
    )
  }
  getHouseIncome(data) {
    return apiClient.get(`/attributes/household_income/${data}`)
  }

  listHouseSize(data) {
    return apiClient.get(
      `/attributes/household_size/?limit=${data.limit}&offset=${data.offset}`
    )
  }
  getHouseSize(data) {
    return apiClient.get(`/attributes/household_size/${data}`)
  }

  listPrice(data) {
    return apiClient.get(
      `/attributes/price_range/?limit=${data.limit}&offset=${data.offset}`
    )
  }
  getPrice(data) {
    return apiClient.get(`/attributes/price_range/${data}`)
  }

  listStyle(data) {
    return apiClient.get(
      `/attributes/style/?limit=${data.limit}&offset=${data.offset}`
    )
  }
  getStyle(data) {
    return apiClient.get(`/attributes/style/${data}`)
  }
}
