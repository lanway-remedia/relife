/**
 * @author Cuonglb
 * LoginService
 */

import apiClient from '../../shared/apiClient'

export default class AuthsService {
    register(data) {
        return apiClient.post(`/users/v1/auth/register/`, data)
    }

    login(data) {
        return apiClient.post(`/auths/v1/login/`, data)
    }

    forgotPassword(data) {
        return apiClient.post(`/auths/v1/reset-request/`, data)
    }

    resetPassword(data) {
        return apiClient.post(`/auths/v1/reset-with-key/${data.uidb64}/${data.token_key}/`, data)
    }
}
