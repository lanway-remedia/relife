/**
 * @author Nam NH
 * Center point to export instances of services
 */
import LanguageService from './wrapper/LanguageService'
import AuthsService from './wrapper/AuthsService'
import UserProfileService from './wrapper/UserProfileService'

export const languageService = new LanguageService()
export const authsService = new AuthsService()
export const userProfileService = new UserProfileService()