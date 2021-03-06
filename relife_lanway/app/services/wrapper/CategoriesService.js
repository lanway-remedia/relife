/**
 * @author HaPV
 */

import apiClient from '../../shared/apiClient'

export default class CategoriesService {
  listCate(data) {
    return apiClient.get(
      `/categories/${data.type}?limit=${data.limit}&offset=${data.offset}`
    )
  }
  getCate(data) {
    return apiClient.get(`/categories/${data}`)
  }
  addCate(data) {
    if (data.get('type') === '1') {
      return apiClient.post(`/categories/${data.get('type')}`, data)
    } else if (data.get('type') === '2') {
      return apiClient.post(`/categories/${data.get('type')}`, data)
    }
  }
  editCate(data) {
    if (data.get('type') === '1') {
      return apiClient.put(
        `/categories/${data.get('id')}/${data.get('type')}`,
        data
      )
    } else if (data.get('type') === '2') {
      return apiClient.put(
        `/categories/${data.get('id')}/${data.get('type')}`,
        data
      )
    }
  }
  deleteCate(data) {
    if (data.type === 1) {
      return apiClient.delete(`/categories/${data.id}/${data.type}`)
    } else if (data.type === 2) {
      return apiClient.delete(`/categories/${data.id}/${data.type}`)
    }
  }
}
