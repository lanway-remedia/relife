/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'
import I18nUtils from '../../utils/I18nUtils'
import ProfileNav from '../../components/ProfileNav'

class ProfileBookingHistoryPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  }

  componentDidMount() {
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return (
      <Container className="profile-info">
        <Row>
          <Col xs="12" md="4">
            <ProfileNav />
          </Col>
          <Col xs="12" md="8">
            <div className="profile-info-detail">
              <h3>{I18nUtils.t('booking-history')}</h3>
              <hr />
              <h3>{'工事中'}</h3>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

ProfileBookingHistoryPage.propTypes = {
  history: PropTypes.object,
  data: PropTypes.object,
  show: PropTypes.func,
  hide: PropTypes.func
}

const mapStateToProps = state => {
  return {
    data: state.profile.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfileBookingHistoryPage))
