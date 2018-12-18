/**
 * @author Hanh TD
 * Top map component
 */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import I18nUtils from '../../utils/I18nUtils'
import LocationActions from '../../redux/wrapper/LocationsRedux'
class TopMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locationList: [],
      type: 1,
      offset: 0,
      limit: ''
    }
  }
  
  getLocationList = () => {
    let data = {
      limit: this.state.limit,
      offset: this.state.offset,
      type: this.state.type
    }
    this.props.locationListRequest(data)
  }

  componentDidMount() {
    this.getLocationList()
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data != nextProps.data) {
      let response = nextProps.data
      if (response.isGetList == true) {
        let data = response.data
        this.setState({
          locationList: data
        })
      }
    }
  }

  render () {
    let locationList = this.state.locationList
    return (
      <div className="top-map">
        <div className="top-map-inner clearfix">
          <div className="top-map-left">
            <h2 className="top-map-title">{I18nUtils.t('top-map-title-1')}<br />
            {I18nUtils.t('top-map-title-2')}
            </h2>
            <p className="top-map-text">{I18nUtils.t('top-map-text')}</p>
            <Link to="/map" className="btn-default pc">地図から探す</Link>
          </div>

          <div className="top-map-right">
            <div className="top-map-list">
              {locationList.map((city, key) => {
                return (
                  <div key={key} className="top-map-list-once clearfix">
                      <div className="top-map-list-area">{city.name}</div>
                      <ul>
                        {city.districts.map((dis, k) => {
                          return (
                            <li key={k}><Link to="/hokkaidou">{dis.name}</Link></li>
                          )
                        })}
                      </ul>
                  </div>
                )
                })}
            </div>
          </div>

          <div className="top-map-sp-btn sp">
            <Link to="/map" className="btn-default">地図から探す</Link>
          </div>
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

TopMap.propTypes = {
  locationListRequest : PropTypes.func,
  data: PropTypes.object
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(withRouter(TopMap))
