/**
 * @author HaPV
 */

import apiClient from '../../shared/apiClient'

export default class ExhibitionsService {
  listExh(data) {
    return apiClient.get(
      `/exhibitions/?${data.page ? `page=${data.page}` : ''}${
        data.page_size ? `&page_size=${data.page_size}` : ''
      }`
    )
  }
  getExh(data) {
    return apiClient.get(`/exhibitions/${data}/`)
  }
  addExh(data) {
    return apiClient.post(`/exhibitions/`, data)
  }
  editExh(data) {
    return apiClient.put(`/exhibitions/${data.get('id')}/`, data)
  }
  deleteExh(data) {
    return apiClient.delete(`/exhibitions/${data}/`)
  }
}
