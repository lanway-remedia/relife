import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import I18nUtils from './../utils/I18nUtils'
import { Label, Input } from 'reactstrap'
import UltimatePagination from 'react-ultimate-pagination-bootstrap-4'
import { DefaultValue } from '../constants'
import queryString from 'query-string'

class PaginationComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: DefaultValue.PAGE,
      limit: DefaultValue.LIMIT
    }
  }

  componentWillMount() {
    let parsed = queryString.parse(this.props.history.location.search)
    this.setState({
      page: parsed.page * 1 || DefaultValue.PAGE,
      limit: parsed.limit *1 || DefaultValue.LIMIT
    })
  }

  onPageChange = page => {
    let parsed = queryString.parse(this.props.history.location.search)
    parsed.page = page
    parsed.limit = this.state.limit
    let search = queryString.stringify(parsed)
    this.props.history.push({
      search: `?${search}`
    })
  }

  onPerpageChange = (e) => {
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
    let { count } = this.props
    let { page, limit } = this.state
    let pagesCount = count == 0 ? 1 : Math.ceil(count / limit)
    return (
      <div className="toolbar mb-5">
        <div className="total">
          <span>
            {limit > count &&
              I18nUtils.formatMessage(
                { id: 'toolbar-totalRecords' },
                { limit: count, total: count }
              )}
            {limit < count &&
              I18nUtils.formatMessage(
                { id: 'toolbar-totalRecords' },
                { limit: limit, total: count }
              )}
          </span>
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
          />
        )}
      </div>
    )
  }
}

PaginationComponent.propTypes = {
  history: PropTypes.object,
  count: PropTypes.number.isRequired
}

export default connect()(withRouter(PaginationComponent))
