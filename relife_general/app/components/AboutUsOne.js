/**
 * @author Hanh TD
 * Header component
 */

import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Row, Col } from 'reactstrap'
import PropTypes from 'prop-types'
class AboutUsOne extends React.Component {
  render() {
    const {title, content, imgSrc} = this.props
    return (
      <Col md="6" xs="12" className="about-us-once clearfix">
        <Row>
          <Col md="5" xs="4" className="about-us-once-img">
            <img src={imgSrc} />
          </Col>
          <Col md="7" xs="8" className="padding-0">
            <div className="about-us-once-right">
              <h2 className="about-us-once-title">
                {title}
              </h2>
              <p className="about-us-once-text">
                {content}
              </p>
            </div>
          </Col>
        </Row>
      </Col>
    )
  }
}

AboutUsOne.propTypes = {
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
}
export default connect()(withRouter(AboutUsOne))
