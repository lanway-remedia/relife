/**
 * @author Nam NH
 * This file contains all route declaration
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect, withRouter, Switch } from 'react-router-dom'
//header & navigation
import Header from './components/Header'
import Footer from './components/Footer'
import Navigation from './components/Navigation'
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
//examplehouses
import ManageExampleHouseListPage from './containers/examplehouses/ManageExampleHouseListPage'
import AddNewExampleHousePage from './containers/examplehouses/AddNewExampleHousePage'
import EditExampleHousePage from './containers/examplehouses/EditExampleHousePage'
//Invoice
import ReleaseInvoicePage from './containers/invoices/ReleaseInvoicePage'

//Test page
import TestPage from './containers/TestPage'

import { StorageKeyConstants } from './constants'

class Routes extends React.Component {
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)
    this.state = {
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

    let hideMenu =
      this.props.location.pathname.includes('/login') ||
      this.props.location.pathname.includes('/forgot-password') ||
      this.props.location.pathname.includes('/email-confirm')

    return (
      <div className="wrapper">
        <React.Fragment>
          {!hideMenu && <Header />}
          {hideMenu ? (
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route path="/forgot-password" component={ForgotPasswordPage} />
              <Route
                path="/email-confirm/:uidb64/:token_key"
                component={ResetPasswordPage}
              />
            </Switch>
          ) : (
            <div className="main-wrapper">
              <Navigation />
              <div className="main-content">
                <Switch>
                  <Route
                    exact
                    path="/"
                    component={requireLogin(ProfileInfoPage)}
                  />
                  <Route
                    path="/profile"
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
                    path="/edit-example-house/:id"
                    component={requireLogin(EditExampleHousePage)}
                  />
                  <Route
                    path="/manage-example-house-list"
                    component={requireLogin(ManageExampleHouseListPage)}
                  />
                  <Route
                    path="/add-new-example-house"
                    component={requireLogin(AddNewExampleHousePage)}
                  />
                  <Route
                    path="/invoice-release"
                    component={requireLogin(ReleaseInvoicePage)}
                  />
                  <Route path="/test" component={requireLogin(TestPage)} />
                </Switch>
              </div>
            </div>
          )}
          {!hideMenu && <Footer />}
        </React.Fragment>
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
