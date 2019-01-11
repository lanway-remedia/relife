/**
 * @author HaPV
 */

import apiClient from '../../shared/apiClient'

export default class ProfileService {
  getProfile() {
    return apiClient.get(`/users/v1/profile/`)
  }
  editProfile(data) {
    return apiClient.post(`/users/v1/profile/`, data)
  }
  editAvatarProfile(data) {
    return apiClient.post(`/users/v1/profile/update_avatar/`, data)
  }
  changePass(data) {
    return apiClient.post(`/users/v1/profile/update_password/`, data)
  }
}
