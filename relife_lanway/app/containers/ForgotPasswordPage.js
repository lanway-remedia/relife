/**
 * @author HaPV
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import I18nUtils from '../utils/I18nUtils'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import {
  Button,
  FormGroup,
  FormText,
  InputGroupAddon,
  InputGroup,
  Label
} from 'reactstrap'

class ForgotPasswordPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    document.body.classList.add('cms-forgotpassword-index')
    document.title = `${I18nUtils.t('forgotpassword-page-title')}`
  }

  componentWillUnmount() {
    document.body.classList.remove('cms-forgotpassword-index')
  }

  handleChange = async e => {
    const target = e.target

    this.setState({
      [target.name]: target.value
    })

    await this.form.validateFields(target)
  }

  handleSubmit = async e => {
    e.preventDefault()

    await this.form.validateForm()
    const formIsValid = this.form.isValid()

    if (formIsValid) {
      alert(
        `Valid form\n\nthis.state =\n${JSON.stringify(this.state, null, 2)}`
      )
    }
  }

  render() {
    return (
      <div className="login-page forgotpassword-page">
        {/* <div className="login-header">
          <span>Re:Style</span>
        </div>
        <div className="login-content">
          <div className="form-center">
            <div className="form-header">
              <h3>{I18nUtils.t('forgotpassword-page-title')}</h3>
            </div>
            <div className="form-body">
              <FormWithConstraints
                ref={form => (this.form = form)}
                onSubmit={this.handleSubmit}
                noValidate
              >
                <FormGroup>
                  <FormText color="muted">
                    {I18nUtils.t('forgot-text')}
                  </FormText>
                </FormGroup>
                <FormGroup>
                  <Label for="forgotEmail">{I18nUtils.t('email')}</Label>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <span className="input-group-text">
                        <i className="fa fa-envelope" aria-hidden="true" />
                      </span>
                    </InputGroupAddon>
                    <Input
                      type="email"
                      name="forgotEmail"
                      id="forgotEmail"
                      placeholder={I18nUtils.t('all-place-email')}
                      onChange={this.handleChange}
                      required
                      minLength={3}
                      className="form-control"
                    />
                  </InputGroup>
                  <FieldFeedbacks for="forgotEmail">
                    <FieldFeedback when={value => value.length === 0}>
                      {I18nUtils.t('validate-field-0')}
                    </FieldFeedback>
                    <FieldFeedback when={value => !/\S+@\S+/.test(value)}>
                      {I18nUtils.t('validate-email')}
                    </FieldFeedback>
                  </FieldFeedbacks>
                </FormGroup>
                <FormGroup>
                  <Link to="/login" title={I18nUtils.t('forgot-back-login')}>
                    &larr; {I18nUtils.t('forgot-back-login')}
                  </Link>
                </FormGroup>
                <FormGroup className="btns-group">
                  <Button color="primary">{I18nUtils.t('send')}</Button>
                </FormGroup>
              </FormWithConstraints>
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

ForgotPasswordPage.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(ForgotPasswordPage))
