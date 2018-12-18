/**
 * @author HaPV
 */

import apiClient from '../../shared/apiClient'

export default class LocationsService {
  listLocation(data) {
    return apiClient.get(
      `/locations/${data.type}?limit=${data.limit}&offset=${data.offset}`
    )
  }
  getLocation(data) {
    return apiClient.get(`/locations/${data}`)
  }
  addLocation(data) {
    if (data.get('type') === '1') {
      return apiClient.post(`/locations/${data.get('type')}`, data)
    } else if (data.get('type') === '2') {
      return apiClient.post(`/locations/${data.get('type')}`, data)
    }
  }
  editLocation(data) {
    if (data.get('type') === '1') {
      return apiClient.put(
        `/locations/${data.get('id')}/${data.get('type')}`,
        data
      )
    } else if (data.get('type') === '2') {
      return apiClient.put(
        `/locations/${data.get('id')}/${data.get('type')}`,
        data
      )
    }
  }
  deleteLocation(data) {
    if (data.type === 1) {
      return apiClient.delete(`/locations/${data.id}/${data.type}`)
    } else if (data.type === 2) {
      return apiClient.delete(`/locations/${data.id}/${data.type}`)
    }
  }
}
