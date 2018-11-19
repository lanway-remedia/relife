/**
 * @author HaPV
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container } from 'reactstrap'
// import { Helmet } from 'react-helmet'
// import I18nUtils from '../utils/I18nUtils'

class ManageOutletStoreList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Container fluid className="manage-outletstore-list">
        test
      </Container>
    )
  }
}

ManageOutletStoreList.propTypes = {
  history: PropTypes.object
}

export default connect()(withRouter(ManageOutletStoreList))
