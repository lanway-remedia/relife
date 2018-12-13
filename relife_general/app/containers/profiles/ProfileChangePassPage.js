/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import ProfileActions from '../../redux/wrapper/ProfileRedux'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Container, Row, Col, Button, FormGroup, Label } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'
import { ModalName } from '../../constants'
import I18nUtils from '../../utils/I18nUtils'
import avatarDefault from '../../images/user.png'
class ProfileChangePassPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImage: null,
      data: [],
      id: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  }

  componentDidMount() {
    //document.title = `${I18nUtils.t('ucp-page-title')}`
    if (!this.props.data.getProfile) {
      let data = {}
      this.props.profileRequest(data)
    } else {
      this.setState({
        data: this.props.data.data,
        id: this.props.data.data.id
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    let data = {
      password: this.state.currentPassword,
      password1: this.state.newPassword,
      password2: this.state.confirmNewPassword
    }
    this.props.changePassRequest(data)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      if (nextProps.data.getProfile) {
        this.setState({
          data: nextProps.data.data,
          id: nextProps.data.data.id
        })
      }
      if (nextProps.data.changePass) {
        if (nextProps.data.messageCode)
        this.props.show(ModalName.COMMON, { message: I18nUtils.t(nextProps.data.messageCode), closeFunction: () => this.closeFunction() })
      }
    }
  }

  closeFunction = () => {
    this.props.history.push(`/profile`)
    this.props.hide(ModalName.COMMON)
  }

  redirectToProfile = () => {
    this.props.history.push('/profile')
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  matchPassword = (value) => value && value === this.state.newPassword

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
          <ValidationForm className="form-user-info" onSubmit={this.handleSubmit}>
            <Row>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for="currentPassword">
                    {I18nUtils.t('currentPassword')}
                  </Label>
                  <TextInput
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    placeholder={I18nUtils.t('all-place-currentPassword')}
                    value={this.state.currentPassword}
                    onChange={this.handleChange}
                    required
                    pattern="(?=.*[A-Z]).{8,}"
                    errorMessage={{
                      required: I18nUtils.t('validate-field-0'),
                      pattern: I18nUtils.t('validate-pass')
                    }}
                    autoComplete="new-password"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for="fname">{I18nUtils.t('newPassword')}</Label>
                  <TextInput
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder={I18nUtils.t('all-place-newPassword')}
                    value={this.state.newPassword}
                    onChange={this.handleChange}
                    required
                    pattern="(?=.*[A-Z]).{8,}"
                    errorMessage={{
                      required: I18nUtils.t('validate-field-0'),
                      pattern: I18nUtils.t('validate-pass')
                    }}
                    autoComplete="new-password"
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="6">
                <FormGroup>
                  <Label for="email">{I18nUtils.t('confirmNewPassword')}</Label>
                  <TextInput
                    type="password"
                    name="confirmNewPassword"
                    id="confirmNewPassword"
                    placeholder={I18nUtils.t('all-place-confirmNewPassword')}
                    value={this.state.confirmNewPassword}
                    onChange={this.handleChange}
                    required
                    validator={this.matchPassword}
                    errorMessage={{
                      required: I18nUtils.t('validate-field-0'),
                      validator: 'Password does not match'
                    }}
                    autoComplete="new-password"
                  />
                </FormGroup>
              </Col>
              <Col xs="12" md="12">
                <div className="btns-group text-left">
                  <Button color="success">{I18nUtils.t('changePassword')}</Button>
                  <Button onClick={this.redirectToProfile} color="danger">
                    {I18nUtils.t('back')}
                  </Button>
                </div>
              </Col>
            </Row>
          </ValidationForm>
          </Col>
        </Row>
      </Container>
    )
  }
}

ProfileChangePassPage.propTypes = {
  history: PropTypes.object,
  data: PropTypes.object,
  profileRequest: PropTypes.func,
  changePassRequest: PropTypes.func,
  show: PropTypes.func,
  hide:PropTypes.func
}

const mapStateToProps = state => {
  return {
    data: state.profile.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  profileRequest: data => dispatch(ProfileActions.profileRequest(data)),
  changePassRequest: data => dispatch(ProfileActions.changePassRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileChangePassPage))
