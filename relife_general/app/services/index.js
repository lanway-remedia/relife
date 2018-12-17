/**
 * @author Nam NH
 * Center point to export instances of services
 */
import LanguageService from './wrapper/LanguageService'
import AuthsService from './wrapper/AuthsService'
import ProfileService from './wrapper/ProfileService'
import LocationsService from './wrapper/LocationsService'

export const languageService = new LanguageService()
export const authsService = new AuthsService()
export const profileService = new ProfileService()
export const locationsService = new LocationsService()
