/**
 * @author HaPV
 */

import apiClient from '../../shared/apiClient'

export default class CategoriesService {
  listCate(data) {
    console.log(data)
    return apiClient.get(
      `/categories/${data.type}?limit=${data.limit}&offset=${data.offset}`
    )
  }
  getCate(data) {
    return apiClient.get(`/categories/${data}`)
  }
  addCate(data) {
    return apiClient.post(`/categories/`, data)
  }
  editCate(data) {
    return apiClient.put(`/categories/${data.get('id')}/`, data)
  }
  deleteCate(data) {
    return apiClient.delete(`/categories/${data}`)
  }
}
