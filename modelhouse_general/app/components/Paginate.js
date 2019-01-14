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
    let params = new URLSearchParams(this.props.history.location.search)
    params.set('page', 1)
    params.set('limit', this.state.limit)

    this.props.history.push({
      search: `?${params.toString()}`
    })
    this.setState({
      page : 1
    })
    this.props.pageChanged()
  }

  onLastPageGo = () => {
    let pageCount = this.props.count == 0 ? 1 : Math.ceil(this.props.count / this.state.limit)
    let params = new URLSearchParams(this.props.history.location.search)
    params.set('page', pageCount)
    params.set('limit', this.state.limit)

    this.props.history.push({
      search: `?${params.toString()}`
    })
    this.setState({
      page : pageCount
    })
    this.props.pageChanged()
  }

  onNextPageGo = () => {
    let page = this.state.page
    let params = new URLSearchParams(this.props.history.location.search)
    params.set('page', page + 1)
    params.set('limit', this.state.limit)
    this.props.history.push({
      search: `?${params.toString()}`
    })
    this.setState({
      page: this.state.page + 1
    })
    this.props.pageChanged()
  }

  onPrevPageGo = () => {
    let page = this.state.page
    let params = new URLSearchParams(this.props.history.location.search)
    params.set('page', page - 1)
    params.set('limit', this.state.limit)
    this.props.history.push({
      search: `?${params.toString()}`
    })
    this.setState({
      page: this.state.page - 1
    })
    this.props.pageChanged()
  }

  render() {
    let {count, currentPage} = this.props
    let {limit} = this.state
    let pagesCount = count == 0 ? 1 : Math.ceil(count / limit)
    return (
      <div className="pagination-custom clearfix">
        {
          currentPage <= 2 ? (
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
          currentPage <= 1 ? (
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
          {currentPage} / {pagesCount}
        </span>

        {
          currentPage >= pagesCount ? (
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
          currentPage >= pagesCount - 1 ? (
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
  pageChanged: PropTypes.func,
  currentPage: PropTypes.number
}

export default connect()(withRouter(Paginate))
