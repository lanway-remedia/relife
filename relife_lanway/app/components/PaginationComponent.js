import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import I18nUtils from './../utils/I18nUtils'
import {
  Label,
  Input
} from 'reactstrap'
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4'

class PaginationComponent extends Component {
  render() {
    const { itemsCount, pageSize, currentPage } = this.props

    const pagesCount = Math.ceil(itemsCount / pageSize)

    return (
      <div className="toolbar mb-5">
        {/* <div className="total">
          {I18nUtils.formatMessage(
            { id: 'toolbar-totalRecords' },
            { limit: itemSize, total: itemsCount }
          )}
        </div> */}
        <div className="limiter">
          <Label for="selectLimit">{I18nUtils.t('toolbar-limit')}</Label>
          <Input type="select" name="selectLimit" id="selectLimit">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Input>
        </div>
        <UltimatePagination
          currentPage={currentPage}
          totalPages={pagesCount}
          //onChange={onPageChange}
        />
      </div>
    )
  }
}

PaginationComponent.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func
}

export default connect()(withRouter(PaginationComponent))
