import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

class TableHeadComponent extends Component {
  raiseSort = path => {
    const sortColumn = { ...this.props.sortColumn }
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === 'asc' ? 'desc' : 'asc'
    else {
      sortColumn.path = path
      sortColumn.order = 'asc'
    }
    this.props.onSort(sortColumn)
  }

  renderSortIcon = column => {
    const { sortColumn } = this.props
    if (column.path !== sortColumn.path) return null
    if (sortColumn.order === 'asc')
      return <i className="fa fa-sort-asc" aria-hidden="true" />
    return <i className="fa fa-sort-desc" aria-hidden="true" />
  }

  render() {
    const props = this.props
    return (
      <thead>
        <tr>
          {props.theadTitle.split(',').map((title, key) => (
            <th key={key}>{title}</th>
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
