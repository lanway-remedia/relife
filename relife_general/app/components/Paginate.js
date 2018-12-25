import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

class Paginate extends React.Component {
  render() {
    return (
      <div className="pagination clearfix">
        <span className="first">«
        </span>
        <span className="previous">‹</span>
        <span className="pagination-count">
          1/2
        </span>

        <span>
          <Link className="next" to="">›</Link>
        </span>

        <span>
          <Link className="last" to="">»</Link>
        </span>
      </div>
    )
  }
}

export default connect()(withRouter(Paginate))
