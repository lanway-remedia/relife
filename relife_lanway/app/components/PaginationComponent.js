import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import I18nUtils from './../utils/I18nUtils'
import _ from 'lodash'
import {
  Pagination,
  PaginationItem,
  PaginationLink,
  Label,
  Input
} from 'reactstrap'

class PaginationComponent extends Component {
  render() {
    const { itemsCount, pageSize, currentPage } = this.props

    const pagesCount = Math.ceil(itemsCount / pageSize)
    // if (pagesCount === 1) return null
    const pages = _.range(1, pagesCount + 1)
    let itemSize
    if (pageSize > itemsCount) {
      itemSize = itemsCount
    } else {
      itemSize = pageSize
    }

    return (
      <div className="toolbar mb-5">
        <div className="total">
          {I18nUtils.formatMessage(
            { id: 'toolbar-totalRecords' },
            { limit: itemSize, total: itemsCount }
          )}
        </div>
        <div className="limiter">
          <Label for="selectLimit">{I18nUtils.t('toolbar-limit')}</Label>
          <Input type="select" name="selectLimit" id="selectLimit">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </Input>
        </div>
        <Pagination className="pagination" aria-label="Page navigation">
          {pages.map(page => (
            <PaginationItem
              key={page}
              className={
                page === currentPage ? 'page-item active' : 'page-item'
              }
            >
              <PaginationLink className="page-link" href="#">
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}
        </Pagination>
      </div>
    )
  }
}

PaginationComponent.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default connect()(withRouter(PaginationComponent))
