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
  addContruction(data) {
    return apiClient.post(`/attributes/contruction/`, data)
  }
  editContruction(data) {
    return apiClient.put(`/attributes/contruction/${data.get('id')}/`, data)
  }
  deleteContruction(data) {
    return apiClient.delete(`/attributes/contruction/${data}`)
  }

  listFloor(data) {
    return apiClient.get(
      `/attributes/floor/?limit=${data.limit}&offset=${data.offset}`
    )
  }
  getFloor(data) {
    return apiClient.get(`/attributes/floor/${data}`)
  }
  addFloor(data) {
    return apiClient.post(`/attributes/floor/`, data)
  }
  editFloor(data) {
    return apiClient.put(`/attributes/floor/${data.get('id')}/`, data)
  }
  deleteFloor(data) {
    return apiClient.delete(`/attributes/floor/${data}`)
  }

  listHouseIncome(data) {
    return apiClient.get(
      `/attributes/household_income/?limit=${data.limit}&offset=${data.offset}`
    )
  }
  getHouseIncome(data) {
    return apiClient.get(`/attributes/household_income/${data}`)
  }
  addHouseIncome(data) {
    return apiClient.post(`/attributes/household_income/`, data)
  }
  editHouseIncome(data) {
    return apiClient.put(
      `/attributes/household_income/${data.get('id')}/`,
      data
    )
  }
  deleteHouseIncome(data) {
    return apiClient.delete(`/attributes/household_income/${data}`)
  }

  listHouseSize(data) {
    return apiClient.get(
      `/attributes/household_size/?limit=${data.limit}&offset=${data.offset}`
    )
  }
  getHouseSize(data) {
    return apiClient.get(`/attributes/household_size/${data}`)
  }
  addHouseSize(data) {
    return apiClient.post(`/attributes/household_size/`, data)
  }
  editHouseSize(data) {
    return apiClient.put(`/attributes/household_size/${data.get('id')}/`, data)
  }
  deleteHouseSize(data) {
    return apiClient.delete(`/attributes/household_size/${data}`)
  }

  listPrice(data) {
    return apiClient.get(
      `/attributes/price_range/?limit=${data.limit}&offset=${data.offset}`
    )
  }
  getPrice(data) {
    return apiClient.get(`/attributes/price_range/${data}`)
  }
  addPrice(data) {
    return apiClient.post(`/attributes/price_range/`, data)
  }
  editPrice(data) {
    return apiClient.put(`/attributes/price_range/${data.get('id')}/`, data)
  }
  deletePrice(data) {
    return apiClient.delete(`/attributes/price_range/${data}`)
  }

  listStyle(data) {
    return apiClient.get(
      `/attributes/style/?limit=${data.limit}&offset=${data.offset}`
    )
  }
  getStyle(data) {
    return apiClient.get(`/attributes/style/${data}`)
  }
  addStyle(data) {
    return apiClient.post(`/attributes/style/`, data)
  }
  editStyle(data) {
    return apiClient.put(`/attributes/style/${data.get('id')}/`, data)
  }
  deleteStyle(data) {
    return apiClient.delete(`/attributes/style/${data}`)
  }
}
