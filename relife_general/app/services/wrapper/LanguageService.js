/**
 * @author Duong Nguyen
 * LanguageService
 */

import AbstractDataService from './AbstractDataService'
import { StorageKeyConstants, BooleanString } from '../../constants'

export default class LanguageService extends AbstractDataService {
  constructor() {
    super(StorageKeyConstants.LANGUAGES)
  }

  getSelectedLanguage() {
    return localStorage.getItem(StorageKeyConstants.SELECTED_LANGUAGE)
  }

  setSelectedLanguage(language) {
    localStorage.setItem(StorageKeyConstants.SELECTED_LANGUAGE, language)
  }

  getPrimaryLanguage() {
    let primaryLanguage = this.getList({
      isPrimary: BooleanString.TRUE
    })[0]

    return primaryLanguage.lang
  }
}
