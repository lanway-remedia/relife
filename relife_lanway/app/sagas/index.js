/**
 * @author EAS
 * Saga index: connects action type and saga
 */

import { takeLatest } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { ListLanguagesTypes } from '../redux/wrapper/ListLanguagesRedux'
import { SetLanguageTypes } from '../redux/wrapper/SetLanguageRedux'
import { AuthsTypes } from '../redux/wrapper/AuthsRedux'
import { UsersTypes } from '../redux/wrapper/UsersRedux'
import { UserProfileTypes } from '../redux/wrapper/UserProfileRedux'
import { OutletStoresTypes } from '../redux/wrapper/OutletStoresRedux'
import { ExhibitionsTypes } from '../redux/wrapper/ExhibitionsRedux'
import { LocationTypes } from '../redux/wrapper/LocationsRedux'
import { TagTypes } from '../redux/wrapper/TagsRedux'
import { CategoryTypes } from '../redux/wrapper/CategoriesRedux'
import { AttributeTypes } from '../redux/wrapper/AttributesRedux'
/* ------------- Sagas ------------- */
import ErrorSagas from './wrapper/ErrorSagas'
import LanguageSagas from './wrapper/LanguageSagas'
import AuthsSagas from './wrapper/AuthsSagas'
import UsersSagas from './wrapper/UsersSagas'
import UserProfileSagas from './wrapper/UserProfileSagas'
import OutletStoresSagas from './wrapper/OutletStoresSagas'
import ExhibitionsSagas from './wrapper/ExhibitionsSagas'
import LocationsSagas from './wrapper/LocationsSagas'
import TagsSagas from './wrapper/TagsSagas'
import CategoriesSagas from './wrapper/CategoriesSagas'
import AttributesSagas from './wrapper/AttributesSagas'
/* ------------- Connect Types To Sagas ------------- */
export default function* root() {
  yield [
    //language
    takeLatest(SetLanguageTypes.SET_LANGUAGE_REQUEST, LanguageSagas.set),
    takeLatest(SetLanguageTypes.SET_LANGUAGE_FAILURE, ErrorSagas.handleError),
    takeLatest(ListLanguagesTypes.LIST_LANGUAGES_REQUEST, LanguageSagas.list),
    takeLatest(
      ListLanguagesTypes.LIST_LANGUAGES_FAILURE,
      ErrorSagas.handleError
    ),

    //authentication
    takeLatest(AuthsTypes.LOGIN_REQUEST, AuthsSagas.login),
    takeLatest(AuthsTypes.FORGOT_PASSWORD_REQUEST, AuthsSagas.forgotPassword),
    takeLatest(AuthsTypes.RESET_PASSWORD_REQUEST, AuthsSagas.resetPassword),
    takeLatest(AuthsTypes.AUTHS_FAILURE, ErrorSagas.handleError),

    //user profile
    takeLatest(UserProfileTypes.PROFILE_REQUEST, UserProfileSagas.userProfile),
    takeLatest(
      UserProfileTypes.EDIT_PROFILE_REQUEST,
      UserProfileSagas.editProfile
    ),
    takeLatest(
      UserProfileTypes.EDIT_PROFILE_AVATAR_REQUEST,
      UserProfileSagas.editProfileAvatar
    ),
    takeLatest(
      UserProfileTypes.CHANGE_PASS_REQUEST,
      UserProfileSagas.changePass
    ),
    takeLatest(UserProfileTypes.PROFILE_FAILURE, ErrorSagas.handleError),

    //OutletStore
    // Get List
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_LIST_REQUEST,
      OutletStoresSagas.listStore
    ),
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_LIST_FAILURE,
      ErrorSagas.handleError
    ),
    //Get Store by ID
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_GET_REQUEST,
      OutletStoresSagas.getStore
    ),
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_GET_FAILURE,
      ErrorSagas.handleError
    ),
    //Add Store
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_ADD_REQUEST,
      OutletStoresSagas.addStore
    ),
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_ADD_FAILURE,
      ErrorSagas.handleError
    ),
    //Edit Store
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_EDIT_REQUEST,
      OutletStoresSagas.editStore
    ),
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_EDIT_FAILURE,
      ErrorSagas.handleError
    ),
    //Delete Store
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_DELETE_REQUEST,
      OutletStoresSagas.deleteStore
    ),
    takeLatest(
      OutletStoresTypes.OUTLET_STORE_DELETE_FAILURE,
      ErrorSagas.handleError
    ),

    //Exhibitions
    // Get List
    takeLatest(
      ExhibitionsTypes.EXHIBITION_LIST_REQUEST,
      ExhibitionsSagas.listExh
    ),
    takeLatest(
      ExhibitionsTypes.EXHIBITION_LIST_FAILURE,
      ErrorSagas.handleError
    ),
    //Get Exh by ID
    takeLatest(
      ExhibitionsTypes.EXHIBITION_GET_REQUEST,
      ExhibitionsSagas.getExh
    ),
    takeLatest(ExhibitionsTypes.EXHIBITION_GET_FAILURE, ErrorSagas.handleError),
    //Add Exh
    takeLatest(
      ExhibitionsTypes.EXHIBITION_ADD_REQUEST,
      ExhibitionsSagas.addExh
    ),
    takeLatest(ExhibitionsTypes.EXHIBITION_ADD_FAILURE, ErrorSagas.handleError),
    //Edit Exh
    takeLatest(
      ExhibitionsTypes.EXHIBITION_EDIT_REQUEST,
      ExhibitionsSagas.editExh
    ),
    takeLatest(
      ExhibitionsTypes.EXHIBITION_EDIT_FAILURE,
      ErrorSagas.handleError
    ),
    //Delete Exh
    takeLatest(
      ExhibitionsTypes.EXHIBITION_DELETE_REQUEST,
      ExhibitionsSagas.deleteExh
    ),
    takeLatest(
      ExhibitionsTypes.EXHIBITION_DELETE_FAILURE,
      ErrorSagas.handleError
    ),

    //Tags
    // Get List
    takeLatest(TagTypes.TAG_LIST_REQUEST, TagsSagas.listTag),
    takeLatest(TagTypes.TAG_LIST_FAILURE, ErrorSagas.handleError),
    //Get Tag by ID
    takeLatest(TagTypes.TAG_GET_REQUEST, TagsSagas.getTag),
    takeLatest(TagTypes.TAG_GET_FAILURE, ErrorSagas.handleError),
    //Add Tag
    takeLatest(TagTypes.TAG_ADD_REQUEST, TagsSagas.addTag),
    takeLatest(TagTypes.TAG_ADD_FAILURE, ErrorSagas.handleError),
    //Edit Tag
    takeLatest(TagTypes.TAG_EDIT_REQUEST, TagsSagas.editTag),
    takeLatest(TagTypes.TAG_EDIT_FAILURE, ErrorSagas.handleError),
    //Delete Tag
    takeLatest(TagTypes.TAG_DELETE_REQUEST, TagsSagas.deleteTag),
    takeLatest(TagTypes.TAG_DELETE_FAILURE, ErrorSagas.handleError),

    //Categories
    // Get List Category
    takeLatest(CategoryTypes.CATE_LIST_REQUEST, CategoriesSagas.listCate),
    takeLatest(CategoryTypes.CATE_LIST_FAILURE, ErrorSagas.handleError),
    //Get Category by ID
    takeLatest(CategoryTypes.CATE_GET_REQUEST, CategoriesSagas.getCate),
    takeLatest(CategoryTypes.CATE_GET_FAILURE, ErrorSagas.handleError),
    //Add Category
    takeLatest(CategoryTypes.CATE_ADD_REQUEST, CategoriesSagas.addCate),
    takeLatest(CategoryTypes.CATE_ADD_FAILURE, ErrorSagas.handleError),
    //Edit Category
    takeLatest(CategoryTypes.CATE_EDIT_REQUEST, CategoriesSagas.editCate),
    takeLatest(CategoryTypes.CATE_EDIT_FAILURE, ErrorSagas.handleError),
    //Delete Category
    takeLatest(CategoryTypes.CATE_DELETE_REQUEST, CategoriesSagas.deleteCate),
    takeLatest(CategoryTypes.CATE_DELETE_FAILURE, ErrorSagas.handleError),

    //Locations
    //List Location
    takeLatest(
      LocationTypes.LOCATION_LIST_REQUEST,
      LocationsSagas.listLocation
    ),
    takeLatest(LocationTypes.LOCATION_FAILURE, ErrorSagas.handleError),
    //Get Location
    takeLatest(LocationTypes.LOCATION_GET_REQUEST, LocationsSagas.getLocation),
    takeLatest(LocationTypes.LOCATION_FAILURE, ErrorSagas.handleError),
    //Add Location
    takeLatest(LocationTypes.LOCATION_ADD_REQUEST, LocationsSagas.addLocation),
    takeLatest(LocationTypes.LOCATION_FAILURE, ErrorSagas.handleError),
    //Edit Location
    takeLatest(
      LocationTypes.LOCATION_EDIT_REQUEST,
      LocationsSagas.editLocation
    ),
    takeLatest(LocationTypes.LOCATION_FAILURE, ErrorSagas.handleError),
    //Delete Location
    takeLatest(
      LocationTypes.LOCATION_DELETE_REQUEST,
      LocationsSagas.deleteLocation
    ),
    takeLatest(LocationTypes.LOCATION_FAILURE, ErrorSagas.handleError),

    //Attributes
    // Get List Contruction
    takeLatest(
      AttributeTypes.ATTRIBUTE_CONTRUCTION_LIST_REQUEST,
      AttributesSagas.listContruction
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Get Attribute Contruction by ID
    takeLatest(
      AttributeTypes.ATTRIBUTE_CONTRUCTION_GET_REQUEST,
      AttributesSagas.getContruction
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Add Attribute Contruction
    takeLatest(
      AttributeTypes.ATTRIBUTE_CONTRUCTION_ADD_REQUEST,
      AttributesSagas.addContruction
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Edit Attribute Contruction
    takeLatest(
      AttributeTypes.ATTRIBUTE_CONTRUCTION_EDIT_REQUEST,
      AttributesSagas.editContruction
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Delete Attribute Contruction
    takeLatest(
      AttributeTypes.ATTRIBUTE_CONTRUCTION_DELETE_REQUEST,
      AttributesSagas.deleteContruction
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),

    // Get List Floor
    takeLatest(
      AttributeTypes.ATTRIBUTE_FLOOR_LIST_REQUEST,
      AttributesSagas.listFloor
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Get Attribute Floor by ID
    takeLatest(
      AttributeTypes.ATTRIBUTE_FLOOR_GET_REQUEST,
      AttributesSagas.getFloor
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Add Attribute Floor
    takeLatest(
      AttributeTypes.ATTRIBUTE_FLOOR_ADD_REQUEST,
      AttributesSagas.addFloor
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Edit Attribute Floor
    takeLatest(
      AttributeTypes.ATTRIBUTE_FLOOR_EDIT_REQUEST,
      AttributesSagas.editFloor
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Delete Attribute Floor
    takeLatest(
      AttributeTypes.ATTRIBUTE_FLOOR_DELETE_REQUEST,
      AttributesSagas.deleteFloor
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),

    // Get List Style
    takeLatest(
      AttributeTypes.ATTRIBUTE_STYLE_LIST_REQUEST,
      AttributesSagas.listStyle
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Get Attribute Style by ID
    takeLatest(
      AttributeTypes.ATTRIBUTE_STYLE_GET_REQUEST,
      AttributesSagas.getStyle
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Add Attribute Style
    takeLatest(
      AttributeTypes.ATTRIBUTE_STYLE_ADD_REQUEST,
      AttributesSagas.addStyle
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Edit Attribute Style
    takeLatest(
      AttributeTypes.ATTRIBUTE_STYLE_EDIT_REQUEST,
      AttributesSagas.editStyle
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Delete Attribute Style
    takeLatest(
      AttributeTypes.ATTRIBUTE_STYLE_DELETE_REQUEST,
      AttributesSagas.deleteStyle
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),

    // Get List Price
    takeLatest(
      AttributeTypes.ATTRIBUTE_PRICE_LIST_REQUEST,
      AttributesSagas.listPrice
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Get Attribute Price by ID
    takeLatest(
      AttributeTypes.ATTRIBUTE_PRICE_GET_REQUEST,
      AttributesSagas.getPrice
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Add Attribute Price
    takeLatest(
      AttributeTypes.ATTRIBUTE_PRICE_ADD_REQUEST,
      AttributesSagas.addPrice
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Edit Attribute Price
    takeLatest(
      AttributeTypes.ATTRIBUTE_PRICE_EDIT_REQUEST,
      AttributesSagas.editPrice
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Delete Attribute Price
    takeLatest(
      AttributeTypes.ATTRIBUTE_PRICE_DELETE_REQUEST,
      AttributesSagas.deletePrice
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),

    // Get List Household Income
    takeLatest(
      AttributeTypes.ATTRIBUTE_HOUSE_INCOME_LIST_REQUEST,
      AttributesSagas.listHouseIncome
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Get Attribute Household Income by ID
    takeLatest(
      AttributeTypes.ATTRIBUTE_HOUSE_INCOME_GET_REQUEST,
      AttributesSagas.getHouseIncome
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Add Attribute Household Income
    takeLatest(
      AttributeTypes.ATTRIBUTE_HOUSE_INCOME_ADD_REQUEST,
      AttributesSagas.addHouseIncome
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Edit Attribute Household Income
    takeLatest(
      AttributeTypes.ATTRIBUTE_HOUSE_INCOME_EDIT_REQUEST,
      AttributesSagas.editHouseIncome
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Delete Attribute Household Income
    takeLatest(
      AttributeTypes.ATTRIBUTE_HOUSE_INCOME_DELETE_REQUEST,
      AttributesSagas.deleteHouseIncome
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),

    // Get List Household Size
    takeLatest(
      AttributeTypes.ATTRIBUTE_HOUSE_SIZE_LIST_REQUEST,
      AttributesSagas.listHouseSize
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Get Attribute Household Size by ID
    takeLatest(
      AttributeTypes.ATTRIBUTE_HOUSE_SIZE_GET_REQUEST,
      AttributesSagas.getHouseSize
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Add Attribute Household Size
    takeLatest(
      AttributeTypes.ATTRIBUTE_HOUSE_SIZE_ADD_REQUEST,
      AttributesSagas.addHouseSize
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Edit Attribute Household Size
    takeLatest(
      AttributeTypes.ATTRIBUTE_HOUSE_SIZE_EDIT_REQUEST,
      AttributesSagas.editHouseSize
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),
    //Delete Attribute Household Size
    takeLatest(
      AttributeTypes.ATTRIBUTE_HOUSE_SIZE_DELETE_REQUEST,
      AttributesSagas.deleteHouseSize
    ),
    takeLatest(AttributeTypes.ATTRIBUTE_FAILURE, ErrorSagas.handleError),

    //user
    takeLatest(UsersTypes.USER_LIST_REQUEST, UsersSagas.listUser),
    takeLatest(UsersTypes.ADD_USER_REQUEST, UsersSagas.addUser),
    takeLatest(UsersTypes.EDIT_USER_REQUEST, UsersSagas.editUser),
    takeLatest(UsersTypes.DELETE_USER_REQUEST, UsersSagas.deleteUser),
    takeLatest(UsersTypes.FIND_USER_BY_ID, UsersSagas.findUserById),
    takeLatest(UsersTypes.USERS_FAILURE, ErrorSagas.handleError)
  ]
}
