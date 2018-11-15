/**
 * @author Cuonglb
 * LoginService
 */

import apiClient from '../../shared/apiClient'

export default class AuthsService {
  login(data) {
    return apiClient.post(`/auths/v1/login/`, data)
  }
}
