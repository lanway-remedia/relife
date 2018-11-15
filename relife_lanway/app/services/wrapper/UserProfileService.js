/**
 * @author HaPV
 */

import apiClient from '../../shared/apiClient'

export default class UserProfileService {
  getUserProfile() {
    return apiClient.get(`/users/v1/profile/`)
  }
}
