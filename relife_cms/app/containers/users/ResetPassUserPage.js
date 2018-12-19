/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Container, Row, Col, Button, FormGroup, Label } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'
import { ModalName } from '../../constants'
import StoreListModal from '../../components/StoreListModal'
import UsersActions from '../../redux/wrapper/UsersRedux'
import I18nUtils from '../../utils/I18nUtils'
import { Helmet } from 'react-helmet'

class ResetPassUserPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImage: null,
      showStoreList: false,
      password: '',
      confirmPassword: '',
      email: '',
      store: {},
      group: 4
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.response != nextProps.response) {
      let response = nextProps.response
      if (response.editUser) {
        this.props.show(ModalName.COMMON, {
          message: I18nUtils.t('US016'),
          closeFunction: () => this.closeFunction()
        })
      }
    }
  }

  closeFunction = () => {
    this.props.history.push(`/user/${this.props.match.params.id}`)
    this.props.hide(ModalName.COMMON)
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
  }

  redirectToDetailAcc = () => {
    this.props.history.push(`/user/${this.props.match.params.id}`)
  }

  matchPassword = value => {
    return value && value === this.state.password
  }

  resetPassword = () => {
    let data = {
      id: this.props.match.params.id,
      password: this.state.password
    }
    this.props.editUserRequest(data)
  }

  render() {
    let { showStoreList, password, confirmPassword } = this.state

    return (
      <Container fluid className="user-edit-profile">
        <Helmet>
          <title>{I18nUtils.t('resetPassword')}</title>
        </Helmet>
        <div className="page-title">
          <h1>{I18nUtils.t('resetPassword')}</h1>
        </div>
        <div className="box-group">
          <div className="box-content">
            <StoreListModal
              isOpen={showStoreList}
              toggle={isOpen => this.toggleHandle(isOpen)}
              selectStore={selectedStore => this.selectStore(selectedStore)}
            />
            <ValidationForm
              className="form-user-info"
              onSubmit={this.handleSubmit}
            >
              <Row>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="password">{I18nUtils.t('password')}</Label>
                    <TextInput
                      type="password"
                      name="password"
                      id="password"
                      placeholder={I18nUtils.t('all-place-password')}
                      value={password}
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
                    <Label for="confirmPassword">
                      {I18nUtils.t('confirmPassword')}
                    </Label>
                    <TextInput
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder={I18nUtils.t('all-place-confirmPassword')}
                      value={confirmPassword}
                      onChange={this.handleChange}
                      required
                      validator={this.matchPassword}
                      errorMessage={{
                        required: I18nUtils.t('validate-field-0'),
                        validator: 'Password does not match'
                      }}
                    />
                  </FormGroup>
                </Col>

                <Col xs="12" md="12">
                  <div className="btns-group text-left">
                    <Button color="success" onClick={this.resetPassword}>
                      {I18nUtils.t('save')}
                    </Button>
                    <Button onClick={this.redirectToDetailAcc} color="danger">
                      {I18nUtils.t('back')}
                    </Button>
                  </div>
                </Col>
              </Row>
            </ValidationForm>
          </div>
        </div>
      </Container>
    )
  }
}

ResetPassUserPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  show: PropTypes.func,
  hide: PropTypes.func,
  processing: PropTypes.bool,
  response: PropTypes.object,
  editUserRequest: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.users.processing,
    response: state.users.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  editUserRequest: data => dispatch(UsersActions.editUserRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ResetPassUserPage))
