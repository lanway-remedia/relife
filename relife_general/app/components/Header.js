/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Button } from 'reactstrap'
// import defaultAvatar from '../images/user.png'
import I18nUtils from '../utils/I18nUtils'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  goLoginPage = () => {
    this.props.history.push('/login')
  }

  render() {
    return (
      <header>
        <Row noGutters>
          <Col xs="12" sm="9" />
          <Col xs="12" sm="3">
            <Button color="link" onClick={() => this.goLoginPage()}>
              {I18nUtils.t('login')}
            </Button>{' '}
          </Col>
        </Row>
      </header>
    )
  }
}

Header.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(Header))
