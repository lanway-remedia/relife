/**
 * @author Nam NH
 * Center point to export instances of services
 */
import LanguageService from './wrapper/LanguageService'
import AuthsService from './wrapper/AuthsService'
import UsersService from './wrapper/UsersService'
import UserProfileService from './wrapper/UserProfileService'
import OutletStoresService from './wrapper/OutletStoresService'
import LocationsService from './wrapper/LocationsService'
import ExampleHousesService from './wrapper/ExampleHousesService'
import AttributesService from './wrapper/AttributesService'

export const languageService = new LanguageService()
export const authsService = new AuthsService()
export const usersService = new UsersService()
export const userProfileService = new UserProfileService()
export const outletStoresService = new OutletStoresService()
export const locationsService = new LocationsService()
export const exampleHousesService = new ExampleHousesService()
export const attributesService = new AttributesService()
