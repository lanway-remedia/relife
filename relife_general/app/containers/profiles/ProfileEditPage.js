/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ProfileActions from '../../redux/wrapper/ProfileRedux'
import ProfileImage from '../../components/ProfileImage'
import { ValidationForm, TextInput } from 'react-bootstrap4-form-validation'
import { Container, Row, Col, Button, FormGroup, Label } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'
import I18nUtils from '../../utils/I18nUtils'
import { ModalName } from '../../constants'
import avatarDefault from '../../images/user.png'
import Sidebar from '../../components/Sidebar'
class ProfileEditPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profileImage: null,
      data: [],
      id: '',
      group: '',
      fname: '',
      lname: '',
      email: '',
      phone: '',
      address: ''
    }
  }

  componentDidMount() {
    document.title = `${I18nUtils.t('ud-page-title')}`
    if (!this.props.data.getProfile) {
      let data = {}
      this.props.profileRequest(data)
    } else {
      this.setProfile(this.props.data)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      //update profile or update profile image
      if (nextProps.data.editProfile || nextProps.data.editProfileImage) {
        if (nextProps.data.messageCode)
        this.props.show(ModalName.COMMON, { message: I18nUtils.t(nextProps.data.messageCode), closeFunction: () => this.closeFunction() })
      }
      //get profile info
      if (nextProps.data.getProfile) {
        this.setProfile(nextProps.data)
      }
    }
  }

  setProfile = (data) => {
    this.setState({
      data: data.data,
      id: data.data.id,
      group: data.data.group,
      profileImage: data.data.profile_image,
      fname:
        data.data.first_name === null
          ? ''
          : data.data.first_name,
      lname:
        data.data.last_name === null
          ? ''
          : data.data.last_name,
      email:
        data.data.email === null ? '' : data.data.email,
      address:
        data.data.address === null
          ? ''
          : data.data.address,
      phone: data.data.tel === null ? '' : data.data.tel
    })
  }

  closeFunction = () => {
    this.props.history.push(`/profile-edit`)
    this.props.hide(ModalName.COMMON)
  }

  handleProfileChange = image => {
    this.setState({
      profileImage: image
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    let data = {
      id: this.state.id,
      group: this.state.group,
      first_name: this.state.fname,
      last_name: this.state.lname,
      email: this.state.email,
      tel: this.state.phone,
      address: this.state.address
    }

    if (this.state.profileImage != null && typeof this.state.profileImage != 'string') {
      let formData = new FormData()
      formData.append('file', this.state.profileImage)
      this.props.editProfileAvatarRequest(formData)
    }

    this.props.editProfileRequest(data)
  }

  redirectToProfile = () => {
    this.props.history.push('/profile')
  }

  render() {
    let { profileImage, data } = this.state
    if (data.profile_image != null) profileImage = data.profile_image
    else profileImage = avatarDefault
    return (
      <Container className="user-dashboard-content">
        <Row>
          <Col xs="6" md="3">
            <Sidebar profileImage={profileImage} username={data.username} />
          </Col>
          <Col xs="6" md="9">
            <ValidationForm className="form-user-info" onSubmit={this.handleSubmit}>
              <Row>
                <Col xs="12" md="12">
                  <ProfileImage
                    defaultAvatar
                    profileImage={profileImage}
                    size={90}
                    onProfileChange={image => this.handleProfileChange(image)}
                  />
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="fname">{I18nUtils.t('fname')}</Label>
                    <TextInput
                      type="text"
                      name="fname"
                      id="fname"
                      placeholder={I18nUtils.t('all-place-fname')}
                      value={this.state.fname}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="fname">{I18nUtils.t('lname')}</Label>
                    <TextInput
                      type="text"
                      name="lname"
                      id="lname"
                      placeholder={I18nUtils.t('all-place-lname')}
                      value={this.state.lname}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="email">{I18nUtils.t('email')}</Label>
                    <TextInput
                      type="text"
                      name="email"
                      id="email"
                      placeholder={I18nUtils.t('all-place-email')}
                      value={this.state.email}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="6">
                  <FormGroup>
                    <Label for="phone">{I18nUtils.t('phone')}</Label>
                    <TextInput
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder={I18nUtils.t('all-place-phone')}
                      value={this.state.phone}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>

                <Col xs="12" md="12">
                  <FormGroup>
                    <Label for="address">{I18nUtils.t('address')}</Label>
                    <TextInput
                      type="text"
                      name="address"
                      id="address"
                      placeholder={I18nUtils.t('all-place-address')}
                      value={this.state.address}
                      onChange={this.handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col xs="12" md="12">
                  <div className="btns-group text-left">
                    <Button color="success">{I18nUtils.t('edit')}</Button>
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

ProfileEditPage.propTypes = {
  history: PropTypes.object,
  profileRequest: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func,
  editProfileRequest: PropTypes.func,
  editProfileAvatarRequest: PropTypes.func,
  data: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.profile.processing,
    data: state.profile.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  profileRequest: data => dispatch(ProfileActions.profileRequest(data)),
  editProfileRequest: data => dispatch(ProfileActions.editProfileRequest(data)),
  editProfileAvatarRequest: formData =>
    dispatch(ProfileActions.editProfileAvatarRequest(formData))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileEditPage))
