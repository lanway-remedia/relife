import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import exh01 from '../../images/exh-01.jpg'
import exhItem01 from '../../images/exh-item-01.jpg'

import OutletStoresActions from '../../redux/wrapper/OutletStoresRedux'
import ExampleHousesActions from '../../redux/wrapper/ExampleHousesRedux'
import I18nUtils from '../../utils/I18nUtils'
import ShareHouse from '../../components/exampleHouse/ShareHouse'
class ExampleHouseViewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exampleHouse: [],
      outletStore: []
    }
  }

  getExampleHouse = () => {
    const id = this.props.match.params.id
    this.props.exampleHousesGetRequest(id)
  }
  componentDidMount() {
    document.body.classList.add('example-house-view')
    this.getExampleHouse()
  }

  componentWillUnmount() {
    document.body.classList.remove('example-house-view')
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.data === undefined || response.data.length == 0) {
        this.props.history('/example')
      } else {
        this.setState({
          exampleHouse: response.data
        })
        let storeId = response.data.store
        this.props.outletStoresGetRequest(storeId)
      }
    }

    // get outlet store of example house
    if (this.props.dataStore != nextProps.dataStore) {
      let response = nextProps.dataStore
      if (response.isGetStore) {
        this.setState({
          outletStore: response.data
        })
        console.log(response.data)
      }
    }
  }

  render() {
    let {exampleHouse, outletStore } = this.state
    let isTags
    let ex_tags = exampleHouse.ex_tags
    if (!ex_tags || ex_tags === undefined) isTags = false
    console.log(exampleHouse)
    return (
      <div className="lower-contents">
        <div className="lower-contents-inner clearfix">
          <section className="main">
            <h1 className="page-title detail-title"> 
              {exampleHouse.title}
            </h1>

            <div className="example-detail-company-name">
              {outletStore.title}
            </div>

            <div className="detail-img">
              <img src={exampleHouse.img_large} />
            </div>
            {isTags && (
              <ul className="detail-keywords-link">
                  {ex_tags.map((val, key) => (
                    <li key={key}>
                      <Link to="">{val}</Link>
                    </li>
                  ))}
              </ul>
            )}
            <div className="example-detail" dangerouslySetInnerHTML={{ __html: exampleHouse.content}} />

            <div className="detail-btn-wrap clearfix">
              <div className="detail-btn">
                <Link to={'/builder/' + outletStore.id}>{I18nUtils.t('go-to-store')}</Link>
              </div>
            </div>

            <h2 className="detail-subtitle">{I18nUtils.t('house-related')}</h2>

            <div className="detail-list clearfix">
              <Link to="" className="detail-list-once">
                <div className="detail-list-once-img">
                  <img src={exhItem01} alt="exh-item" />
                </div>

                <h3 className="detail-list-once-title">
                  室内を見渡すのが楽しくなる、開放的な住まい
                </h3>

                <div className="detail-list-once-company-area">東京都西東京市</div>

                <div className="detail-list-once-company">株式会社クレアホームの施工事例</div>
              </Link>
            </div>

            <ShareHouse />
          </section>
        </div>
      </div>
    )
  }
}

ExampleHouseViewPage.propTypes = {
  exampleHousesGetRequest: PropTypes.func,
  outletStoresGetRequest: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object,
  processing: PropTypes.bool,
  data: PropTypes.object,
  dataStore: PropTypes.object,
  response: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing : state.exampleHouses.processing,
    data : state.exampleHouses.data,
    dataStore: state.outletStores.data
  }
}

const mapDispatchToProps = dispatch => ({
  exampleHousesGetRequest : data => dispatch(ExampleHousesActions.exampleHousesGetRequest(data)),
  outletStoresGetRequest : dataStore => dispatch(OutletStoresActions.outletStoresGetRequest(dataStore))
}) 

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ExampleHouseViewPage))
