/**
 * @author HaPV
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { show, hide } from 'redux-modal'
import { bindActionCreators } from 'redux'
import { ModalName } from '../../constants'
import AuthsActions from '../../redux/wrapper/AuthsRedux'
import I18nUtils from '../../utils/I18nUtils'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import validator from 'validator'
import {
  Button,
  FormGroup,
  Label
} from 'reactstrap'
import formLogo from '../../images/form-logo.png'

class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mail: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    document.body.classList.add('cms-index-auth')
  }

  componentWillUnmount() {
    document.body.classList.remove('cms-index-auth')
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.response != nextProps.response) {
      let response = nextProps.response
      if (response.forgotPassword) {
        this.props.show(ModalName.COMMON, { message: I18nUtils.t(response.messageCode), okFunction: () => this.okFunction()})
      }
    }
  }

  okFunction() {
    this.props.history.push('/login')
    this.props.hide(ModalName.COMMON)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    let data = {
      mail: this.state.mail,
      domain: window.location.origin + '/'
    }
    this.props.forgotPasswordRequest(data)
  }

  render() {
    return (
      <div className="form-account" id="reset-password">
        <Helmet>
          <title>{I18nUtils.t('forgotpassword-page-title')}</title>
        </Helmet>
        <div className="form-logo">
            <img src={formLogo}
              alt="logo" 
              width="100%"
            />
        </div>
        <h6 className="form-account_title">{I18nUtils.t('login-title')}</h6>
        <p className="form_note">{I18nUtils.t('forgot-text')}</p>
        <ValidationForm
          onSubmit={this.handleSubmit}
        >
          <FormGroup className="form-account_label">
            <Label for="mail">{I18nUtils.t('email')}</Label>
            <TextInput
              type="email"
              name="mail"
              id="mail"
              placeholder={I18nUtils.t('all-place-email')}
              onChange={this.handleChange}
              validator={validator.isEmail} 
              errorMessage={{validator:'Please enter a valid email'}}
              className="form-control"
            />
          </FormGroup>
          <Button className="form_btn btn-default">
            {I18nUtils.t('send')}
          </Button>
        </ValidationForm>
      </div>
    )
  }
}

ForgotPasswordPage.propTypes = {
  location: PropTypes.object,
  history: PropTypes.object,
  processing: PropTypes.bool,
  response: PropTypes.object,
  show: PropTypes.func,
  hide: PropTypes.func,
  forgotPasswordRequest: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.auths.processing,
    response: state.auths.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  forgotPasswordRequest: data => dispatch(AuthsActions.forgotPasswordRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ForgotPasswordPage))
