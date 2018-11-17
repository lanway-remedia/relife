/**
 * @author Nam NH
 * This file contains all route declaration
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import LoginPage from './containers/LoginPage'
import ResetPasswordPage from './containers/ResetPasswordPage'
import HomePage from './containers/HomePage'
import ArticlePage from './containers/ArticlePage'
import UserDashboardPage from './containers/UserDashboardPage'
import UserEditPage from './containers/UserEditPage'
import ListAccountPage from './containers/ListAccountPage'
import ForgotPasswordPage from './containers/ForgotPasswordPage'

import Language from './components/Language'

import AppUtils from './utils/AppUtils'
import I18nUtils from './utils/I18nUtils'
import { StorageKeyConstants } from './constants'

import { Dashboard, Header, Sidebar } from 'react-adminlte-dash'

import admin from './images/admin.jpeg'
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
        name="Relife Admin"
        image={admin}
        profileAction={() => this.props.history.push('/profile')}
        signOutAction={() => AppUtils.logout(this.props.history)}
        key="2"
      />
    ]

    const sb = () => {
      return [
        <Sidebar.UserPanel name="Relife Admin" image={admin} online key="1" />,
        <Sidebar.Search
          name={''}
          placeholder={I18nUtils.t('search-lbl').toLowerCase()}
          onClick={() => this.props.history.push('/search')}
          key="2"
        />,
        <Sidebar.Menu header={I18nUtils.t('nav-main-lbl')} key="3">
          <Sidebar.Menu.Item
            active={this.props.location.pathname == '/'}
            onClick={() => this.props.history.push('/')}
            icon={{ className: 'fa-home' }}
            title={I18nUtils.t('nav-home-lbl')}
          />
          <Sidebar.Menu.Item
            title="User Management"
            icon={{ className: 'fa-address-card' }}
          >
            <Sidebar.Menu.Item
              active={this.props.location.pathname === '/user-dashboard'}
              title={I18nUtils.t('ud-page-title')}
              onClick={() => this.props.history.push('/user-dashboard')}
            />
            <Sidebar.Menu.Item
              active={this.props.location.pathname === '/list-account'}
              title={I18nUtils.t('la-page-title')}
              onClick={() => this.props.history.push('/list-account')}
            />
          </Sidebar.Menu.Item>
          <Sidebar.Menu.Item
            active={this.props.location.pathname == '/article'}
            onClick={() => this.props.history.push('/article')}
            icon={{ className: 'fa-pencil' }}
            title={I18nUtils.t('nav-article-lbl')}
          />
        </Sidebar.Menu>
      ]
    }

    const footer = () => [
      <strong key="1">
        <span>Copyright © 2018 </span>
        <a href="http://mor.vn">Mor Design</a>
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
                <Route exact path="/" component={requireLogin(HomePage)} />
                <Route path="/article" component={requireLogin(ArticlePage)} />
                <Route
                  path="/user-dashboard"
                  component={requireLogin(UserDashboardPage)}
                />
                <Route
                  path="/user-edit"
                  component={requireLogin(UserEditPage)}
                />
                <Route
                  path="/list-account"
                  component={requireLogin(ListAccountPage)}
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
              <Route path="/email-confirm/:uidb64/:token_key" component={ResetPasswordPage} />
            </Switch>
          </React.Fragment>
        )}
      </div>
    )
  }
}

Routes.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(Routes)
