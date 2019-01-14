/**
 * @author HaPV
 */

import apiClient from '../../shared/apiClient'

export default class TagsService {
  listTag() {
    return apiClient.get(`/tags/`)
  }
}
