/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class EditTagPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="app">
        <div className="article-page">EditTagPage</div>
      </div>
    )
  }
}

EditTagPage.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(EditTagPage))
