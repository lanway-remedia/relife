/**
 * @author HaPV
 */

import apiClient from '../../shared/apiClient'

export default class UserProfileService {
  getUserProfile() {
    return apiClient.get(`/users/v1/profile/`)
  }
  editUserProfile(data) {
    return apiClient.post(`/users/v1/profile/`, data)
  }
  editAvatarProfile(data) {
    console.log(data)
    return apiClient.post(`/users/v1/profile/update_avatar/`, data)
  }
}
