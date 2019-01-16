/**
 * @author HaPV
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ProfileActions from '../../redux/wrapper/ProfileRedux'
import { Container, Row, Col, Button } from 'reactstrap'
import CustomFormGroup from '../../components/CustomFormGroup'
import ProfileNav from '../../components/ProfileNav'
import I18nUtils from '../../utils/I18nUtils'
import { show, hide } from 'redux-modal'
import { ModalName } from '../../constants'
import { bindActionCreators } from 'redux'

class ProfileInfoPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      tel: '',
      address: ''
    }
  }

  componentDidMount() {
    this.props.profileRequest({})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      if (nextProps.data.getProfile) {
        let profile = nextProps.data.data
        this.setState({
          first_name: profile.first_name,
          last_name: profile.last_name,
          email: profile.email,
          tel: profile.tel,
          address: profile.address
        })
      }
      if (nextProps.data.editProfile) {
        if (nextProps.data.messageCode)
        this.props.show(ModalName.COMMON, { message: I18nUtils.t(nextProps.data.messageCode) })
      }
    }
  }

  fieldChanged = (field, value) => {
    this.setState({
      [field]: value
    })
  }

  updateProfile = () => {
    this.props.editProfileRequest(this.state)
  }

  render() {
    let { last_name, first_name, email, tel, address } = this.state
    return (
      <Container className="profile-info">
        <Row>
          <Col xs="12" md="4">
            <ProfileNav />
          </Col>
          <Col xs="12" md="8">
            <div className="profile-info-detail">
              <h3>{I18nUtils.t('profile-info')}</h3>
              <hr />
              <CustomFormGroup
                value={last_name}
                fieldName="lastName"
                fieldText={I18nUtils.t('last-name')}
                onBlurField={value => this.fieldChanged('last_name', value)}
              />
              <CustomFormGroup
                value={first_name}
                fieldName="firstName"
                fieldText={I18nUtils.t('first-name')}
                onBlurField={value => this.fieldChanged('first_name', value)}
              />
              <CustomFormGroup
                value={email}
                fieldName="email"
                fieldText={I18nUtils.t('email')}
                tyle="email"
                onBlurField={value => this.fieldChanged('email', value)}
              />
              <CustomFormGroup
                value={tel}
                fieldName="phone"
                fieldText={I18nUtils.t('phone')}
                onBlurField={value => this.fieldChanged('tel', value)}
              />
              <CustomFormGroup
                value={address}
                fieldName="address"
                fieldText={I18nUtils.t('address')}
                onBlurField={value => this.fieldChanged('address', value)}
              />
              <hr />
              <div className="profile-btn">
                <Button color="default" onClick={() => this.updateProfile()}>{I18nUtils.t('save').toUpperCase()}</Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

ProfileInfoPage.propTypes = {
  history: PropTypes.object,
  data: PropTypes.object,
  profileRequest: PropTypes.func,
  editProfileRequest: PropTypes.func,
  show: PropTypes.func
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
  editProfileRequest: data => dispatch(ProfileActions.editProfileRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileInfoPage))
