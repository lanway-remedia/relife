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
}
