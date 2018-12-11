/**
 * @author Cuonglb
 * LoginService
 */

import apiClient from '../../shared/apiClient'

export default class AuthsService {
  login(data) {
    console.log(data)
    return apiClient.post(`/auths/v1/login/`, data)
  }

  forgotPassword(data) {
    return apiClient.post(`/auths/v1/reset-request/`, data)
  }

  resetPassword(data) {
    return apiClient.post(`/auths/v1/reset-with-key/${data.uidb64}/${data.token_key}/`, data)
  }
}
