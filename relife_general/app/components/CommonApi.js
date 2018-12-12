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
import ProfileActions from '../redux/wrapper/ProfileRedux'

let f

class CommonApi extends React.Component {
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

CommonApi.propTypes = {
  show: PropTypes.func
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show }, dispatch),
  profileRequest: data => dispatch(ProfileActions.profileRequest(data))
})

export function showError(message) {
  f.props.show(ModalName.COMMON, { message: message })
}

export default connect(
  null,
  mapDispatchToProps
)(withRouter(CommonApi))
