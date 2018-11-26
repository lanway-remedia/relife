/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class ManageTagListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="manage-tag-list">
        <div className="article-page">ManageTagListPage</div>
      </div>
    )
  }
}

ManageTagListPage.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(ManageTagListPage))
