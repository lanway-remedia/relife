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
import EditCategoryPage from './containers/categories/EditCategoryPage'
//languages
import Language from './components/Language'

import AppUtils from './utils/AppUtils'
import I18nUtils from './utils/I18nUtils'
import { StorageKeyConstants } from './constants'
import { Dashboard, Header, Sidebar } from 'react-adminlte-dash'
import 'react-toastify/dist/ReactToastify.css'

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
      return [
        <Sidebar.UserPanel name={username} image={userimage} online key="1" />,
        // <Sidebar.Search
        //   name={''}
        //   placeholder={I18nUtils.t('search-lbl').toLowerCase()}
        //   onClick={() => this.props.history.push('/search')}
        //   key="2"
        // />,
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
              active={this.props.location.pathname === '/add-new-outlet-store'}
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
              onClick={() => this.props.history.push('/manage-exhibition-list')}
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
              active={this.props.location.pathname === '/manage-category-list'}
              title={I18nUtils.t('cate-page-title')}
              icon={{ className: 'fa-list-ol' }}
              onClick={() => this.props.history.push('/manage-category-list')}
            />
          </Sidebar.Menu.Item>
          {/* <Sidebar.Menu.Item
            active={this.props.location.pathname == '/article'}
            onClick={() => this.props.history.push('/article')}
            icon={{ className: 'fa-pencil' }}
            title={I18nUtils.t('nav-article-lbl')}
          /> */}
        </Sidebar.Menu>
      ]
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
                <Route
                  path="/users"
                  component={requireLogin(UserListPage)}
                />
                <Route
                  path="/user/:id"
                  component={requireLogin(UserDetailPage)}
                />
                <Route
                  path="/add-user"
                  component={requireLogin(AddUserPage)}
                />
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
                  path="/edit-category/:id"
                  component={requireLogin(EditCategoryPage)}
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
