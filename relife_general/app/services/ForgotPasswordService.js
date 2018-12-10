/**
 * @author HaPV
 * LoginService
 */

import apiClient from '../shared/apiClient'

export default class ForgotPasswordService {
  forgotPasword(email) {
    let data = {
      email: email
    }
    return apiClient.post(`/api/forgotPassword`, data)
  }
}
