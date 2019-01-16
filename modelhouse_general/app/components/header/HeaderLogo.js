import React from 'react'
import logo from '../../images/logo.png'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import I18nUtils from '../../utils/I18nUtils'
class HeaderLogo extends React.Component {
  render() {
    return (
      <div className="header-logo">
        <Link to="/" className="header-logo-inner">
          <img src={logo} className="header-logo-img" />
          <span className="header-logo-text">{I18nUtils.t('header-logo-text')}</span>
        </Link>
        <Link to="/about-us" className="header-logo-link">Re:Lifeとは </Link>
      </div>
    )
  }
}
export default connect()(withRouter(HeaderLogo))
