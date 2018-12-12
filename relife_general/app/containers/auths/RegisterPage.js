/**
 * @author HungDQ
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {Helmet} from 'react-helmet'
import AuthsActions from '../../redux/wrapper/AuthsRedux'
import I18nUtils from '../../utils/I18nUtils'
import {ValidationForm, TextInput} from 'react-bootstrap4-form-validation'
import {Button, FormGroup, Label} from 'reactstrap'
import AppUtils from '../../utils/AppUtils'
import Facebook from '../../components/Facebook'

class RegisterPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
        document.body.classList.add('cms-login-index')
    }
    componentWillUnmount() {
        document.body.classList.remove('cms-login-index')
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.data != nextProps.data) {
            let data = nextProps.data.data
            if (data.token) {
                AppUtils.login(this.props.history, data.token, '/')
            }
        }
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = e => {
        e.preventDefault()
        let data = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }
        this.props.registerRequest(data)
    }
    render() {
        return (
            <div className="register-page">
                <Helmet>
                    <title>{I18nUtils.t('register-page-title')}</title>
                </Helmet>
                <div className="login-content">
                    <div className="form-center">
                        <div className="form-header">
                            <h3>{I18nUtils.t('register-page-title')}</h3>
                        </div>
                        <div className="form-body">
                            <ValidationForm onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Label for="email">{I18nUtils.t('email')}</Label>
                                    <TextInput
                                        className="form-control"
                                        type="text"
                                        name="email"
                                        id="email"
                                        placeholder={I18nUtils.t('email')}
                                        required
                                        pattern=".{3,}"
                                        errorMessage={{
                                            required: I18nUtils.t('validate-field-0'),
                                            pattern: I18nUtils.t('validate-field-3')
                                        }}
                                        onChange={this.handleChange}
                                        value={this.state.email}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="username">{I18nUtils.t('username')}</Label>
                                    <TextInput
                                        className="form-control"
                                        type="text"
                                        name="username"
                                        id="username"
                                        placeholder={I18nUtils.t('all-place-username')}
                                        required
                                        pattern=".{3,}"
                                        errorMessage={{
                                            required: I18nUtils.t('validate-field-0'),
                                            pattern: I18nUtils.t('validate-field-3')
                                        }}
                                        onChange={this.handleChange}
                                        value={this.state.username}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="password">{I18nUtils.t('password')}</Label>
                                    <TextInput
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder={I18nUtils.t('all-place-password')}
                                        className="form-control"
                                        required
                                        pattern="(?=.*[A-Z]).{8,}"
                                        errorMessage={{
                                            required: I18nUtils.t('validate-field-0'),
                                            pattern: I18nUtils.t('validate-pass')
                                        }}
                                        onChange={this.handleChange}
                                        autoComplete="new-password"
                                        value={this.state.password}
                                    />
                                </FormGroup>
                                <FormGroup className="btns-group">
                                    <Button color="primary">{I18nUtils.t('register')}</Button>
                                </FormGroup>
                                <FormGroup>
                                    <Facebook />
                                </FormGroup>
                            </ValidationForm>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
RegisterPage.propTypes = {
    history: PropTypes.object,
    data: PropTypes.object,
    processing: PropTypes.bool,
    registerRequest: PropTypes.func
}
const mapStateToProps = state => {
    return {
        processing: state.auths.processing,
        data: state.auths.data
    }
}
const mapDispatchToProps = dispatch => ({
    registerRequest: data => dispatch(AuthsActions.registerRequest(data))
})
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(RegisterPage))
