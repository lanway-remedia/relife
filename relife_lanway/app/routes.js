/**
 * @author Nam NH
 * This file contains all route declaration
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
//auths
import LoginPage from './containers/auths/LoginPage'
import ResetPasswordPage from './containers/auths/ResetPasswordPage'
import ForgotPasswordPage from './containers/auths/ForgotPasswordPage'
//profiles
import ProfileInfoPage from './containers/profiles/ProfileInfoPage'
import ProfileEditPage from './containers/profiles/ProfileEditPage'
import ProfileChangePassPage from './containers/profiles/ProfileChangePassPage'
//users
import UserListPage from './containers/users/UserListPage'
import UserDetailPage from './containers/users/UserDetailPage'
import AddUserPage from './containers/users/AddUserPage'
import EditUserPage from './containers/users/EditUserPage'
import ResetPassUserPage from './containers/users/ResetPassUserPage'
//outletstores
import ManageOutletStoreListPage from './containers/outletstores/ManageOutletStoreListPage'
import AddNewOutletStorePage from './containers/outletstores/AddNewOutletStorePage'
import EditOutletStorePage from './containers/outletstores/EditOutletStorePage'
//exhibtions
import ManageExhibitionListPage from './containers/exhibtions/ManageExhibitionListPage'
import AddNewExhibitionPage from './containers/exhibtions/AddNewExhibitionPage'
import EditExhibitionPage from './containers/exhibtions/EditExhibitionPage'
//Tags
import ManageTagListPage from './containers/tags/ManageTagListPage'
import AddNewTagPage from './containers/tags/AddNewTagPage'
import EditTagPage from './containers/tags/EditTagPage'
//Categories
import ManageCategoryListPage from './containers/categories/ManageCategoryListPage'
import AddNewCategoryPage from './containers/categories/AddNewCategoryPage'
//Locations
import ManageLocationListPage from './containers/locations/ManageLocationListPage'
import AddNewLocationPage from './containers/locations/AddNewLocationPage'
//Attributes
import ManageContructionListPage from './containers/attributes/contructions/ManageContructionListPage'
import AddNewContructionPage from './containers/attributes/contructions/AddNewContructionPage'
import EditContructionPage from './containers/attributes/contructions/EditContructionPage'
import ManageFloorListPage from './containers/attributes/floors/ManageFloorListPage'
import AddNewFloorPage from './containers/attributes/floors/AddNewFloorPage'
import EditFloorPage from './containers/attributes/floors/EditFloorPage'
import ManageHouseHoldIncomeListPage from './containers/attributes/household_incomes/ManageHouseHoldIncomeListPage'
import AddNewHouseHoldIncomePage from './containers/attributes/household_incomes/AddNewHouseHoldIncomePage'
import EditHouseHoldIncomePage from './containers/attributes/household_incomes/EditHouseHoldIncomePage'
import ManageHouseHoldSizeListPage from './containers/attributes/household_sizes/ManageHouseHoldSizeListPage'
import AddNewHouldHoldSizePage from './containers/attributes/household_sizes/AddNewHouldHoldSizePage'
import EditHouseHoldSizePage from './containers/attributes/household_sizes/EditHouseHoldSizePage'
import ManagePriceRangerListPage from './containers/attributes/price_rangers/ManagePriceRangerListPage'
import AddNewPriceRangerPage from './containers/attributes/price_rangers/AddNewPriceRangerPage'
import EditPriceRangerPage from './containers/attributes/price_rangers/EditPriceRangerPage'
import ManageStyleListPage from './containers/attributes/styles/ManageStyleListPage'
import AddNewStylePage from './containers/attributes/styles/AddNewStylePage'
import EditStylePage from './containers/attributes/styles/EditStylePage'
//Invoice
import ReleaseInvoicePage from './containers/invoices/ReleaseInvoicePage'
//languages
import Language from './components/Language'

import AppUtils from './utils/AppUtils'
import I18nUtils from './utils/I18nUtils'
import { StorageKeyConstants } from './constants'
import { Dashboard, Header, Sidebar } from 'react-adminlte-dash'
import defaultAvatar from './images/user.png'

import 'react-perfect-scrollbar/dist/css/styles.css'
import PerfectScrollbar from 'react-perfect-scrollbar'

class Routes extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
      theme: 'skin-blue',
      dropdownOpen: false
    }
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }))
  }

  render() {
    let { username, userimage } = this.props
    userimage = userimage || defaultAvatar
    const isAuthenticated = () => {
      let isLogin = false
      var code = localStorage.getItem(StorageKeyConstants.TOKEN)

      if (code && code != '') {
        isLogin = true
      }

      return isLogin
    }

    const requireLogin = Component => props => {
      return isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }

    const nav = () => [
      <li className="nav-item" key="1">
        <Language />
      </li>,
      <Header.UserMenu
        name={username}
        image={userimage}
        profileAction={() => this.props.history.push('/')}
        signOutAction={() => AppUtils.logout(this.props.history)}
        key="2"
      />
    ]

    const sb = () => {
      return (
        <PerfectScrollbar style={{ height: 'calc(100vh - 50px)' }}>
          <Sidebar.UserPanel name={username} image={userimage} online key="1" />
          {/* <Sidebar.Search
           name={''}
           placeholder={I18nUtils.t('search-lbl').toLowerCase()}
           onClick={() => this.props.history.push('/search')}
           key="2"
        />, */}
          <Sidebar.Menu header={I18nUtils.t('nav-main-lbl')} key="3">
            <Sidebar.Menu.Item
              active={this.props.location.pathname === '/'}
              icon={{ className: 'fa-user' }}
              title={I18nUtils.t('ud-page-title')}
              onClick={() => this.props.history.push('/')}
            />
            <Sidebar.Menu.Item
              title={I18nUtils.t('um-parent-title')}
              icon={{ className: 'fa-users' }}
            >
              <Sidebar.Menu.Item
                active={this.props.location.pathname === '/add-user'}
                title={I18nUtils.t('au-page-title')}
                icon={{ className: 'fa-plus-square' }}
                onClick={() => this.props.history.push('/add-user')}
              />
              <Sidebar.Menu.Item
                active={this.props.location.pathname === '/users'}
                title={I18nUtils.t('la-page-title')}
                icon={{ className: 'fa-list-ol' }}
                onClick={() => this.props.history.push('/users')}
              />
            </Sidebar.Menu.Item>
            <Sidebar.Menu.Item
              title={I18nUtils.t('ots-parent-title')}
              icon={{ className: 'fa-trello' }}
            >
              <Sidebar.Menu.Item
                active={
                  this.props.location.pathname === '/add-new-outlet-store'
                }
                title={I18nUtils.t('ots-add-page-title')}
                icon={{ className: 'fa-plus-square' }}
                onClick={() => this.props.history.push('/add-new-outlet-store')}
              />
              <Sidebar.Menu.Item
                active={
                  this.props.location.pathname === '/manage-outlet-store-list'
                }
                title={I18nUtils.t('otsl-page-title')}
                icon={{ className: 'fa-list-ol' }}
                onClick={() =>
                  this.props.history.push('/manage-outlet-store-list')
                }
              />
            </Sidebar.Menu.Item>
            <Sidebar.Menu.Item
              title={I18nUtils.t('exh-parent-title')}
              icon={{ className: 'fa-camera-retro' }}
            >
              <Sidebar.Menu.Item
                active={this.props.location.pathname === '/add-new-exhibition'}
                title={I18nUtils.t('exh-add-page-title')}
                icon={{ className: 'fa-plus-square' }}
                onClick={() => this.props.history.push('/add-new-exhibition')}
              />
              <Sidebar.Menu.Item
                active={
                  this.props.location.pathname === '/manage-exhibition-list'
                }
                title={I18nUtils.t('exh-page-title')}
                icon={{ className: 'fa-list-ol' }}
                onClick={() =>
                  this.props.history.push('/manage-exhibition-list')
                }
              />
            </Sidebar.Menu.Item>
            <Sidebar.Menu.Item
              title={I18nUtils.t('tag-parent-title')}
              icon={{ className: 'fa-tags' }}
            >
              <Sidebar.Menu.Item
                active={this.props.location.pathname === '/add-new-tag'}
                title={I18nUtils.t('tag-add-page-title')}
                icon={{ className: 'fa-plus-square' }}
                onClick={() => this.props.history.push('/add-new-tag')}
              />
              <Sidebar.Menu.Item
                active={this.props.location.pathname === '/manage-tag-list'}
                title={I18nUtils.t('tag-page-title')}
                icon={{ className: 'fa-list-ol' }}
                onClick={() => this.props.history.push('/manage-tag-list')}
              />
            </Sidebar.Menu.Item>
            <Sidebar.Menu.Item
              title={I18nUtils.t('cate-parent-title')}
              icon={{ className: 'fa-link' }}
            >
              <Sidebar.Menu.Item
                active={this.props.location.pathname === '/add-new-category'}
                title={I18nUtils.t('cate-add-page-title')}
                icon={{ className: 'fa-plus-square' }}
                onClick={() => this.props.history.push('/add-new-category')}
              />
              <Sidebar.Menu.Item
                active={
                  this.props.location.pathname === '/manage-category-list'
                }
                title={I18nUtils.t('cate-page-title')}
                icon={{ className: 'fa-list-ol' }}
                onClick={() => this.props.history.push('/manage-category-list')}
              />
            </Sidebar.Menu.Item>
            <Sidebar.Menu.Item
              title={I18nUtils.t('loc-parent-title')}
              icon={{ className: 'fa-map-signs' }}
            >
              <Sidebar.Menu.Item
                active={this.props.location.pathname === '/add-new-location'}
                title={I18nUtils.t('loc-add-page-title')}
                icon={{ className: 'fa-plus-square' }}
                onClick={() => this.props.history.push('/add-new-location')}
              />
              <Sidebar.Menu.Item
                active={
                  this.props.location.pathname === '/manage-location-list'
                }
                title={I18nUtils.t('loc-page-title')}
                icon={{ className: 'fa-list-ol' }}
                onClick={() => this.props.history.push('/manage-location-list')}
              />
            </Sidebar.Menu.Item>
            <Sidebar.Menu.Item
              title={I18nUtils.t('att-parent-title')}
              icon={{ className: 'fa-sitemap' }}
            >
              <Sidebar.Menu.Item
                active={
                  this.props.location.pathname === '/manage-contruction-list'
                }
                title={I18nUtils.t('att-cons-page-title')}
                icon={{ className: 'fa-list-ol' }}
                onClick={() =>
                  this.props.history.push('/manage-contruction-list')
                }
              />
              <Sidebar.Menu.Item
                active={this.props.location.pathname === '/manage-floor-list'}
                title={I18nUtils.t('att-floor-page-title')}
                icon={{ className: 'fa-list-ol' }}
                onClick={() => this.props.history.push('/manage-floor-list')}
              />
              <Sidebar.Menu.Item
                active={
                  this.props.location.pathname ===
                  '/manage-household-income-list'
                }
                title={I18nUtils.t('att-hincome-page-title')}
                icon={{ className: 'fa-list-ol' }}
                onClick={() =>
                  this.props.history.push('/manage-household-income-list')
                }
              />
              <Sidebar.Menu.Item
                active={
                  this.props.location.pathname === '/manage-household-size-list'
                }
                title={I18nUtils.t('att-hsize-page-title')}
                icon={{ className: 'fa-list-ol' }}
                onClick={() =>
                  this.props.history.push('/manage-household-size-list')
                }
              />
              <Sidebar.Menu.Item
                active={
                  this.props.location.pathname === '/manage-house-style-list'
                }
                title={I18nUtils.t('att-style-page-title')}
                icon={{ className: 'fa-list-ol' }}
                onClick={() =>
                  this.props.history.push('/manage-house-style-list')
                }
              />
              <Sidebar.Menu.Item
                active={
                  this.props.location.pathname === '/manage-price-ranger-list'
                }
                title={I18nUtils.t('att-price-page-title')}
                icon={{ className: 'fa-list-ol' }}
                onClick={() =>
                  this.props.history.push('/manage-price-ranger-list')
                }
              />
            </Sidebar.Menu.Item>
            <Sidebar.Menu.Item
              title={I18nUtils.t('inv-parent-title')}
              icon={{ className: 'fa-money' }}
            >
              <Sidebar.Menu.Item
                active={this.props.location.pathname === '/release-invoice'}
                title={I18nUtils.t('inv-page-title')}
                icon={{ className: 'fa-list-ol' }}
                onClick={() => this.props.history.push('/release-invoice')}
              />
            </Sidebar.Menu.Item>
            {/* <Sidebar.Menu.Item
            active={this.props.location.pathname == '/article'}
            onClick={() => this.props.history.push('/article')}
            icon={{ className: 'fa-pencil' }}
            title={I18nUtils.t('nav-article-lbl')}
          /> */}
          </Sidebar.Menu>
        </PerfectScrollbar>
      )
    }

    const footer = () => [
      <strong key="1">
        <span>Copyright © 2018 </span>
        <a href="https://mor.vn">Mor Design</a>
        <span>. </span>
      </strong>,
      <span key="2" className="pull-right">
        {' '}
        All rights reserved.
      </span>
    ]

    let hideMenu =
      this.props.location.pathname.includes('/login') ||
      this.props.location.pathname.includes('/forgot-password') ||
      this.props.location.pathname.includes('/email-confirm')

    return (
      <div className="wrapper">
        {!hideMenu ? (
          <Dashboard
            navbarChildren={nav()}
            sidebarChildren={sb()}
            footerChildren={footer()}
            theme={this.state.theme}
            logoLg={<span>{I18nUtils.t('app-title')}</span>}
            logoSm={<span>{I18nUtils.t('app-title-acronym')}</span>}
            sidebarMini
          >
            <div className="root-wrap">
              <ToastContainer />
              <Switch>
                <Route
                  exact
                  path="/"
                  component={requireLogin(ProfileInfoPage)}
                />
                <Route
                  path="/profile-edit"
                  component={requireLogin(ProfileEditPage)}
                />
                <Route
                  path="/profile-change-password"
                  component={requireLogin(ProfileChangePassPage)}
                />
                <Route path="/users" component={requireLogin(UserListPage)} />
                <Route
                  path="/user/:id"
                  component={requireLogin(UserDetailPage)}
                />
                <Route path="/add-user" component={requireLogin(AddUserPage)} />
                <Route
                  path="/edit-user/:id"
                  component={requireLogin(EditUserPage)}
                />
                <Route
                  path="/reset-password-user/:id"
                  component={requireLogin(ResetPassUserPage)}
                />
                <Route
                  path="/edit-outlet-store/:id"
                  component={requireLogin(EditOutletStorePage)}
                />
                <Route
                  path="/manage-outlet-store-list"
                  component={requireLogin(ManageOutletStoreListPage)}
                />
                <Route
                  path="/add-new-outlet-store"
                  component={requireLogin(AddNewOutletStorePage)}
                />
                <Route
                  path="/manage-exhibition-list"
                  component={requireLogin(ManageExhibitionListPage)}
                />
                <Route
                  path="/add-new-exhibition"
                  component={requireLogin(AddNewExhibitionPage)}
                />
                <Route
                  path="/edit-exhibition/:id"
                  component={requireLogin(EditExhibitionPage)}
                />
                <Route
                  path="/manage-tag-list"
                  component={requireLogin(ManageTagListPage)}
                />
                <Route
                  path="/add-new-tag"
                  component={requireLogin(AddNewTagPage)}
                />
                <Route
                  path="/edit-tag/:id"
                  component={requireLogin(EditTagPage)}
                />
                <Route
                  path="/manage-category-list"
                  component={requireLogin(ManageCategoryListPage)}
                />
                <Route
                  path="/add-new-category"
                  component={requireLogin(AddNewCategoryPage)}
                />
                <Route
                  path="/manage-location-list"
                  component={requireLogin(ManageLocationListPage)}
                />
                <Route
                  path="/add-new-location"
                  component={requireLogin(AddNewLocationPage)}
                />
                <Route
                  path="/manage-contruction-list"
                  component={requireLogin(ManageContructionListPage)}
                />
                <Route
                  path="/add-new-contruction"
                  component={requireLogin(AddNewContructionPage)}
                />
                <Route
                  path="/edit-contruction/:id"
                  component={requireLogin(EditContructionPage)}
                />
                <Route
                  path="/manage-household-income-list"
                  component={requireLogin(ManageHouseHoldIncomeListPage)}
                />
                <Route
                  path="/add-new-household-income"
                  component={requireLogin(AddNewHouseHoldIncomePage)}
                />
                <Route
                  path="/edit-household-income/:id"
                  component={requireLogin(EditHouseHoldIncomePage)}
                />
                <Route
                  path="/manage-household-size-list"
                  component={requireLogin(ManageHouseHoldSizeListPage)}
                />
                <Route
                  path="/add-new-household-size"
                  component={requireLogin(AddNewHouldHoldSizePage)}
                />
                <Route
                  path="/edit-household-size/:id"
                  component={requireLogin(EditHouseHoldSizePage)}
                />
                <Route
                  path="/manage-floor-list"
                  component={requireLogin(ManageFloorListPage)}
                />
                <Route
                  path="/add-new-floor"
                  component={requireLogin(AddNewFloorPage)}
                />
                <Route
                  path="/edit-floor/:id"
                  component={requireLogin(EditFloorPage)}
                />
                <Route
                  path="/manage-price-ranger-list"
                  component={requireLogin(ManagePriceRangerListPage)}
                />
                <Route
                  path="/add-new-price-ranger"
                  component={requireLogin(AddNewPriceRangerPage)}
                />
                <Route
                  path="/edit-price-ranger/:id"
                  component={requireLogin(EditPriceRangerPage)}
                />
                <Route
                  path="/manage-house-style-list"
                  component={requireLogin(ManageStyleListPage)}
                />
                <Route
                  path="/add-new-house-style"
                  component={requireLogin(AddNewStylePage)}
                />
                <Route
                  path="/edit-house-style/:id"
                  component={requireLogin(EditStylePage)}
                />
                <Route
                  path="/release-invoice"
                  component={requireLogin(ReleaseInvoicePage)}
                />
              </Switch>
            </div>
          </Dashboard>
        ) : (
          <React.Fragment>
            <ToastContainer />
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route path="/forgot-password" component={ForgotPasswordPage} />
              <Route
                path="/email-confirm/:uidb64/:token_key"
                component={ResetPasswordPage}
              />
            </Switch>
          </React.Fragment>
        )}
      </div>
    )
  }
}

Routes.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  userimage: PropTypes.string,
  username: PropTypes.string
}

export default withRouter(Routes)
