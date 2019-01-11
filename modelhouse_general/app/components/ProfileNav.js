/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  ListGroup, ListGroupItem
} from 'reactstrap'
import ProfileImage from './ProfileImage'
import I18nUtils from '../utils/I18nUtils'
import AppUtils from '../utils/AppUtils'
import classnames from 'classnames'
import ProfileActions from '../redux/wrapper/ProfileRedux'

class ProfileNav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImage: null
    }
  }

  componentDidMount() {
    this.props.profileRequest({})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      if (nextProps.data.getProfile) {
        let profile = nextProps.data.data
        this.setState({
          profileImage: profile.profile_image
        })
      }
    }
  }

  profileChange = (profileImage) => {
    this.setState({
      profileImage
    })
    let formData = new FormData()
    formData.append('file', profileImage)
    this.props.editProfileAvatarRequest(formData)
  }

  render() {
    let { profileImage } = this.state
    let { location, history } = this.props
    return (
      <div className="profile-nav">
        <div className="profile">
          <div className="image-container">
            <ProfileImage size={60} profileImage={profileImage} onProfileChange={profileImage => { this.profileChange(profileImage) }} />
          </div>
          <div className="info-container">
            <div>
              <span>Frank Lucas</span><br />
              <span><i>{}</i></span>
            </div>
          </div>
        </div>
        <div className="navigation">
          <ListGroup flush>
            <ListGroupItem
              className={classnames({ active: location.pathname=='/profile' })}
              onClick={() => history.push('/profile')}
            >
              {I18nUtils.t('profile-info')}
            </ListGroupItem>
            <ListGroupItem
              className={classnames({ active: location.pathname=='/change-pass' })}
              onClick={() => history.push('/change-pass')}
            >
              {I18nUtils.t('change-password')}
            </ListGroupItem>
            <ListGroupItem
              className={classnames({ active: location.pathname=='/booking-history' })}
              onClick={() => history.push('/booking-history')}
            >
              {I18nUtils.t('booking-history')}
            </ListGroupItem>
            <ListGroupItem
              className={classnames({ active: location.pathname=='/become-outler' })}
              onClick={() => history.push('/become-outler')}
            >
              {I18nUtils.t('become-store')}
            </ListGroupItem>
            <ListGroupItem
              onClick={() => AppUtils.logout(this.props.history)}
            >
              {I18nUtils.t('logout')}
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    )
  }
}

ProfileNav.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  data: PropTypes.object,
  editProfileAvatarRequest: PropTypes.func,
  profileRequest: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.profile.processing,
    data: state.profile.data
  }
}

const mapDispatchToProps = dispatch => ({
  profileRequest: data => dispatch(ProfileActions.profileRequest(data)),
  editProfileRequest: data => dispatch(ProfileActions.editProfileRequest(data)),
  editProfileAvatarRequest: formData =>
    dispatch(ProfileActions.editProfileAvatarRequest(formData))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileNav))
