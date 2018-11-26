/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class AddNewTagPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="app">
        <div className="article-page">AddNewTagPage</div>
      </div>
    )
  }
}

AddNewTagPage.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(AddNewTagPage))
