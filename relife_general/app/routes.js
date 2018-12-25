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
import Footer from './components/Footer'
//breadcrumb
import Breadcrumb from './components/Breadcrumb'
//homepage
import HomePage from './containers/HomePage'
//auths
import RegisterPage from './containers/auths/RegisterPage'
import LoginPage from './containers/auths/LoginPage'
import ResetPasswordPage from './containers/auths/ResetPasswordPage'
import ForgotPasswordPage from './containers/auths/ForgotPasswordPage'
//profiles
import ProfileInfoPage from './containers/profiles/ProfileInfoPage'
import ProfileChangePassPage from './containers/profiles/ProfileChangePassPage'
import ProfileBecomeOutlerPage from './containers/profiles/ProfileBecomeOutlerPage'
import ProfileBookingHistoryPage from './containers/profiles/ProfileBookingHistoryPage'
//exampleHouse
import ExampleHouseListPage from './containers/exampleHouse/ExampleHouseListPage'
import ExampleHouseViewPage from './containers/exampleHouse/ExampleHouseViewPage'
//outletStores
import OutletStoresListPage from './containers/outletStores/OutletStoresListPage'
import OutletStoresViewPage from './containers/outletStores/OutletStoresViewPage'

import {StorageKeyConstants} from './constants'
import 'react-toastify/dist/ReactToastify.css'
import defaultAvatar from './images/user.png'
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
                    <Header 
                        isAuthenticated={isAuthenticated()}
                        name={username}
                        image={userimage}
                    />
                    <Breadcrumb />
                    <Switch>
                        <Route path="/login" component={LoginPage} />
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
                            path="/profile"
                            component={requireLogin(ProfileInfoPage)}
                        />
                        <Route
                            path="/change-pass"
                            component={requireLogin(ProfileChangePassPage)}
                        />
                        <Route
                            path="/become-outler"
                            component={requireLogin(ProfileBecomeOutlerPage)}
                        />
                        <Route
                            path="/booking-history"
                            component={requireLogin(ProfileBookingHistoryPage)}
                        />
                        <Route
                            exact path="/example/"
                            component={ExampleHouseListPage}
                        />
                        <Route
                            path="/example/:id"
                            component={ExampleHouseViewPage}
                        />
                        <Route
                            exact path="/builder/"
                            component={OutletStoresListPage}
                        />
                        <Route
                            path="/builder/:id"
                            component={OutletStoresViewPage}
                        />

                    </Switch>
                    <Footer />
                </React.Fragment>
                ) : (
                <React.Fragment>
                    <ToastContainer />
                    <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
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
