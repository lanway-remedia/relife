/**
 * @author HaPV
 * NAV component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          Re:Style
        </Link>
        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/article">
                Article
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

Navbar.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(Navbar))
