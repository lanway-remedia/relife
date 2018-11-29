/**
 * @author Cuonglb
 * LoginService
 */

import apiClient from '../../shared/apiClient'

export default class UsersService {
  listUser(data) {
    return apiClient.get(
      `/users/v1/users/?limit=${data.limit}&offset=${data.offset}
        ${data.name ? `&name=${data.name}` : ''}
        ${data.group_id ? `&group_id=${data.group_id}` : ''}
        ${data.store_id ? `&store_id=${data.store_id}` : ''}`
    )
  }

  addUser(data) {
    return apiClient.post(`/users/v1/users/`, data)
  }

  editUser(data) {
    return apiClient.put(`/users/v1/users/${data.id}/`, data)
  }

  deleteUser(id) {
    return apiClient.delete(`/users/v1/users/${id}/`)
  }

  findUserById(id) {
    return apiClient.get(`/users/v1/users/${id}`)
  }
}
