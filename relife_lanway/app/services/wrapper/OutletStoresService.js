/**
 * @author HaPV
 */

import apiClient from '../../shared/apiClient'

export default class UsersService {
  listStore(data) {
    return apiClient.get(
      `/outletstores/?${data.page ? `page=${data.page}` : ''}${
        data.page_size ? `&page_size=${data.page_size}` : ''
      }`
    )
  }
}
