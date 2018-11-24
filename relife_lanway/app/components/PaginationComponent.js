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
    let page = params.get('page') ? params.get('page') : DefaultValue.PAGE
    let limit = params.get('limit') ? params.get('limit') : DefaultValue.LIMIT
    this.setState({
      page: page*1,
      limit: limit
    })
  }

  onPageChange = (page) => {
    this.props.history.push({
      search: `?page=${page}&limit=${this.state.limit}`
    })
  }

  onPerpageChange = (e) => {
    this.props.history.push({
      search: `?page=${this.state.page}&limit=${e.target.value}`
    })
  }

  render() {
    let { count } = this.props
    let { page, limit } = this.state
    let pagesCount = count == 0 ? 1 : Math.ceil(count / limit)
    return (
      <div className="toolbar mb-5">
        <div className="limiter">
          <Label for="selectLimit">{I18nUtils.t('toolbar-limit')}</Label>
          <Input type="select" name="selectLimit" id="selectLimit" value={limit} onChange={this.onPerpageChange}>
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </Input>
        </div>
        {
          count > 0 &&
          <UltimatePagination
            currentPage={page}
            totalPages={pagesCount}
            onChange={this.onPageChange}
          />
        }
      </div>
    )
  }
}

PaginationComponent.propTypes = {
  history: PropTypes.object,
  count: PropTypes.number.isRequired
}

export default connect()(withRouter(PaginationComponent))
