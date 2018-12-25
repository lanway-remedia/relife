import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'

import ExampleHousesActions from '../../redux/wrapper/ExampleHousesRedux'
import I18nUtils from '../../utils/I18nUtils'
import ShareHouse from '../../components/exampleHouse/ShareHouse'
class ExampleHouseViewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      exampleHouse: [],
      outletStore: [],
      listExampleHouseByStore: []
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
      } else if (response.isGetHouse) {
        this.setState({
          exampleHouse: response.data
        })
        let storeId = response.data.store.id
        let dataHouseByStoreId = {
          limit: '',
          store_id :storeId,
          offset: ''
        }
        this.props.exampleHousesListByStoreRequest(dataHouseByStoreId)
        console.log(nextProps)
      }
      if(response.isListHouseByStore){
        this.setState({
          listExampleHouseByStore: response.data
        })
      }
    }
  }

  render() {
    let {exampleHouse, listExampleHouseByStore } = this.state
    let isTags
    let ex_tags = exampleHouse.ex_tags
    if (!ex_tags || ex_tags === undefined) isTags = false

    let company_id
    if (exampleHouse.store) {
      company_id = exampleHouse.store.id
    }
    return (
      <div className="lower-contents one-column">
        <div className="lower-contents-inner clearfix">
          <section className="main">
            <h1 className="page-title detail-title"> 
              {exampleHouse.title}
            </h1>

            <div className="example-detail-company-name">
              {exampleHouse.store ? exampleHouse.store.title : ''}
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
                <Link to={'/builder/'+company_id}>{I18nUtils.t('go-to-store')}</Link>
              </div>
            </div>

            <h2 className="detail-subtitle">{I18nUtils.t('house-related')}</h2>

            <div className="detail-list clearfix">
              {listExampleHouseByStore.map((val, key) => {
                if (val.id != exampleHouse.id) {
                  return (
                    <Link to={'/example/' +val.id} key={key} className="detail-list-once">
                      <div className="detail-list-once-img">
                        <img src={val.img_large} alt="exh-item" />
                      </div>
                      <h3 className="detail-list-once-title">
                        {val.title}
                      </h3>
                      <div className="detail-list-once-company-area">{val.store.district.name + ' ' + val.store.district.city.name}</div>
                      <div className="detail-list-once-company">{val.store.title}</div>
                    </Link>
                    )
                }
              })}
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
  exampleHousesListByStoreRequest: PropTypes.func,
  history: PropTypes.object,
  match: PropTypes.object,
  processing: PropTypes.bool,
  data: PropTypes.object,
  dataHouseByStore: PropTypes.object,
  dataStore: PropTypes.object,
  response: PropTypes.object
}

const mapStateToProps = state => {
  return {
    processing : state.exampleHouses.processing,
    data : state.exampleHouses.data,
    dataHouseByStore: state.exampleHouses.data
  }
}

const mapDispatchToProps = dispatch => ({
  exampleHousesGetRequest : data => dispatch(ExampleHousesActions.exampleHousesGetRequest(data)),
  exampleHousesListByStoreRequest : dataHouseByStore => dispatch(ExampleHousesActions.exampleHousesListByStoreRequest(dataHouseByStore)),
}) 

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ExampleHouseViewPage))
