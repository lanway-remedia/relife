/**
 * @author Duong Nguyen
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    return (
      <div className="app">
        <div className="home-page">
          home page
        </div>
      </div>
    )
  }
}

HomePage.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(HomePage))
