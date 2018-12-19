/**
 * @author HaPV
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'

class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <footer>
        <Container>It's Footer</Container>
      </footer>
    )
  }
}

Footer.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(Footer))
