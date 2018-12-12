/**
 * @author Nam NH
 * Header component
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { } from 'reactstrap'
// import I18nUtils from '../utils/I18nUtils'

class Navigation extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

  goLoginPage = () => {
    this.props.history.push('/login')
  }

  render() {
    return (
      <div style={{backgroundColor: 'brown', height: '100%', width: '100%'}} />
    )
  }
}

Navigation.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(Navigation))
