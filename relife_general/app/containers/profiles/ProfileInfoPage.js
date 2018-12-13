/**
 * @author HaPV
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import ProfileActions from '../../redux/wrapper/ProfileRedux'
import { Container, Row, Col, Label } from 'reactstrap'
import I18nUtils from '../../utils/I18nUtils'
import avatarDefault from '../../images/user.png'

class ProfileInfoPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImage: null,
      data: []
    }
  }

  componentDidMount() {
    this.props.profileRequest({})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      if (nextProps.data.getProfile) {
        this.setState({
          data: nextProps.data.data
        })
      }
    }
  }

  handleProfileChange = image => {
    this.setState({
      profileImage: image
    })
  }

  redirectToEditPage = data => {
    this.props.history.push('/profile-edit')
    this.setState({ data })
  }

  redirectToChangePass = () => {
    this.props.history.push('profile-change-password')
  }

  render() {
    let { profileImage, data } = this.state
    if (data.profile_image != null) profileImage = data.profile_image
    else profileImage = avatarDefault
    return (
      <Container className="user-dashboard-content">
        <Row>
          <Col xs="6" md="3">
            <div className="user-profile-sidebar">
              <div className="user-profile-top">
                <div className="avatar">
                  <img src={profileImage} alt={data.username} />
                </div>
                <div className="user-profile-name">
                  {data.username}
                </div>
              </div>

              <div className="user-profile-action">
                <Link to="/profile-edit">
                  <i className="fa fa-angle-down" aria-hidden="true" />
                  {I18nUtils.t('ud-btn-editprofile')}
                </Link>
              </div>
              <div className="user-profile-action">
                <Link to="/profile-change-password">
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
          </Col>
          <Col xs="6" md="9">
            <div className="user-profile-content">
              <Col xs="12" md="6">
                <Label>{I18nUtils.t('username')}:</Label>
                <span>{data.username}</span>
              </Col>
              <Col xs="12" md="6">
                <Label>{I18nUtils.t('email')}:</Label>
                <span>{data.email}</span>
              </Col>
              <Col xs="12" md="6">
                <Label>{I18nUtils.t('fname')}:</Label>
                <span>{data.first_name}</span>
              </Col>
              <Col xs="12" md="6">
                <Label>{I18nUtils.t('lname')}:</Label>
                <span>{data.last_name}</span>
              </Col>
              <Col xs="12" md="6">
                <Label>{I18nUtils.t('phone')}:</Label>
                <span>{data.tel}</span>
              </Col>
              <Col xs="12" md="6">
                <Label>{I18nUtils.t('address')}:</Label>
                <span>{data.address}</span>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

ProfileInfoPage.propTypes = {
  history: PropTypes.object,
  maxFileSize: PropTypes.number,
  onChange: PropTypes.func,
  profileRequest: PropTypes.func,
  data: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.profile.processing,
    data: state.profile.data
  }
}

const mapDispatchToProps = dispatch => ({
  profileRequest: data => dispatch(ProfileActions.profileRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileInfoPage))
