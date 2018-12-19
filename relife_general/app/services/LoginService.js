/**
 * @author Cuonglb
 * LoginService
 */

import apiClient from '../shared/apiClient'

export default class LoginService {
  login(email, password) {
    let data = {
      'email': email,
      'password': password
    }
    return apiClient.post(`/api/login`, data)
  }
}
