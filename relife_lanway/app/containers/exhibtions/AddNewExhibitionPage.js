/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class EditExhibitionPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <div className="app">
        <div className="home-page">AddNewExhibitionPage</div>
      </div>
    )
  }
}

EditExhibitionPage.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(EditExhibitionPage))
