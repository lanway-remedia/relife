/**
 * @author Cuonglb
 * LoginService
 */

import apiClient from '../../shared/apiClient'

export default class UsersService {
  listUser(data) {
    let search = new URLSearchParams(data)
    return apiClient.get(`/users/v1/users/?${search.toString()}`)
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
