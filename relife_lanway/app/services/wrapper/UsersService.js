/**
 * @author Cuonglb
 * LoginService
 */

import apiClient from '../../shared/apiClient'
import queryString from 'query-string'

export default class UsersService {
  listUser(data) {
    let parsed = {
      limit: data.limit || undefined,
      offset: data.offset || undefined,
      name: data.name || undefined,
      group_id: data.group_id || undefined,
      store_id: data.store_id || undefined
    }
    let search = queryString.stringify(parsed)
    return apiClient.get(
      `/users/v1/users/?${search}`
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
