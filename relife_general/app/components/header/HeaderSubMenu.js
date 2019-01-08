import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Form, Input } from'reactstrap'
import I18nUtils from '../../utils/I18nUtils'
import LocationActions from '../../redux/wrapper/LocationsRedux'
import PropTypes from 'prop-types'

class HeaderSubMenu extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locationList: [],
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

  componentDidMount() {
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
  }

  render () {
    let {locationList} = this.state
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
              <li>
                <Link to="">
                  <span className="mega-keyword">地域密着</span>
                  <span className="mega-keyword-count">72</span>
                </Link>
              </li>
              <li>
                <Link to="">
                  <span className="mega-keyword">地域密着</span>
                  <span className="mega-keyword-count">72</span>
                </Link>
              </li>
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
    data: state.locations.data
  }
}

const mapDispatchToProps = dispatch => ({
  locationListRequest: data =>
    dispatch(LocationActions.locationListRequest(data)),
})

HeaderSubMenu.propTypes = {
  locationListRequest : PropTypes.func,
  data: PropTypes.object
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(withRouter(HeaderSubMenu))
