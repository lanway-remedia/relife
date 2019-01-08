import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import OutletStoreActions from '../../redux/wrapper/OutletStoresRedux'
import { DefaultValue } from '../../constants'
import I18nUtils from '../../utils/I18nUtils'
import SidebarFilterPC from '../../components/outletStores/SidebarFilterPC'
import SidebarFilterSP from '../../components/outletStores/SidebarFilterSP'
import Paginate from './../../components/Paginate'
import LocationActions from '../../redux/wrapper/LocationsRedux'
class OutletStoresListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locationList: [],
      storeList: [],
      count: 0,
      page: 0,
      limit: 0,
    }
    this.getStoreList = this.getStoreList.bind(this)
  }

  getLocationList = () => {
    let data = {
      limit: '',
      offset: '',
      type: 2
    }
    this.props.locationListRequest(data)
  }

  getStoreList = () => {
    let params = new URLSearchParams(this.props.history.location.search)
    let page = params.get('page') * 1 || DefaultValue.PAGE
    let limit = params.get('limit') * 1 || DefaultValue.LIMIT
    let city = params.get('city')
    let keyword = params.get('keyword')
    let type = params.get('type__in')
    let business = params.get('business__business__in')
    let min_price = params.get('min_price__gte')
    let max_price = params.get('max_price__lte')
    let data = {
      offset: (page - 1) * limit,
      limit: limit,
      page: page,
      ...(city && { city: city}),
      ...(keyword && { keyword: keyword}),
      ...(type && { type__in: type}),
      ...(business && { business__business__in: business}),
      ...(min_price && { min_price__gte: min_price}),
      ...(max_price && { max_price__lte: max_price})
    }
    this.setState({
      page: data.page,
      limit: data.limit
    })
    this.props.outletStoresListRequest(data)
  }
  componentDidMount() {
    this.getLocationList()
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

    if (this.props.dataLocation != nextProps.dataLocation) {
      let response = nextProps.dataLocation
      if (response.isGetListLocation == true) {
        let data = response.data
        this.setState({
          locationList: data
        })
      }
    }
  }

  pageChanged = () => {
    this.getStoreList()
  }

  onPageLoad = () => {
    this.getStoreList()
  }

  render() {
    let {storeList, locationList, count, page} = this.state
    return (
      <div>
        <SidebarFilterSP locationList={locationList} onPageLoad={this.onPageLoad} />
        <Container fluid className="lower-contents">
          <Row className="lower-contents-inner clearfix">
            <Col md="3">
              <SidebarFilterPC locationList={locationList} onPageLoad={this.onPageLoad} />
            </Col>
            <Col xs="12" md="9" className="padding-0">
              <section className="main">
                <h1 className="search-result page-title">{I18nUtils.t('list-example-house')}</h1>
                {count > 0 ? (
                  <div>
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
                                {val.address}
                              </div>
                            </div>

                            <div className="adv-builder-once-title-right">
                              <div className="adv-builder-once-link">
                                <Link to={'/builder/'+ val.id}>{I18nUtils.t('view-detail')}</Link>
                              </div>
                            </div>
                          </div>

                          <div className="adv-builder-once-intro-title">
                            {val.slogan_title}
                          </div>
                          <div className="adv-builder-once-intro">
                            {val.slogan_content}
                          </div>
                        </div>
                        )
                      })}
                    </div>
                    <Paginate count={count} pageChanged={() => this.pageChanged()} currentPage={page} />
                  </div>
                ) : (
                  <p className="search-page-sorry">
                    {I18nUtils.t('search-no-record')}
                  </p>
                )}
              </section>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    processing: state.outletStores.processing,
    data: state.outletStores.data,
    dataLocation: state.locations.data
  }
}

OutletStoresListPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  data: PropTypes.object,
  dataLocation: PropTypes.object,
  outletStoresListRequest: PropTypes.func,
  locationListRequest : PropTypes.func,
}

const mapDispatchToProps = dispatch => ({
  outletStoresListRequest: data =>
    dispatch(OutletStoreActions.outletStoresListRequest(data)),
  locationListRequest: dataLocation =>
    dispatch(LocationActions.locationListRequest(dataLocation)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OutletStoresListPage))
