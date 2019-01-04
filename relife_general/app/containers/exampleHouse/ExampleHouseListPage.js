import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap'
import I18nUtils from '../../utils/I18nUtils'
import AttributesSearchPC from '../../components/exampleHouse/AttributesSearchPC'
import AttributesSearchSP from '../../components/exampleHouse/AttributesSearchSP'
import ExampleHousesActions from '../../redux/wrapper/ExampleHousesRedux'
import OutletStoresActions from '../../redux/wrapper/OutletStoresRedux'
import { bindActionCreators } from 'redux'
import { show, hide } from 'redux-modal'
import { DefaultValue } from '../../constants'

import Paginate from './../../components/Paginate'
class ExampleHouseListPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
      limit: 0,
      page: 0,
      exampleHouseList : [],
      outletStoreList: [],
      exampleHouseNew: [],
    }
  }

  getListExampleHouse = () => {
    let params = new URLSearchParams(this.props.history.location.search)
    let page = params.get('page') * 1 || DefaultValue.PAGE
    let limit = params.get('limit') * 1 || DefaultValue.LIMIT
    let floor = params.get('floor__in')
    let price_range = params.get('price_range__in')
    let construction = params.get('contruction__in')
    let style = params.get('styles__style__in')
    let houseSize = params.get('household_size__in')
    let houseIncome = params.get('household_income__in')
    let data = {
      offset: (page - 1) * limit,
      limit: limit,
      page: page,
      ...(price_range && { price_range__in: price_range }),
      ...(floor && { floor__in: floor }),
      ...(construction && { contruction__in: construction }),
      ...(style && { styles__style__in: style }),
      ...(houseSize && { household_size__in: houseSize }),
      ...(houseIncome && { household_income__in: houseIncome }),
    }

    this.setState({
      page: data.page,
      limit: data.limit
    })
    this.props.exampleHousesListRequest(data)
  }

  componentDidMount() {
    document.body.classList.add('example-house-list')
    this.getListExampleHouse()
  }

  componentWillUnmount() {
    document.body.classList.remove('example-house-list')
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.isGetList) {
        if (response.data.count > 0) {
          let exampleHouseNewId = response.data.results[0].id
          this.props.exampleHousesGetRequest(exampleHouseNewId)
        }

        this.setState({
          exampleHouseList: response.data.results,
          count: response.data.count
        })
      }
    }

    if (this.props.dataHouseNew != nextProps.dataHouseNew) {
      let response = nextProps.dataHouseNew
      if (response.isGetHouse) {
        this.setState({
          exampleHouseNew: response.data
        })
      }
    }
  }

  pageChanged = () => {
    this.getListExampleHouse()
  }

  onPageLoad = () => {
    this.getListExampleHouse()
  }

  render() {
    let {exampleHouseList, exampleHouseNew, count, page} = this.state
    return (
      <div>
        <AttributesSearchSP onPageLoad={() => this.onPageLoad()} />
        <Container fluid className="lower-contents">
          <Row className="lower-contents-inner clearfix">
            <Col md="3">
              <AttributesSearchPC onPageLoad={() => this.onPageLoad()} />
            </Col>
            <Col xs="12" md="9" style={{padding: `0`}}>
              <section className="main">
                <h1 className="search-result page-title">{I18nUtils.t('list-example-house')}</h1>
                {count > 0 && (
                  <div className="adv-example">
                    <div className="adv-example-once">
                      <div className="adv-example-one-img">
                        <img src={exampleHouseNew.img_large} alt="exh01" />
                      </div>

                      <div className="adv-example-once-title-wrap clearfix">
                        <div className="adv-example-once-title-left">
                          <h2 className="adv-example-once-title">{exampleHouseNew.title}
                            <span className="pr-icon">PR</span>
                          </h2>
                        </div>

                        <div className="adv-example-once-title-right">
                          <div className="adv-example-once-link">
                            <Link to={'/example/' + exampleHouseNew.id}>{I18nUtils.t('view-detail')}</Link>
                          </div>
                        </div>
                      </div>
                      <div className="adv-example-once-text">シンプルだけど存在感の大きさを感じる絶妙なデザイン</div>
                      <div className="adv-example-once-company-area">{exampleHouseNew.store ? exampleHouseNew.store.district.name + ' ' + exampleHouseNew.store.district.city.name : ''}</div>
                      <div className="adv-example-once-company">{exampleHouseNew.store ? exampleHouseNew.store.title : ''}</div>
                    </div>
                  </div>
                )}

                {count > 0 ? (
                  <div>
                    <Row className="example-list clearfix">
                        {exampleHouseList.map((val, key) => {
                          if (val.id != exampleHouseNew.id) {
                            return (
                            <Col xs="6" md="4" className="example-list-item">
                              <Link key={key} to={'example/' + val.id} className="example-list-once">
                                <div className="example-list-once-img">
                                  <img src={val.img_large} alt={val.title} />
                                </div>
                                <h3 className="example-list-once-title">
                                  {val.title}
                                </h3>
                                <div className="example-list-once-company-area">{val.store.district.name + ' ' + val.store.district.city.name}</div>
                                <div className="example-list-once-company">{val.store.title}</div>
                              </Link>
                            </Col>
                            )
                          }
                        })}
                    </Row>
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

ExampleHouseListPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  processing: PropTypes.bool,
  data: PropTypes.object,
  dataStores: PropTypes.object,
  dataHouseNew: PropTypes.object,
  exampleHousesListRequest: PropTypes.func,
  outletStoresListRequest: PropTypes.func,
  exampleHousesGetRequest: PropTypes.func,
  show: PropTypes.func,
  hide: PropTypes.func
}

const mapStateToProps = state => {
  return {
    processing : state.exampleHouses.processing,
    data : state.exampleHouses.data,
    dataStores : state.outletStores.data,
    dataHouseNew: state.exampleHouses.data,
  }
}

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ show, hide }, dispatch),
  exampleHousesListRequest : data =>
    dispatch(ExampleHousesActions.exampleHousesListRequest(data)),
  outletStoresListRequest : dataStores =>
    dispatch(OutletStoresActions.outletStoresListRequest(dataStores)),
  exampleHousesGetRequest : dataHouseNew => 
    dispatch(ExampleHousesActions.exampleHousesGetRequest(dataHouseNew)),
})

export default connect(
mapStateToProps,
  mapDispatchToProps
)(withRouter(ExampleHouseListPage))
