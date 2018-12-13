/**
 * @author Nam NH
 * This file contains all route declaration
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Route, Redirect, withRouter, Switch} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
//header
import Header from './components/Header'
//homepage
import HomePage from './containers/HomePage'
//auths
import RegisterPage from './containers/auths/RegisterPage'
import LoginPage from './containers/auths/LoginPage'
import ResetPasswordPage from './containers/auths/ResetPasswordPage'
import ForgotPasswordPage from './containers/auths/ForgotPasswordPage'
//profiles
import ProfileInfoPage from './containers/profiles/ProfileInfoPage'
import ProfileEditPage from './containers/profiles/ProfileEditPage'
import ProfileChangePassPage from './containers/profiles/ProfileChangePassPage'

import {StorageKeyConstants} from './constants'
import 'react-toastify/dist/ReactToastify.css'

class Routes extends React.Component {
    constructor(props) {
        super(props)
        this.toggle = this.toggle.bind(this)
        this.state = {
            theme: 'skin-red-light',
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
            this.props.location.pathname.includes('/email-confirm') ||
            this.props.location.pathname.includes('/register')
        return (
            <div className="wrapper">
                {!hideMenu ? (
                <React.Fragment>
                    <ToastContainer />
                    <Header />
                    <Switch>
                        <Route exact path="/login" component={LoginPage} />
                        <Route path="/forgot-password" component={ForgotPasswordPage} />
                        <Route
                            path="/email-confirm/:uidb64/:token_key"
                            component={ResetPasswordPage}
                        />
                        <Route
                            exact
                            path="/"
                            component={HomePage}
                        />
                        <Route
                            exact
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
                </React.Fragment>
                ) : (
                <React.Fragment>
                    <ToastContainer />
                    <Switch>
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={RegisterPage} />
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
