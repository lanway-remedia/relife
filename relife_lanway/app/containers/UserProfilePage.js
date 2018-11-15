/**
 * @author HaPV
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ProfileActions from '../redux/wrapper/UserProfileRedux'
import ProfileImage from '../components/ProfileImage'
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import I18nUtils from '../utils/I18nUtils'

import avatarUser from '../images/admin.jpeg'

class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImage: null
    }
  }

  componentDidMount() {
    document.title = `${I18nUtils.t('ud-page-title')}`
    let data = {}
    this.props.profileRequest(data)
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.data)
  }

  handleProfileChange = image => {
    this.setState({
      profileImage: image
    })
  }

  render() {
    let { profileImage } = this.state
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
            <img
              src={avatarUser}
              alt="@name"
              title={I18nUtils.t('ud-change-avatar')}
            />
          </div>
          <div className="info">
            <p>{I18nUtils.formatMessage({ id: 'ud-hi' }, { name: '@name' })}</p>
            <p>{I18nUtils.t('ud-welcome')}</p>
          </div>
        </div>
        <Form className="form-user-info">
          <Row>
            <Col xs="12" md="6">
              <div className="content">
                <h3>{I18nUtils.t('ud-info')}</h3>
                <ProfileImage
                  profileImage={profileImage}
                  size={120}
                  onProfileChange={image => this.handleProfileChange(image)}
                />
                <div>
                  <FormGroup>
                    <Label for="userFullname">{I18nUtils.t('name')}</Label>
                    <Input
                      type="text"
                      name="userFullname"
                      id="userFullname"
                      placeholder={I18nUtils.t('all-place-name')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="userEmail">{I18nUtils.t('email')}</Label>
                    <Input
                      type="email"
                      name="email"
                      id="userEmail"
                      placeholder={I18nUtils.t('all-place-email')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="userAddress">{I18nUtils.t('address')}</Label>
                    <Input
                      type="text"
                      name="address"
                      id="userAddress"
                      placeholder={I18nUtils.t('all-place-address')}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="userAddress">{I18nUtils.t('phone')}</Label>
                    <Input
                      type="text"
                      name="phone"
                      id="userPhone"
                      placeholder={I18nUtils.t('all-place-phone')}
                    />
                  </FormGroup>
                </div>
              </div>
            </Col>
            <Col xs="12" md="6">
              <div className="content">
                <h3>{I18nUtils.t('ud-change')}</h3>
                <FormGroup>
                  <Label for="currenPassword">
                    {I18nUtils.t('currentPassword')}
                  </Label>
                  <Input
                    type="password"
                    name="currenPassword"
                    id="currenPassword"
                    placeholder={I18nUtils.t('all-place-currentPassword')}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="newPassword">{I18nUtils.t('newPassword')}</Label>
                  <Input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    placeholder={I18nUtils.t('all-place-newPassword')}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="confirmNewPassword">
                    {I18nUtils.t('confirmPassword')}
                  </Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder={I18nUtils.t('all-place-confirmPassword')}
                  />
                </FormGroup>
              </div>
            </Col>
            <Col xs="12" md="12">
              <div className="btns-group text-center">
                <Button color="success">{I18nUtils.t('update')}</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Container>
    )
  }
}

UserProfile.propTypes = {
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
)(withRouter(UserProfile))
