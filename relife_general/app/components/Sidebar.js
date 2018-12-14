import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import I18nUtils from '../utils/I18nUtils'

class Sidebar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }

  render() {
    let { profileImage, username } = this.props
    return (
      <div className="user-profile-sidebar">
        <div className="user-profile-top">
          <div className="avatar">
            <img src={profileImage} alt={username} />
          </div>
          <div className="user-profile-name">
            {username}
          </div>
        </div>

        <div className="user-profile-action">
          <Link to="/profile">
            <i className="fa fa-user icon" aria-hidden="true" />
            {I18nUtils.t('profile-info')}
          </Link>
        </div>
        <div className="user-profile-action">
          <Link to="/profile-edit">
            <i className="fa fa-pencil icon" aria-hidden="true" />
            {I18nUtils.t('ud-btn-editprofile')}
          </Link>
        </div>
        <div className="user-profile-action">
          <Link to="/profile-change-password">
            <i className="fa fa-unlock-alt icon" aria-hidden="true" />
            {I18nUtils.t('changePassword')}
          </Link>
        </div>
        <div className="user-profile-action">
          <Link to="">
            {I18nUtils.t('booking-history')}
          </Link>
        </div>
        <div className="user-profile-action">
          <Link to="">
            {I18nUtils.t('became-store')}
          </Link>
        </div>
      </div>
    )
  }
}

Sidebar.propTypes = {
  data: PropTypes.object,
  profileImage: PropTypes.string,
  username: PropTypes.string
}

export default connect()(withRouter(Sidebar))
