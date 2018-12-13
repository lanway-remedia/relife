/**
 * @author HaPV
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class TestPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="test-page">
        <h1>23213122131</h1>
      </div>
    )
  }
}

TestPage.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(TestPage))
