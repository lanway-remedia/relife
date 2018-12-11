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
import { ModalName, StorageKeyConstants } from '../constants'
import ProfileActions from '../redux/wrapper/UserProfileRedux'

let f

class CommonApi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillMount() {
    f = this
    if (localStorage.getItem(StorageKeyConstants.TOKEN))
      this.props.profileRequest({})
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      this.props.getProfile(nextProps.data)
    }
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
  history: PropTypes.object,
  profileRequest: PropTypes.func,
  data: PropTypes.object,
  getProfile: PropTypes.func
}

const mapStateToProps = state => {
  return {
    data: state.userProfile.data
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show }, dispatch),
  profileRequest: data => dispatch(ProfileActions.profileRequest(data))
})

export function showError(message) {
  f.props.show(ModalName.COMMON, { message: message })
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CommonApi))
