/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ProfileActions from '../../redux/wrapper/ProfileRedux'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Container, Row, Col, Button, FormGroup, Label } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'
import { ModalName } from '../../constants'
import I18nUtils from '../../utils/I18nUtils'
import ProfileNav from '../../components/ProfileNav'
class ProfileChangePassPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  }

  componentDidMount() {
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

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  matchPassword = (value) => value && value === this.state.newPassword

  render() {
    return (
      <Container className="profile-info">
        <Row>
          <Col xs="12" md="4">
            <ProfileNav />
          </Col>
          <Col xs="12" md="8">
            <div className="profile-info-detail">
              <h3>{I18nUtils.t('change-password')}</h3>
              <hr />
              <ValidationForm className="form-user-info" onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="currentPassword">
                    {I18nUtils.t('current-password')}
                  </Label>
                  <TextInput
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
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

                <FormGroup>
                  <Label for="fname">{I18nUtils.t('new-password')}</Label>
                  <TextInput
                    type="password"
                    name="newPassword"
                    id="newPassword"
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

                <FormGroup>
                  <Label for="email">{I18nUtils.t('confirm-password')}</Label>
                  <TextInput
                    type="password"
                    name="confirmNewPassword"
                    id="confirmNewPassword"
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
                <div className="profile-btn">
                  <Button color="default">{I18nUtils.t('change-password')}</Button>
                </div>
              </ValidationForm>
            </div>
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
  hide: PropTypes.func
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
