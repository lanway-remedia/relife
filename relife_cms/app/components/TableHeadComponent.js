import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import I18nUtils from '../utils/I18nUtils'

class TableHeadComponent extends Component {
  render() {
    const props = this.props
    return (
      <thead>
        <tr>
          {props.theadTitle.split(',').map((title, key) => (
            <th key={key}>{I18nUtils.t(title.toLowerCase())}</th>
          ))}
        </tr>
      </thead>
    )
  }
}

TableHeadComponent.propTypes = {
  theadTitle: PropTypes.string,
  sortColumn: PropTypes.object,
  onSort: PropTypes.func
}

export default connect()(withRouter(TableHeadComponent))
