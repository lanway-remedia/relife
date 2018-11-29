/**
 * @author Nam NH
 * Center point to export instances of services
 */
import LanguageService from './wrapper/LanguageService'
import AuthsService from './wrapper/AuthsService'
import UsersService from './wrapper/UsersService'
import UserProfileService from './wrapper/UserProfileService'
import OutletStoresService from './wrapper/OutletStoresService'
import ExhibitionsService from './wrapper/ExhibitionsService'
import LocationsService from './wrapper/LocationsService'
import TagsService from './wrapper/TagsService'
import CategoriesService from './wrapper/CategoriesService'

export const languageService = new LanguageService()
export const authsService = new AuthsService()
export const usersService = new UsersService()
export const userProfileService = new UserProfileService()
export const outletStoresService = new OutletStoresService()
export const exhibitionsService = new ExhibitionsService()
export const locationsService = new LocationsService()
export const tagsService = new TagsService()
export const categoriesService = new CategoriesService()
