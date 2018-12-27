import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import OutletStoreActions from '../../redux/wrapper/OutletStoresRedux'
import { DefaultValue } from '../../constants'
import I18nUtils from '../../utils/I18nUtils'
import SidebarFilterPC from '../../components/outletStores/SidebarFilterPC'
import SidebarFilterSP from '../../components/outletStores/SidebarFilterSP'
import Paginate from './../../components/Paginate'
class OutletStoresListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      storeList: [],
      count: 0,
      page: 0,
      limit: 0,
    }
    this.getStoreList = this.getStoreList.bind(this)
  }
  getStoreList = () => {
    let params = new URLSearchParams(this.props.history.location.search)
    let page = params.get('page') * 1 || DefaultValue.PAGE
    let limit = params.get('limit') * 1 || DefaultValue.LIMIT
    let data = {
      offset: (page - 1) * limit,
      limit: limit,
      page: page
    }
    this.setState({
      page: data.page,
      limit: data.limit
    })
    this.props.outletStoresListRequest(data)
  }
  componentDidMount() {
    this.getStoreList()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.isGetListStores) {
        this.setState({
          count: response.data.count,
          storeList: response.data.results,
        })
      }
    }
  }

  pageChanged = () => {
    this.getStoreList()
  }

  render() {
    let {storeList, count} = this.state
    return (
      <div>
        <SidebarFilterSP />
        <div className="lower-contents">
          <div className="lower-contents-inner clearfix">
            <section className="main">
              <h1 className="search-result page-title">{I18nUtils.t('list-example-house')}</h1>
              <div className="builder-list-img">
                {storeList.map((val, key) => {
                return (
                  <div className="builder-list-once-img" key={key}>
                    <div className="adv-builder-once-img">
                      <img src={val.img_large} />
                    </div>
                    <div className="adv-builder-once-title-wrap clearfix">
                      <div className="adv-builder-once-title-left">
                        <h2 className="adv-builder-once-title">
                          {val.title}
                          <span className="pr-icon">PR</span>
                        </h2>
                        <div className="adv-builder-once-area">
                        {val.district ? val.district.name : ''} {val.district.city ? val.district.city.name : '' }
                        </div>
                      </div>

                      <div className="adv-builder-once-title-right">
                        <div className="adv-builder-once-link">
                          <Link to={'/builder/'+ val.id}>詳細はこちら</Link>
                        </div>
                      </div>
                    </div>
                    {/* <div className="adv-builder-once-title-right sp">
                      <div className="adv-builder-once-link">
                        <Link to={'/builder/'+ val.id}>詳細はこちら</Link>
                      </div>
                    </div> */}

                    <div className="adv-builder-once-intro-title" />
                    <div className="adv-builder-once-intro" />
                  </div>
                  )
                })}
              </div>
              <Paginate count={count} pageChanged={() => this.pageChanged()} />
            </section>
            <SidebarFilterPC />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    processing: state.outletStores.processing,
    data: state.outletStores.data
  }
}

OutletStoresListPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  data: PropTypes.object,
  outletStoresListRequest: PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  outletStoresListRequest: data =>
    dispatch(OutletStoreActions.outletStoresListRequest(data)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OutletStoresListPage))
