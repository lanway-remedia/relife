import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import I18nUtils from './../utils/I18nUtils'
import { Label, Input } from 'reactstrap'
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4'
import { DefaultValue } from '../constants'

class PaginationComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: DefaultValue.PAGE,
      limit: DefaultValue.LIMIT
    }
  }

  componentWillMount() {
    let params = new URLSearchParams(this.props.history.location.search)
    let page = params.get('page') * 1 || DefaultValue.PAGE
    let limit = params.get('limit') * 1 || DefaultValue.LIMIT
    this.setState({
      page: page,
      limit: limit
    })
  }

  onPageChange = page => {
    this.props.history.push({
      search: `?page=${page}&limit=${this.state.limit}`
    })
  }

  onPerpageChange = e => {
    let { page } = this.state
    let { count } = this.props
    let limit = e.target.value
    if ((page - 1) * limit >= count) {
      page = Math.ceil(count / limit)
    }
    this.props.history.push({
      search: `?page=${page}&limit=${limit}`
    })
  }

  render() {
    let { count, location } = this.props
    let { page, limit } = this.state
    let pagesCount = count == 0 ? 1 : Math.ceil(count / limit)

    let isSearch
    if (
      location.search === '' ||
      location.search === '?' ||
      location.search === `?page=${page}&limit=${limit}`
    )
      isSearch = false
    else isSearch = true

    return (
      <div className="toolbar">
        <div className="total">
          {isSearch && (
            <span
              dangerouslySetInnerHTML={{
                __html: I18nUtils.formatMessage(
                  { id: 'toolbar-search' },
                  { total: count }
                )
              }}
            />
          )}
          {!isSearch && (
            <span
              dangerouslySetInnerHTML={{
                __html: I18nUtils.formatMessage(
                  { id: 'toolbar-totalRecords' },
                  { limit: limit, total: count }
                )
              }}
            />
          )}
        </div>
        <div className="limiter">
          <Label for="limit">{I18nUtils.t('toolbar-limit')}</Label>
          <Input
            type="select"
            name="limit"
            id="limit"
            value={limit}
            onChange={this.onPerpageChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Input>
        </div>
        {count > 0 && (
          <UltimatePagination
            currentPage={page}
            totalPages={pagesCount}
            onChange={this.onPageChange}
            hideFirstAndLastPageLinks
          />
        )}
      </div>
    )
  }
}

PaginationComponent.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  count: PropTypes.number.isRequired
}

export default connect()(withRouter(PaginationComponent))
