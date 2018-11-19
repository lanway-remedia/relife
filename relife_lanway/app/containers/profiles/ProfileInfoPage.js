/**
 * @author HaPV
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ProfileActions from '../../redux/wrapper/UserProfileRedux'
import { Container, Row, Col, Button, Label } from 'reactstrap'
import I18nUtils from '../../utils/I18nUtils'

import avatarUser from '../../images/admin.jpeg'

class ProfileInfoPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImage: null,
      data: []
    }
  }

  componentDidMount() {
    document.title = `${I18nUtils.t('ud-page-title')}`
    let data = {}
    this.props.profileRequest(data)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      this.setState({
        data: nextProps.data.data
      })
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
    let fullName = data.first_name + ' ' + data.last_name
    if (data.profile_image != null) profileImage = data.profile_image
    else profileImage = avatarUser
    return (
      <Container fluid className="user-dashboard-content">
        <div className="page-title">
          <h1>
            <i className="fa fa-signal" aria-hidden="true" />
            {I18nUtils.t('ud-page-title')}
          </h1>
        </div>
        <div className="account-avatar">
          <div className="avatar">
            <img src={profileImage} alt={data.username} />
          </div>
          <div className="info">
            <p>
              {I18nUtils.formatMessage({ id: 'ud-hi' }, { name: fullName })}
            </p>
            <p>{I18nUtils.t('ud-welcome')}</p>
          </div>
        </div>
        <div className="account-info">
          <Row>
            <Col xs="12" md="5">
              <Label>{I18nUtils.t('fname')}:</Label>
              <span>{data.first_name}</span>
            </Col>
            <Col xs="12" md="5">
              <Label>{I18nUtils.t('lname')}:</Label>
              <span>{data.last_name}</span>
            </Col>
            <Col xs="12" md="5">
              <Label>{I18nUtils.t('email')}:</Label>
              <span>{data.email}</span>
            </Col>
            <Col xs="12" md="5">
              <Label>{I18nUtils.t('phone')}:</Label>
              <span>{data.tel}</span>
            </Col>
            <Col xs="12" md="5">
              <Label>{I18nUtils.t('username')}:</Label>
              <span>{data.username}</span>
            </Col>
            <Col xs="12" md="5">
              <Label>{I18nUtils.t('address')}:</Label>
              <span>{data.address}</span>
            </Col>
            <Col xs="12" md="12" className="mt-3">
              <div className="btns-group text-left">
                <Button
                  color="primary"
                  onClick={() => this.redirectToEditPage(data)}
                >
                  {I18nUtils.t('ud-btn-editprofile')}
                </Button>
                <Button onClick={this.redirectToChangePass} color="primary">
                  {I18nUtils.t('changePassword')}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
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
    processing: state.userProfile.processing,
    data: state.userProfile.data
  }
}

const mapDispatchToProps = dispatch => ({
  profileRequest: data => dispatch(ProfileActions.profileRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileInfoPage))
