/**
 * @author HanhTD
 */

import apiClient from '../../shared/apiClient'
export default class ExhibitionsService {
  listExhibitions(data) {
    let search = new URLSearchParams(data)
    return apiClient.get(
      `/exhibitions/?${search.toString()}`
    )
  }

  listExhibitionsByRegion(data) {
    let search = new URLSearchParams(data)
    return apiClient.get(
      `/exhibitions/?${search.toString()}`
    )
  }
}
