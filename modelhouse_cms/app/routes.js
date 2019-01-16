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
