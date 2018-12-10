/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <header>
        <Container>It's Header</Container>
      </header>
    )
  }
}

Header.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(Header))
