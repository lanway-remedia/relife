/**
 * @author Duong Nguyen
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Container } from 'reactstrap'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Container>
        <Helmet>
          <title>Homepage</title>
        </Helmet>
        <div className="home-page">home page</div>
      </Container>
    )
  }
}

HomePage.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(HomePage))
