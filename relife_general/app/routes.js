/**
 * @author Nam NH
 * This file contains all route declaration
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Route, withRouter, Switch } from 'react-router-dom'

import Header from './components/Header'
import Footer from './components/Footer'
import Navbar from './components/Navbar'

//auths
import LoginPage from './containers/auths/LoginPage'
import ForgotPasswordPage from './containers/auths/ForgotPasswordPage'

import HomePage from './containers/HomePage'
import ArticlePage from './containers/ArticlePage'
// import ForgotPasswordPage from './containers/ForgotPasswordPage'

// import Language from './components/Language'

// import AppUtils from './utils/AppUtils'
// import I18nUtils from './utils/I18nUtils'
// import StorageKeyConstants from './constants/StorageKeyConstants'

// import { Dashboard, Header, Sidebar } from 'react-adminlte-dash'

import { Container } from 'reactstrap'

// import admin from './images/admin.jpeg'

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
    // const isAuthenticated = () => {
    //   let isLogin = false
    //   var code = localStorage.getItem(StorageKeyConstants.TOKEN)

    //   if (code && code != '') {
    //     isLogin = true
    //   }

    //   return isLogin
    // }

    // const requireLogin = Component => props => {
    //   return isAuthenticated() ? (
    //     <Component {...props} />
    //   ) : (
    //     <Redirect to="/login" />
    //   )
    // }

    // const nav = () => [
    //   <li className="nav-item" key="1">
    //     <Language />
    //   </li>,
    //   <Header.UserMenu
    //     name="Relife Admin"
    //     image={admin}
    //     profileAction={() => this.props.history.push('/user-dashboard')}
    //     signOutAction={() => AppUtils.logout(this.props.history)}
    //     key="2"
    //   />
    // ]

    // const sb = () => {
    //   return [
    //     <Sidebar.UserPanel name="Relife Admin" image={admin} online key="1" />,
    //     <Sidebar.Search
    //       name={''}
    //       placeholder={I18nUtils.t('search-lbl').toLowerCase()}
    //       onClick={() => this.props.history.push('/search')}
    //       key="2"
    //     />,
    //     <Sidebar.Menu header={I18nUtils.t('nav-main-lbl')} key="3">
    //       <Sidebar.Menu.Item
    //         active={this.props.location.pathname == '/'}
    //         onClick={() => this.props.history.push('/')}
    //         icon={{ className: 'fa-home' }}
    //         title={I18nUtils.t('nav-home-lbl')}
    //       />
    //       <Sidebar.Menu.Item
    //         active={this.props.location.pathname == '/article'}
    //         onClick={() => this.props.history.push('/article')}
    //         icon={{ className: 'fa-pencil' }}
    //         title={I18nUtils.t('nav-article-lbl')}
    //       />
    //     </Sidebar.Menu>
    //   ]
    // }

    // const footer = () => [
    //   <strong key="1">
    //     <span>Copyright © 2018 </span>
    //     <a href="http://mor.vn">Mor Design</a>
    //     <span>. </span>
    //   </strong>,
    //   <span key="2" className="pull-right">
    //     {' '}
    //     All rights reserved.
    //   </span>
    // ]

    let hideMenu =
      this.props.location.pathname.includes('/login') ||
      this.props.location.pathname.includes('/forgot-password') ||
      this.props.location.pathname.includes('/change-password')
    return (
      <div className="wrapper">
      {!hideMenu ?
      <React.Fragment>
        <Header />
        <Navbar />
        <div className="content-wrapper">
          <Container>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/article" component={ArticlePage} />
            </Switch>
          </Container>
        </div>
        <Footer />
      </React.Fragment>
       : 
      <React.Fragment>
        <Switch>
          <Route exact path="/login" component={LoginPage} />
          <Route path="/forgot-password" component={ForgotPasswordPage} />
        </Switch>
      </React.Fragment>}
      </div>
    )
  }
}

Routes.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object
}

export default withRouter(Routes)
