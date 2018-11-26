/**
 * @author HaPV
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import UsersActions from '../../redux/wrapper/UsersRedux'
import { Container, Row, Col, Button, Label } from 'reactstrap'
import I18nUtils from '../../utils/I18nUtils'
import { Helmet } from 'react-helmet'
import user from '../../images/user.png'

class UserDetailPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImage: null,
      data: {}
    }
  }

  componentDidMount() {
    let id = this.props.match.params.id
    this.props.findUserById(id)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      if (nextProps.data.findUserById) {
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

  redirectToEditPage = () => {
    this.props.history.push(`/edit-user/${this.props.match.params.id}`)
  }

  redirectToResetPass = () => {
    this.props.history.push(`/reset-password-user/${this.props.match.params.id}`)
  }

  redirectToList = () => {
    this.props.history.push('/users')
  }

  render() {
    let { profileImage, data } = this.state
    if (data.profile_image != null) profileImage = data.profile_image
    else profileImage = user
    return (
      <Container fluid className="user-dashboard-content">
        <Helmet>
          <title>{data.username}</title>
        </Helmet>
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
        </div>
        <div className="account-info">
          <Row>
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
            <Col xs="12" md="12" className="mt-3">
              <div className="btns-group text-left">
                <Button
                  color="primary"
                  onClick={this.redirectToEditPage}
                >
                  {I18nUtils.t('edit')}
                </Button>
                <Button onClick={this.redirectToResetPass} color="warning">
                  {I18nUtils.t('resetPassword')}
                </Button>
                <Button onClick={this.redirectToList} color="danger">
                  {I18nUtils.t('back')}
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    )
  }
}

UserDetailPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  profileRequest: PropTypes.func,
  data: PropTypes.object,
  findUserById: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing: state.users.processing,
    data: state.users.data
  }
}

const mapDispatchToProps = dispatch => ({
  findUserById: id => dispatch(UsersActions.findUserById(id))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UserDetailPage))
