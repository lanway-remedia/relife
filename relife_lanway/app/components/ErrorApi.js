/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { show } from 'redux-modal'
import { bindActionCreators } from 'redux'
import { ModalName } from '../constants'

let f

class ErrorApi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    f = this
  }

  render() {
    return (
      <div>
        {}
      </div>
    )
  }
}

ErrorApi.propTypes = {
  history: PropTypes.object
}

export function showError(message) {
  f.props.show(ModalName.COMMON, { message: message })
}

export default connect(
  null,
  dispatch => bindActionCreators({ show }, dispatch)
)(withRouter(ErrorApi))
