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
// import user from '../../images/user.png'

class ProfileInfoPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {
        firstName: 'ngo',
        lastName: 'nam',
        email: '',
        phone: '',
        address: ''
      },
      value: ''
    }
  }

  componentDidMount() {
    //this.props.profileRequest({})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      if (nextProps.data.getProfile) {
        this.setState({
          data: nextProps.data.data
        })
      }
    }
  }

  fieldChanged = value => {
    this.setState({
      value
    })
  }

  render() {
    let { profile } = this.state
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
                value={profile.lastName}
                fieldName="lastName"
                fieldText={I18nUtils.t('last-name')}
                onBlurField={value => this.fieldChanged(value)}
              />
              <CustomFormGroup
                value={profile.firstName}
                fieldName="firstName"
                fieldText={I18nUtils.t('first-name')}
                onBlurField={value => this.fieldChanged(value)}
              />
              <CustomFormGroup
                value={profile.email}
                fieldName="email"
                fieldText={I18nUtils.t('email')}
                tyle="email"
                onBlurField={value => this.fieldChanged(value)}
              />
              <CustomFormGroup
                value={profile.phone}
                fieldName="phone"
                fieldText={I18nUtils.t('phone')}
                onBlurField={value => this.fieldChanged(value)}
              />
              <CustomFormGroup
                value={profile.address}
                fieldName="address"
                fieldText={I18nUtils.t('address')}
                onBlurField={value => this.fieldChanged(value)}
              />
              <hr />
              <div className="profile-btn">
                <Button color="default">{I18nUtils.t('save').toUpperCase()}</Button>
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
  profileRequest: PropTypes.func,
  data: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing: state.profile.processing,
    data: state.profile.data
  }
}

const mapDispatchToProps = dispatch => ({
  profileRequest: data => dispatch(ProfileActions.profileRequest(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileInfoPage))
