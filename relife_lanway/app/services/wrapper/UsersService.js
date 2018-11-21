/**
 * @author Cuonglb
 * LoginService
 */

import apiClient from '../../shared/apiClient'

export default class UsersService {
  listUser(data) {
    return apiClient.get(`/users/v1/users/?${data.username?`username=${data.username}`:''}${data.group_id?`&group_id=${data.group_id}`:''}`)
  }

  addUser(data) {
    return apiClient.post(`/users/v1/users/`, data)
  }
}
