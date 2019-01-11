/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Row, Col, Container } from 'reactstrap'
import I18nUtils from '../utils/I18nUtils'

import logoLW from '../images/logo-lw.png'
// import avatar from '../images/user.png'

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <footer>
        <Container>
          <Row>
            <Col className="col-logo col-footer">
              <img alt={I18nUtils.t('logo-lw')} src={logoLW} />
            </Col>
            <Col className="col-links col-footer" md="8">
              <ul>
                <li>
                  <Link to="/" title="採用情報">
                    採用情報
                  </Link>
                </li>
                <li>
                  <Link to="/" title="運営会社">
                    運営会社
                  </Link>
                </li>
                <li>
                  <Link to="/" title="長方形">
                    長方形
                  </Link>
                </li>
              </ul>
            </Col>
            <Col className="col-copy col-footer">&copy;2018 LanWay Inc.</Col>
          </Row>
        </Container>
      </footer>
    )
  }
}

Footer.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(Footer))
