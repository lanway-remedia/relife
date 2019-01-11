import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Form, Input } from'reactstrap'
import I18nUtils from '../../utils/I18nUtils'
import LocationActions from '../../redux/wrapper/LocationsRedux'
import AttributesActions from '../../redux/wrapper/AttributesRedux'
import PropTypes from 'prop-types'

class HeaderSubMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locationList: [],
      keywordList: []
    }
  }
  getLocationList = () => {
    let data = {
      limit: '',
      offset: '',
      type: 1
    }
    this.props.locationListRequest(data)
  }

  getKeywordList = () => {
    let number = 10
    this.props.mostKeywordListRequest(number)
  }

  componentDidMount() {
    this.getKeywordList()
    this.getLocationList()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.isGetListLocation == true) {
        let data = response.data
        this.setState({
          locationList: data
        })
      }
    }

    if (this.props.dataKeyword != nextProps.dataKeyword) {
      let response = nextProps.dataKeyword
      if (response.isGetKeyword == true) {
        let data = response.data
        this.setState({
          keywordList: data
        })
      }
    }
  }

  render () {
    let {locationList, keywordList} = this.state
    console.log(keywordList)
    return (
      <div className="menu__second-level clearfix">
        <div className="mega-menu-inner-left">
          <div className="top-map-list">
            {locationList.map((region, key) => (
              <div key={key} className="top-map-list-once clearfix">
                <div className="top-map-list-area">{region.name}</div>
                {region.cities && (
                  <ul>
                    {region.cities.map((city, k) => (
                      <li key={k}>
                        <Link to="">{city.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mega-menu-inner-right">
          <div className="mega-menu-form">
            <div className="mega-menu-inner-title">{I18nUtils.t('search-keyword')}</div>
            <Form>
              <Input 
                className="search-keyword"
                placeholder="フリーワード"
              />
              <button
                className="btn-default btn-search-keyword"
              >
                <i className="fa fa-search" />
              </button>
            </Form>
          </div>
          <div className="mega-menu-keyword-area">
            <div className="mega-menu-inner-title">{I18nUtils.t('search-keyword-most')}</div>
            <ul className="mega-keywords">
            {keywordList.map((val, key) => (
              <li key={key}>
                <Link to={`/builder/keyword=${val.key_search}`}>
                  <span className="mega-keyword">{val.key_search}</span>
                  <span className="mega-keyword-count">{val.num_result}</span>
                </Link>
              </li>
            ))}
            </ul>
          </div>

          <Link
            to="/map"
            className="btn-default mega-menu-map"
          >
            {I18nUtils.t('search-map')}
          </Link>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    processing: state.locations.processing,
    data: state.locations.data,
    dataKeyword: state.attributes.data
  }
}

const mapDispatchToProps = dispatch => ({
  locationListRequest: data =>
    dispatch(LocationActions.locationListRequest(data)),
  mostKeywordListRequest: dataKeyword =>
    dispatch(AttributesActions.mostKeywordListRequest(dataKeyword)),
})

HeaderSubMenu.propTypes = {
  locationListRequest : PropTypes.func,
  data: PropTypes.object,
  dataKeyword: PropTypes.object,
  mostKeywordListRequest: PropTypes.func
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(withRouter(HeaderSubMenu))
