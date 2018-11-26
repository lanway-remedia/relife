/**
 * @author HaPV
 */

import apiClient from '../../shared/apiClient'

export default class TagsService {
  listTag(data) {
    return apiClient.get(`/tags/?limit=${data.limit}&offset=${data.offset}`)
  }
  getTag(data) {
    return apiClient.get(`/tags/${data}`)
  }
  addTag(data) {
    return apiClient.post(`/tags/`, data)
  }
  editTag(data) {
    return apiClient.put(`/tags/${data.get('id')}/`, data)
  }
  deleteTag(data) {
    return apiClient.delete(`/tags/${data}`)
  }
}
