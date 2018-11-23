/**
 * @author HaPV
 */

import apiClient from '../../shared/apiClient'

export default class LocationsService {
  getLocation(data) {
    return apiClient.get(`/locations/${data}`)
  }
}
