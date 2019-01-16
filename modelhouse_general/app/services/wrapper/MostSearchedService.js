/**
 * @author NamNH
 */

import apiClient from '../../shared/apiClient'

export default class mostSearchedService {
  mostSearched(data) {
    return apiClient.get(`/attributes/search_history/get_most_keyword/${data}`)
  }
}
