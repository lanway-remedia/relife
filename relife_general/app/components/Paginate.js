import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { DefaultValue } from '../constants'
class Paginate extends React.Component {
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

  onFirstPageGo = () => {
    this.props.history.push({
      search: `?page=1&limit=${this.state.limit}`
    })
    this.setState({
      page : 1
    })
    this.props.pageChanged()
  }

  onLastPageGo = () => {
    let pageCount = this.props.count == 0 ? 1 : Math.ceil(this.props.count / this.state.limit)
    this.props.history.push({
      search: `?page=${pageCount}&limit=${this.state.limit}`
    })
    this.setState({
      page : pageCount
    })
    this.props.pageChanged()
  }

  onNextPageGo = () => {
    let page = this.state.page
    this.props.history.push({
      search: `?page=${page + 1}&limit=${this.state.limit}`
    })
    this.setState({
      page: this.state.page + 1
    })
    this.props.pageChanged()
  }

  onPrevPageGo = () => {
    let page = this.state.page
    this.props.history.push({
      search: `?page=${page - 1}&limit=${this.state.limit}`
    })
    this.setState({
      page: this.state.page - 1
    })
    this.props.pageChanged()
  }

  render() {
    let {count} = this.props
    let {limit, page} = this.state
    let pagesCount = count == 0 ? 1 : Math.ceil(count / limit)
    return (
      <div className="pagination-custom clearfix">
        {
          page <= 2 ? (
            <span className="first">
              «
            </span>
          ) : (
            <span>
              <button className="first" onClick={this.onFirstPageGo}>«</button>
            </span>
          )
        }

        {
          page <= 1 ? (
            <span className="previous">
              ‹
            </span>
          ) : (
            <span>
              <button className="previous" onClick={this.onPrevPageGo}>‹</button>
            </span>
          )
        }

        <span className="pagination-count">
          {page} / {pagesCount}
        </span>

        {
          page >= pagesCount ? (
            <span className="next">
              ›
            </span>
          ) : (
            <span>
              <button className="next" onClick={this.onNextPageGo} >›</button>
            </span>
          )
        }
        {
          page >= pagesCount - 1 ? (
            <span className="last">
              »
            </span>
          ) : (
            <span>
              <button className="last" onClick={this.onLastPageGo}>»</button>
            </span>
          )
        }
        
      </div>
    )
  }
}

Paginate.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  count: PropTypes.number.isRequired,
  pageChanged: PropTypes.func
}

export default connect()(withRouter(Paginate))
