/**
 * @author HaPV
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import I18nUtils from '../utils/I18nUtils'
import {
  FormWithConstraints,
  FieldFeedbacks,
  FieldFeedback
} from 'react-form-with-constraints'
import {
  Button,
  FormGroup,
  FormText,
  InputGroupAddon,
  Input,
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

    // Validates only the given fields and returns Promise<Field[]>
    const fields = await this.form.validateFields(target)

    const fieldIsValid = fields.every(field => field.isValid())
    if (fieldIsValid) console.log(`Field '${target.name}' is valid`)
    else console.log(`Field '${target.name}' is invalid`)

    if (this.form.isValid()) console.log('The form is valid')
    else console.log('The form is invalid')
  }

  handleSubmit = async e => {
    e.preventDefault()

    // Validates the non-dirty fields and returns Promise<Field[]>
    const fields = await this.form.validateForm()

    // or simply use this.form.isValid()
    const formIsValid = fields.every(field => field.isValid())

    if (formIsValid) console.error('The form is valid')
    else console.log('The form is invalid')
  }

  render() {
    return (
      <div className="login-page forgotpassword-page">
        <div className="login-header">
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
                    />
                  </InputGroup>
                  <FieldFeedbacks for="forgotEmail">
                    <FieldFeedback when={value => value.length === 0}>
                      Please fill out this field.
                    </FieldFeedback>
                    <FieldFeedback when={value => !/\S+@\S+/.test(value)}>
                      Invalid email address.
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
        </div>
      </div>
    )
  }
}

ForgotPasswordPage.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(ForgotPasswordPage))
